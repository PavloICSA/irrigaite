# Design Document

## Overview

This design outlines the comprehensive localization strategy for the IrrigAIte UA application. The current system uses i18next with React integration and has partial localization implemented. The design will extend the existing localization infrastructure to cover all user-facing content while maintaining the current application functionality and design.

The localization system will support Ukrainian (uk) and English (en) languages with proper fallback mechanisms, locale-specific formatting, and persistent user preferences. The design follows the existing i18next architecture and extends it systematically across all application components.

## Architecture

### Current Localization Infrastructure

The application already has a solid foundation:
- **i18next** with React integration (`react-i18next`)
- **HTTP backend** for loading translation files from `/public/locales/`
- **Browser language detection** with localStorage persistence
- **Two namespaces**: `common` and `calculations`
- **Locale-specific formatting** for dates, numbers, and currency
- **Language toggle component** with dropdown interface

### Extended Architecture

The design extends the current system with:
- **Additional namespaces** for different page categories
- **Comprehensive translation coverage** for all components
- **Consistent translation key naming** conventions
- **Graceful fallback handling** for missing translations
- **Maintainable file organization** by feature/page groupings

## Components and Interfaces

### Translation Namespace Structure

```
public/locales/
├── en/
│   ├── common.json          # Navigation, auth, shared UI elements
│   ├── calculations.json    # PET evaluation, irrigation, license activation
│   ├── pages.json          # Landing, Guidelines, About, Support
│   ├── legal.json          # Terms, Privacy Policy
│   └── reference.json      # Reference Book content
└── uk/
    ├── common.json
    ├── calculations.json
    ├── pages.json
    ├── legal.json
    └── reference.json
```

### Component Localization Strategy

#### 1. Already Localized Components
- `Layout.tsx` - Navigation and footer
- `SignInPage.tsx` - Authentication forms
- `SignUpPage.tsx` - Registration forms
- `MyCalculations.tsx` - Calculation history
- `PETResultModal.tsx` - PET calculation results
- `LanguageToggle.tsx` - Language selector

#### 2. Components Requiring Localization

**Landing Page (`Landing.tsx`)**
- Hero section content
- Feature descriptions
- Call-to-action buttons
- Benefits and testimonials

**Guidelines Page (`Guidelines.tsx`)**
- Step-by-step instructions
- Technical explanations
- Best practices content
- Warning and info messages

**About Page (`About.tsx`)**
- Mission statement
- Scientific methodology
- Team information
- External links and descriptions

**Support Page (`Support.tsx`)**
- Support options
- Contact information
- FAQ content
- Donation messaging

**Legal Pages (`Terms.tsx`, `Privacy.tsx`)**
- Legal text content
- Policy sections
- User rights information
- Compliance statements

**Reference Book (`ReferenceBook.tsx`)**
- Tab labels and descriptions
- Data table headers
- Crop information
- Soil and irrigation data
- Tooltips and help text

### Translation Key Naming Convention

```typescript
// Hierarchical structure with dot notation
"pages.landing.hero.title"
"pages.landing.hero.subtitle"
"pages.landing.features.petCalculation.title"

// Component-specific keys
"components.regionSelector.selectRegion"
"components.cropSelector.chooseCrop"

// Form-related keys
"forms.validation.required"
"forms.validation.invalidEmail"
"forms.buttons.submit"

// Status and feedback messages
"messages.success.saved"
"messages.error.networkError"
"messages.loading.fetchingData"
```

## Data Models

### Translation File Structure

#### Pages Namespace (`pages.json`)
```json
{
  "landing": {
    "hero": {
      "title": "IrrigAIte UA",
      "subtitle": "ML-Driven PET & Irrigation Rates Assessment Tailored for Ukraine",
      "description": "Harness the power of machine learning...",
      "cta": {
        "getStarted": "Get Started",
        "signIn": "Sign In",
        "startEvaluation": "Start PET Evaluation"
      }
    },
    "features": { /* ... */ },
    "benefits": { /* ... */ }
  },
  "guidelines": { /* ... */ },
  "about": { /* ... */ },
  "support": { /* ... */ }
}
```

#### Legal Namespace (`legal.json`)
```json
{
  "terms": {
    "title": "Terms of Use",
    "subtitle": "Please read these terms carefully...",
    "sections": {
      "acceptance": { /* ... */ },
      "services": { /* ... */ },
      "limitations": { /* ... */ }
    }
  },
  "privacy": { /* ... */ }
}
```

#### Reference Namespace (`reference.json`)
```json
{
  "title": "Reference Book",
  "subtitle": "Agricultural reference data...",
  "tabs": {
    "soil": "Soil Water-Holding Capacity",
    "irrigation": "Irrigation Efficiency",
    "crops": "Crop Root Depth & Thresholds"
  },
  "tables": { /* ... */ },
  "tooltips": { /* ... */ }
}
```

