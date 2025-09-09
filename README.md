# IrrigAIte UA 🌾

A precision agriculture web application designed for Ukrainian farmers to optimize irrigation decisions through advanced PET (Potential Evapotranspiration) calculations and ML-driven recommendations.

## Try It Now ##
https://irrigaite.web.app/

## 🚀 Features

### Core Functionality
- **PET Evaluation Calculator**: ML-driven calculations following FAO-56 standards, specifically calibrated for Ukrainian agricultural conditions with R² 0.85 accuracy
- **Manual Temperature Input**: Flexible temperature data entry with session persistence and validation
- **Real-time Weather Integration**: OpenWeatherMap API integration for current temperature data
- **Regional Data Integration**: Ukraine-specific geographical and agricultural data covering all 24 oblasts
- **Calculation History**: Save, review, and manage previous calculations with detailed metadata

### User Experience
- **Complete Multilingual Support**: Full localization in English and Ukrainian across all components, pages, and user interfaces
- **Minimalist Design System**: Clean, accessible interface with generous whitespace and intuitive navigation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices with adaptive layouts
- **Dark/Light Theme**: System-aware theme switching with user preference persistence
- **Enhanced Accessibility**: WCAG 2.1 AA compliant with keyboard navigation, screen reader support, and focus management

### Authentication & Licensing
- **Secure Authentication**: User registration and login powered by Supabase with email verification
- **License Management**: Premium feature access through license key activation system
- **Usage Tracking**: Evaluation count management with automatic decrementation and quota monitoring
- **Free Tier**: Daily free evaluations with manual temperature input for unlimited access

### Educational Resources
- **Comprehensive Guidelines**: Step-by-step agricultural best practices and irrigation management guidance
- **Reference Book**: Detailed agricultural reference materials including soil types, irrigation efficiency, and crop coefficients
- **Legal Documentation**: Complete terms of use and privacy policy with GDPR compliance
- **Support System**: In-app contact forms and comprehensive help documentation

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and optimized builds
- **React Router DOM v7** for client-side routing
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Lucide React** for consistent iconography

### Backend & Database
- **Supabase** for authentication, database, and backend services
- **PostgreSQL** database with real-time capabilities
- **Edge Functions** for server-side logic

### Internationalization
- **i18next** with React integration and enhanced translation hooks
- **HTTP backend** for dynamic translation loading from `/public/locales/`
- **Browser language detection** with localStorage persistence
- **Comprehensive namespace organization** for modular translations
- **Translation validation** and error boundary systems
- **Fallback mechanisms** for graceful handling of missing translations

### Development Tools
- **ESLint** with TypeScript and React plugins
- **Jest** and **React Testing Library** for comprehensive testing
- **PostCSS** with Autoprefixer for CSS processing

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd irrigaite-ua
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🚀 Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload
npm run build           # Build for production with optimizations
npm run preview         # Preview production build locally

# Code Quality & Testing
npm run lint            # Run ESLint with TypeScript and React rules
npm run test            # Run complete test suite with Jest
npm run test:translations # Run translation-specific tests
npm run test:coverage   # Generate test coverage report

# Translation Management
npm run translate       # Process and organize translation files
npm run validate-translations  # Validate translation coverage and detect missing keys
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, inputs, modals)
│   ├── Layout.tsx      # Main application layout with navigation
│   ├── LanguageToggle.tsx        # Language switcher component
│   ├── ManualTemperatureInput.tsx # Temperature input with validation
│   ├── RegionSelector.tsx        # Interactive Ukraine map selector
│   ├── PETResultModal.tsx        # PET calculation results display
│   ├── TranslationErrorBoundary.tsx # Translation error handling
│   └── TemperatureInputModeSelector.tsx # Input mode toggle
├── pages/              # Route components
│   ├── PETEvaluation.tsx         # Main PET calculator interface
│   ├── Landing.tsx              # Landing page with features
│   ├── Guidelines.tsx           # Usage instructions and best practices
│   ├── About.tsx               # About page with mission and science
│   ├── Support.tsx             # Support and contact information
│   ├── Contact.tsx             # Contact form and developer info
│   ├── Privacy.tsx             # Privacy policy
│   ├── Terms.tsx               # Terms of use
│   ├── ReferenceBook.tsx       # Agricultural reference materials
│   ├── MyCalculations.tsx      # User calculation history
│   ├── LicenseActivation.tsx   # License key management
│   ├── SignInPage.tsx          # User authentication
│   └── SignUpPage.tsx          # User registration
├── context/            # React context providers
│   ├── AuthContext.tsx         # Authentication state management
│   └── ThemeContext.tsx        # Theme switching (light/dark)
├── hooks/              # Custom React hooks
│   └── useEnhancedTranslation.ts # Enhanced i18n hook with fallbacks
├── utils/              # Utility functions
│   ├── supabaseOperations.ts   # Database operations
│   ├── licenseValidation.ts    # License key validation
│   ├── translationValidation.ts # Translation coverage validation
│   ├── temperatureInputPersistence.ts # Input state persistence
│   ├── formatters.ts           # Date/number formatting
│   └── i18nUtils.ts           # Internationalization utilities
├── data/               # Static data files
│   ├── ukraine-oblasts.json    # Ukrainian regional data
│   └── referenceData.ts        # Agricultural reference data
├── lib/                # Third-party integrations
│   ├── supabaseClient.ts       # Supabase configuration
│   └── utils.ts               # General utility functions
└── __tests__/          # Test files
    └── translations/           # Translation validation tests

