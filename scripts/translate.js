const fs = require('fs');
const path = require('path');

// DeepL API configuration
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

// Language mapping
const LANGUAGE_MAP = {
  'en': 'EN',
  'uk': 'UK'
};

/**
 * Translates text using DeepL API
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code
 * @returns {Promise<string>} - Translated text
 */
async function translateText(text, targetLang) {
  if (!DEEPL_API_KEY) {
    console.warn('DEEPL_API_KEY not found. Using placeholder translation.');
    return `[${targetLang.toUpperCase()}] ${text}`;
  }

  try {
    const response = await fetch(DEEPL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: text,
        source_lang: 'EN',
        target_lang: LANGUAGE_MAP[targetLang] || targetLang.toUpperCase(),
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.status}`);
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.warn(`Translation failed for "${text}": ${error.message}`);
    return `[${targetLang.toUpperCase()}] ${text}`;
  }
}

/**
 * Recursively translates all values in a nested object
 * @param {Object} obj - Object to translate
 * @param {string} targetLang - Target language
 * @returns {Promise<Object>} - Translated object
 */
async function translateObject(obj, targetLang) {
  const result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      console.log(`Translating: ${key} = "${value}"`);
      result[key] = await translateText(value, targetLang);
      // Add small delay to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
    } else if (typeof value === 'object' && value !== null) {
      result[key] = await translateObject(value, targetLang);
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

/**
 * Main translation function
 */
async function translateLocales() {
  const localesDir = path.join(__dirname, '..', 'public', 'locales');
  const sourceDir = path.join(localesDir, 'en');
  const targetDir = path.join(localesDir, 'uk');

  // Ensure target directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Get all JSON files in the source directory
  const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.json'));

  for (const file of files) {
    console.log(`\n🔄 Translating ${file}...`);
    
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    try {
      // Read source file
      const sourceContent = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
      
      // Translate content
      const translatedContent = await translateObject(sourceContent, 'uk');
      
      // Write translated file
      fs.writeFileSync(targetPath, JSON.stringify(translatedContent, null, 2), 'utf8');
      
      console.log(`✅ Successfully translated ${file}`);
    } catch (error) {
      console.error(`❌ Failed to translate ${file}:`, error.message);
    }
  }
  
  console.log('\n🎉 Translation complete!');
}

// Run translation
if (require.main === module) {
  translateLocales().catch(console.error);
}

module.exports = { translateLocales, translateText };