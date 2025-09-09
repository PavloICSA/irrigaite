# Technology Stack

## Frontend Framework
- **React 18** with TypeScript
- **Vite** as build tool and dev server
- **React Router DOM v7** for client-side routing

## Styling & UI
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Custom UI components** in `src/components/ui/`

## Backend & Database
- **Supabase** for authentication, database, and backend services
- Environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

## Internationalization
- **i18next** with React integration
- **HTTP backend** for loading translations from `/public/locales/`
- **Browser language detection** with localStorage persistence
- Supported languages: English (`en`), Ukrainian (`uk`)
- Namespaces: `common`, `calculations`

## Development Tools
- **ESLint** with TypeScript and React plugins
- **PostCSS** with Autoprefixer
- **Jest** and **React Testing Library** for testing

## Key Libraries
- **date-fns** for date manipulation
- **React Leaflet** for map components
- **clsx** and **tailwind-merge** for conditional styling

## Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint

# Translation management
npm run translate
```

## Path Aliases
- `@/` maps to `src/` directory (configured in Vite)

## Environment Setup
Requires `.env` file with Supabase configuration variables.