# Project Structure

## Root Directory
- **Configuration files**: `vite.config.ts`, `tailwind.config.js`, `eslint.config.js`, `tsconfig.json`
- **Package management**: `package.json`, `package-lock.json`
- **Environment**: `.env` (Supabase credentials)

## Source Directory (`src/`)

### Core Application
- `main.tsx` - Application entry point with React StrictMode and i18n initialization
- `App.tsx` - Main app component with routing configuration
- `index.css` - Global styles and Tailwind imports
- `vite-env.d.ts` - Vite type definitions

### Components (`src/components/`)
- **Layout Components**: `Layout.tsx` (main app layout with navigation)
- **Auth Components**: `ProtectedRoute.tsx` (route protection)
- **UI Components**: `LanguageToggle.tsx`, modal components
- **Custom UI**: `src/components/ui/` (reusable UI components)

### Pages (`src/pages/`)
- **Authentication**: `SignInPage.tsx`, `SignUpPage.tsx`
- **Core Features**: `PETEvaluation.tsx`, `MyCalculations.tsx`, `LicenseActivation.tsx`
- **Content Pages**: `Landing.tsx`, `Guidelines.tsx`, `About.tsx`, `Support.tsx`
- **Legal**: `Terms.tsx`, `Privacy.tsx`
- **Reference**: `ReferenceBook.tsx`

### Context (`src/context/`)
- `AuthContext.tsx` - Authentication state management with Supabase

### Data (`src/data/`)
- `ukraine-oblasts.json` - Ukrainian regional data
- `referenceData.ts` - Agricultural reference data
- `license_keys.csv` - License management data

### Utilities (`src/lib/`, `src/utils/`)
- `lib/supabaseClient.ts` - Supabase client configuration
- `lib/utils.ts` - General utility functions
- `utils/supabaseOperations.ts` - Database operations

### Internationalization
- `i18n.ts` - i18next configuration
- `public/locales/` - Translation files organized by language and namespace

### Testing
- `src/__tests__/` - Test files using Jest and React Testing Library

## Routing Architecture
- **Public routes**: Landing, Guidelines, About, Support, Terms, Privacy, Reference Book
- **Auth routes**: Sign In, Sign Up (no layout)
- **Protected routes**: PET Evaluation, My Calculations, License Activation (require authentication)
- **Layout wrapper**: Most routes use the main Layout component with navigation

## Asset Management
- `public/` - Static assets including SVG maps and translation files
- `src/assets/` - Bundled assets

## Backend Integration
- **Supabase**: Authentication, database, and backend services
- **Environment variables**: Configuration through `.env` file