public/
├── locales/            # Translation files (i18next HTTP backend)
│   ├── en/            # English translations
│   │   ├── common.json        # Navigation, auth, shared UI
│   │   ├── calculations.json  # PET calculator, irrigation
│   │   ├── pages.json         # Landing, guidelines, about
│   │   ├── legal.json         # Terms, privacy policy
│   │   └── reference.json     # Reference book content
│   └── uk/            # Ukrainian translations
│       ├── common.json        # Навігація, автентифікація
│       ├── calculations.json  # Калькулятор ПЕТ, зрошення
│       ├── pages.json         # Головна, інструкції, про нас
│       ├── legal.json         # Умови, політика конфіденційності
│       └── reference.json     # Довідкові матеріали
├── MapChart_Map.png    # Ukraine regions map image
├── ukraine-map.svg     # Ukraine map SVG
└── ukraine21.svg       # Alternative Ukraine map
```

## 🌍 Internationalization

The application features comprehensive localization covering all user-facing content:

### Supported Languages
- **English (`en`)** - Primary language with complete coverage
- **Ukrainian (`uk`)** - Full localization for Ukrainian agricultural community

### Translation Namespaces
- **`common`** - Navigation, authentication, shared UI elements, and global components
- **`calculations`** - PET evaluation, irrigation calculator, license activation, and technical interfaces
- **`pages`** - Landing page, guidelines, about, support, and content pages
- **`legal`** - Terms of use, privacy policy, and compliance documentation
- **`reference`** - Reference book, agricultural data tables, and educational materials

### Translation Features
- **Enhanced Translation Hook**: `useEnhancedTranslation` with fallback mechanisms and error handling
- **Translation Error Boundary**: Graceful handling of translation failures
- **Validation System**: Automated translation coverage validation and missing key detection
- **Persistent Language Selection**: User language preference stored in localStorage
- **Locale-specific Formatting**: Date, number, and currency formatting based on selected language

### Adding Translations

1. **Add translation keys** to appropriate namespace files in `public/locales/[lang]/[namespace].json`
2. **Use translation hooks** in components:
   ```tsx
   // Basic usage
   const { t } = useTranslation('namespace');
   return <p>{t('translation.key')}</p>;

   // Enhanced usage with fallbacks
   const { t } = useEnhancedTranslation(['namespace']);
   return <p>{t('translation.key', 'Default text')}</p>;

   // Multiple namespaces
   const { t } = useTranslation(['pages', 'common']);
   return <p>{t('pages:landing.title')}</p>;
   ```

3. **Validate translations**:
   ```bash
   npm run validate-translations  # Check for missing keys
   npm run test:translations     # Run translation tests
   ```

## 🧪 Testing

Comprehensive test suite ensuring application reliability and quality:

### Test Coverage Areas
- **Unit Tests**: Component logic, utility functions, and custom hooks
- **Integration Tests**: Complete user workflows and feature interactions
- **Translation Tests**: Translation coverage validation and language switching
- **Accessibility Tests**: WCAG 2.1 AA compliance and keyboard navigation
- **Error Boundary Tests**: Translation error handling and graceful fallbacks
- **Form Validation**: Input validation and user feedback systems

### Translation Testing
- **Coverage Validation**: Automated detection of missing translation keys
- **Namespace Testing**: Verification of translation namespace integrity
- **Fallback Testing**: Graceful handling of missing translations
- **Language Switching**: UI updates and persistence testing

### Running Tests
```bash
npm test                    # Run complete test suite
npm test -- --watch       # Watch mode for development
npm test -- --coverage    # Generate detailed coverage report
npm run test:translations  # Run translation-specific tests only
npm run validate-translations # Validate translation completeness
```

### Test Configuration
- **Jest**: Test runner with jsdom environment
- **React Testing Library**: Component testing with user-centric approach
- **Translation Validation**: Custom scripts for i18n testing
- **Coverage Thresholds**: Maintained coverage standards for code quality

## 🔧 Configuration

### Path Aliases
- `@/` maps to `src/` directory (configured in Vite)

### Environment Variables
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

### Design System Configuration

**Minimalist Theme** (`tailwind.config.js` and `src/index.css`):
- **Color System**: HSL-based color palette with CSS custom properties for theme switching
- **Typography**: Refined font scales with optimized line heights and letter spacing
- **Spacing**: Enhanced spacing scale with generous whitespace for minimalist design
- **Components**: Pre-built utility classes for buttons, inputs, cards, and navigation
- **Accessibility**: High contrast ratios, focus indicators, and reduced motion support
- **Dark Mode**: Complete dark theme with proper color adjustments and accessibility compliance

**CSS Architecture**:
- **CSS Custom Properties**: Theme-aware color system with automatic dark mode switching
- **Utility Classes**: Minimalist component classes (`.btn-minimal`, `.card-elevated`, etc.)
- **Typography Utilities**: Text justification and improved readability classes
- **Animation System**: Subtle animations with reduced motion support

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run preview  # Test production build locally
```