### Component Integration Pattern

```typescript
// Hook usage pattern
const { t } = useTranslation(['pages', 'common']);

// Translation key usage
<h1>{t('pages:landing.hero.title')}</h1>
<p>{t('pages:landing.hero.description')}</p>

// Fallback handling
<span>{t('pages:landing.feature.title', 'Default Title')}</span>

// Interpolation
<p>{t('pages:about.memberSince', { date: formatDate(date) })}</p>
```

## Error Handling

### Missing Translation Fallback Strategy

1. **Key-based fallback**: Display the translation key if no translation found
2. **English fallback**: Fall back to English translation if Ukrainian missing
3. **Default text**: Provide default English text as component prop
4. **Development warnings**: Log missing translations in development mode

### Implementation Pattern

```typescript
// Custom hook for enhanced translation
const useEnhancedTranslation = (namespaces: string[]) => {
  const { t, i18n } = useTranslation(namespaces);
  
  const tWithFallback = (key: string, defaultText?: string) => {
    const translation = t(key);
    
    // If translation equals key, it means translation is missing
    if (translation === key) {
      if (defaultText) return defaultText;
      if (i18n.language !== 'en') {
        // Try English fallback
        return t(key, { lng: 'en' });
      }
    }
    
    return translation;
  };
  
  return { t: tWithFallback, i18n };
};
```

### Error Boundary for Translation Issues

```typescript
class TranslationErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (error.message.includes('i18n') || error.message.includes('translation')) {
      // Log translation errors
      console.error('Translation error:', error, errorInfo);
      // Could implement fallback UI or error reporting
    }
  }
}
```

## Testing Strategy

### Translation Coverage Testing

1. **Key existence validation**: Ensure all translation keys exist in both languages
2. **Component rendering tests**: Verify components render correctly in both languages
3. **Language switching tests**: Test language toggle functionality
4. **Fallback mechanism tests**: Verify graceful handling of missing translations
5. **Locale formatting tests**: Test date, number, and currency formatting

### Test Implementation Approach

```typescript
// Translation key validation test
describe('Translation Coverage', () => {
  test('all English keys have Ukrainian translations', () => {
    const enKeys = flattenTranslationKeys(enTranslations);
    const ukKeys = flattenTranslationKeys(ukTranslations);
    
    enKeys.forEach(key => {
      expect(ukKeys).toContain(key);
    });
  });
});

// Component localization test
describe('Landing Page Localization', () => {
  test('renders in Ukrainian when language is set to uk', () => {
    i18n.changeLanguage('uk');
    render(<Landing />);
    
    expect(screen.getByText('IrrigAIte UA')).toBeInTheDocument();
    // Add more specific Ukrainian text checks
  });
});
```

### Automated Translation Validation

```typescript
// Script to validate translation completeness
const validateTranslations = () => {
  const namespaces = ['common', 'calculations', 'pages', 'legal', 'reference'];
  const languages = ['en', 'uk'];
  
  namespaces.forEach(namespace => {
    const enKeys = getTranslationKeys(`en/${namespace}.json`);
    const ukKeys = getTranslationKeys(`uk/${namespace}.json`);
    
    const missingInUk = enKeys.filter(key => !ukKeys.includes(key));
    const missingInEn = ukKeys.filter(key => !enKeys.includes(key));
    
    if (missingInUk.length > 0) {
      console.warn(`Missing Ukrainian translations in ${namespace}:`, missingInUk);
    }
    
    if (missingInEn.length > 0) {
      console.warn(`Missing English translations in ${namespace}:`, missingInEn);
    }
  });
};
```

## Implementation Considerations

### Performance Optimization

1. **Lazy loading**: Load translation namespaces only when needed
2. **Caching**: Leverage browser caching for translation files
3. **Bundle splitting**: Separate translation files from main bundle
4. **Preloading**: Preload critical translations for better UX

### Maintenance Guidelines

1. **Translation key documentation**: Maintain clear documentation of key structure
2. **Consistent naming**: Follow established naming conventions
3. **Regular audits**: Periodically review and clean up unused keys
4. **Version control**: Track translation changes with meaningful commit messages

### Accessibility Considerations

1. **Screen reader support**: Ensure translated content works with screen readers
2. **Language attributes**: Set appropriate `lang` attributes on HTML elements
3. **Text direction**: Prepare for potential RTL language support in future
4. **Font support**: Ensure fonts support Ukrainian characters properly

This design provides a comprehensive framework for completing the localization of the IrrigAIte UA application while maintaining code quality, performance, and user experience standards.