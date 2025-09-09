import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface RequestBody {
  userId: string;
  keyString: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client with service role key for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse request body
    const { userId, keyString }: RequestBody = await req.json()

    if (!userId || !keyString) {
      return new Response(
        JSON.stringify({ error: 'Missing userId or keyString' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Check if the license key exists and is unused
    const { data: licenseKey, error: fetchError } = await supabaseAdmin
      .from('license_keys')
      .select('*')
      .eq('key_string', keyString)
      .eq('is_used', false)
      .maybeSingle()

    if (fetchError) {
      console.error('Error fetching license key:', fetchError)
      return new Response(
        JSON.stringify({ error: 'Database error while checking license key' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    if (!licenseKey) {
      return new Response(
        JSON.stringify({ error: 'Invalid or already used license key' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Start a transaction to update both license key and user profile
    const { error: updateKeyError } = await supabaseAdmin
      .from('license_keys')
      .update({
        is_used: true,
        used_by: userId,
        used_at: new Date().toISOString(),
      })
      .eq('id', licenseKey.id)

    if (updateKeyError) {
      console.error('Error updating license key:', updateKeyError)
      return new Response(
        JSON.stringify({ error: 'Failed to activate license key' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Get current user profile or create if doesn't exist
    const { data: currentProfile, error: profileFetchError } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()

    if (profileFetchError) {
      console.error('Error fetching user profile:', profileFetchError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch user profile' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    let updatedProfile
    if (currentProfile) {
      // Update existing profile
      const { data, error: updateError } = await supabaseAdmin
        .from('user_profiles')
        .update({
          additional_evaluations: (currentProfile.additional_evaluations || 0) + licenseKey.plan_evaluations,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single()

      if (updateError) {
        console.error('Error updating user profile:', updateError)
        // Rollback license key activation
        await supabaseAdmin
          .from('license_keys')
          .update({
            is_used: false,
            used_by: null,
            used_at: null,
          })
          .eq('id', licenseKey.id)

        return new Response(
          JSON.stringify({ error: 'Failed to update user profile' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      }
      updatedProfile = data
    } else {
      // Create new profile
      const { data, error: createError } = await supabaseAdmin
        .from('user_profiles')
        .insert({
          id: userId,
          additional_evaluations: licenseKey.plan_evaluations,
        })
        .select()
        .single()

      if (createError) {
        console.error('Error creating user profile:', createError)
        // Rollback license key activation
        await supabaseAdmin
          .from('license_keys')
          .update({
            is_used: false,
            used_by: null,
            used_at: null,
          })
          .eq('id', licenseKey.id)

        return new Response(
          JSON.stringify({ error: 'Failed to create user profile' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      }
      updatedProfile = data
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `License key activated successfully! Added ${licenseKey.plan_evaluations} evaluations.`,
        evaluations_added: licenseKey.plan_evaluations,
        total_evaluations: updatedProfile.additional_evaluations,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})