### Deployment Platforms
- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **Supabase**: Full-stack deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

#### Code Quality
- **TypeScript**: Strict type checking with comprehensive type definitions
- **ESLint**: Enforced code style with React and TypeScript rules
- **Component Architecture**: Functional components with custom hooks
- **Error Handling**: Comprehensive error boundaries and graceful fallbacks

#### Internationalization Requirements
- **Complete Translation Coverage**: All user-facing text must be translatable
- **Namespace Organization**: Use appropriate namespaces (`common`, `calculations`, `pages`, `legal`, `reference`)
- **Translation Keys**: Follow hierarchical naming convention (`pages.landing.hero.title`)
- **Fallback Handling**: Provide default text for missing translations
- **Validation**: Run `npm run validate-translations` before commits

#### Accessibility Standards
- **WCAG 2.1 AA Compliance**: Maintain accessibility standards
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: Minimum 4.5:1 contrast ratio for text

#### Design System Adherence
- **Minimalist Principles**: Use generous whitespace and clean layouts
- **Component Consistency**: Utilize existing utility classes and components
- **Theme Support**: Ensure components work in both light and dark modes
- **Responsive Design**: Mobile-first approach with adaptive layouts

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[Internationalization Guide](docs/INTERNATIONALIZATION.md)**: Complete i18n implementation, translation management, and localization best practices
- **[Design System](docs/DESIGN_SYSTEM.md)**: Minimalist design principles, component system, and styling guidelines
- **[API Documentation](docs/API_DOCUMENTATION.md)**: Backend integration, database schema, and Supabase operations

## 🆘 Support

- **Documentation**: Detailed guides and API references in the `/docs` folder
- **Issues**: Report bugs and feature requests via GitHub Issues
- **Contact**: Reach out through the in-app support page
- **Translation Issues**: Use `npm run validate-translations` to check for missing keys

## 🔄 Recent Updates

### Version 2.0 - Complete Localization & Minimalist Redesign
- **Complete Internationalization**: Full Ukrainian and English localization across all components
- **Enhanced Translation System**: Advanced fallback mechanisms and error handling
- **Minimalist UI Redesign**: Clean, accessible interface with improved user experience
- **Comprehensive Documentation**: Detailed guides for i18n, design system, and API integration
- **Improved Accessibility**: WCAG 2.1 AA compliance with enhanced keyboard navigation
- **Advanced Testing**: Translation validation and comprehensive test coverage

## 🙏 Acknowledgments

- **FAO-56 Methodology**: International standards for evapotranspiration calculations
- **Ukrainian Agricultural Research**: Regional climate data and agricultural expertise
- **Open Source Community**: Excellent tools and libraries that make this project possible
- **i18next Community**: Robust internationalization framework and ecosystem
- **Supabase Team**: Comprehensive backend-as-a-service platform
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

---

**IrrigAIte UA** - Empowering Ukrainian agriculture through precision irrigation management with ML-driven insights and comprehensive localization.
