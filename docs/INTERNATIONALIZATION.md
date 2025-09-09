# Internationalization (i18n) Documentation

## Overview

IrrigAIte UA features comprehensive internationalization support with complete localization in English and Ukrainian. The system uses i18next with React integration and provides enhanced translation capabilities with fallback mechanisms and error handling.

## Architecture

### Core Technologies
- **i18next**: Core internationalization framework
- **react-i18next**: React integration with hooks and components
- **i18next-http-backend**: Dynamic loading of translation files
- **i18next-browser-languagedetector**: Automatic language detection

### Translation System Structure
```
public/locales/
├── en/                 # English translations
│   ├── common.json     # Navigation, auth, shared UI
│   ├── calculations.json # PET calculator, irrigation
│   ├── pages.json      # Landing, guidelines, about
│   ├── legal.json      # Terms, privacy policy
│   └── reference.json  # Reference book content
└── uk/                 # Ukrainian translations
    ├── common.json     # Навігація, автентифікація
    ├── calculations.json # Калькулятор ПЕТ, зрошення
    ├── pages.json      # Головна, інструкції, про нас
    ├── legal.json      # Умови, політика конфіденційності
    └── reference.json  # Довідкові матеріали
```

## Translation Namespaces

### Common (`common.json`)
Contains shared UI elements used across multiple components:
- Navigation menu items
- Authentication forms
- Footer content
- Language and theme toggles
- Region selector interface
- Common buttons and actions
- Units and formatting

### Calculations (`calculations.json`)
Technical interface elements for agricultural calculations:
- PET evaluation interface
- Temperature input modes
- Irrigation calculator
- License activation system
- Calculation results and modals
- Validation messages

### Pages (`pages.json`)
Content for main application pages:
- Landing page content
- Guidelines and instructions
- About page information
- Support and contact details
- Developer information

### Legal (`legal.json`)
Legal documentation and compliance:
- Terms of use
- Privacy policy
- User rights information
- Data handling policies

### Reference (`reference.json`)
Agricultural reference materials:
- Reference book content
- Data table headers
- Crop information
- Soil and irrigation data
- Tooltips and help text

## Translation Key Naming Convention

### Hierarchical Structure
Use dot notation for nested organization:
```json
{
  "pages": {
    "landing": {
      "hero": {
        "title": "IrrigAIte UA",
        "subtitle": "ML-Driven PET Assessment"
      }
    }
  }
}
```

### Key Naming Patterns
- **Pages**: `pages.pageName.section.element`
- **Components**: `components.componentName.element`
- **Forms**: `forms.formName.field` or `forms.validation.rule`
- **Messages**: `messages.type.content` (success, error, warning)
- **Actions**: `actions.verb` (save, delete, cancel)

### Examples
```typescript
// Page content
t('pages:landing.hero.title')
t('pages:about.mission.paragraph1')

// Component elements
t('common:nav.home')
t('common:auth.signIn')

// Form validation
t('common:forms.validation.required')
t('calculations:validation.invalidRange')

// Status messages
t('common:messages.success.saved')
t('calculations:messages.error.networkError')
```

## Usage Patterns

### Basic Translation Hook
```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('namespace');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### Multiple Namespaces
```tsx
function MyComponent() {
  const { t } = useTranslation(['pages', 'common']);
  
  return (
    <div>
      <h1>{t('pages:landing.title')}</h1>
      <button>{t('common:buttons.submit')}</button>
    </div>
  );
}
```

### Enhanced Translation Hook
```tsx
import { useEnhancedTranslation } from '../hooks/useEnhancedTranslation';

function MyComponent() {
  const { t } = useEnhancedTranslation(['pages']);
  
  return (
    <div>
      {/* With fallback text */}
      <h1>{t('pages:landing.title', 'Default Title')}</h1>
      
      {/* With interpolation */}
      <p>{t('pages:about.memberSince', { date: '2024' })}</p>
    </div>
  );
}
```

### Interpolation and Pluralization
```tsx
// Simple interpolation
t('welcome.message', { name: 'John' })

// Pluralization
t('items.count', { count: 5 })

// Date formatting
t('lastUpdated', { date: formatDate(new Date()) })
```

## Error Handling and Fallbacks

### Translation Error Boundary
The application includes a `TranslationErrorBoundary` component that catches translation-related errors and provides fallback UI.

### Enhanced Translation Hook Features
- **Missing Key Detection**: Logs warnings for missing translations
- **Language Fallback**: Falls back to English if Ukrainian translation missing
- **Default Text Support**: Uses provided default text as final fallback
- **Development Warnings**: Detailed logging in development mode

### Fallback Strategy
1. **Primary Language**: Use requested translation key
2. **Fallback Language**: Use English translation if primary missing
3. **Default Text**: Use provided default text
4. **Key Display**: Display translation key as last resort

## Language Detection and Persistence

### Detection Priority
1. **URL Parameter**: `?lng=uk` or `?lng=en`
2. **localStorage**: Previously selected language
3. **Browser Language**: User's browser language preference
4. **Default**: English as fallback

### Persistence
- User language selection is stored in `localStorage`
- Preference persists across browser sessions
- Language changes are applied immediately without page reload

## Validation and Testing

### Translation Validation Script
```bash
npm run validate-translations
```

This script checks for:
- Missing translation keys between languages
- Unused translation keys
- Malformed JSON files
- Namespace consistency

### Translation Tests
```bash
npm run test:translations
```

Tests include:
- Translation key existence validation
- Component rendering in both languages
- Language switching functionality
- Fallback mechanism testing

### Manual Testing Checklist
- [ ] All text content is translatable
- [ ] Language toggle works correctly
- [ ] No hardcoded text in components
- [ ] Proper text layout in both languages
- [ ] Date and number formatting is locale-appropriate

## Adding New Translations

### Step-by-Step Process

1. **Identify Translation Needs**
   - Audit new components for hardcoded text
   - Determine appropriate namespace
   - Plan translation key structure

2. **Add Translation Keys**
   ```json
   // public/locales/en/namespace.json
   {
     "newFeature": {
       "title": "New Feature",
       "description": "Feature description"
     }
   }
   
   // public/locales/uk/namespace.json
   {
     "newFeature": {
       "title": "Нова функція",
       "description": "Опис функції"
     }
   }
   ```

3. **Update Components**
   ```tsx
   function NewFeature() {
     const { t } = useTranslation('namespace');
     
     return (
       <div>
         <h2>{t('newFeature.title')}</h2>
         <p>{t('newFeature.description')}</p>
       </div>
     );
   }
   ```

4. **Validate Translations**
   ```bash
   npm run validate-translations
   npm run test:translations
   ```

### Best Practices

#### Translation Key Design
- Use descriptive, hierarchical keys
- Avoid overly nested structures (max 4 levels)
- Group related translations together
- Use consistent naming patterns

#### Content Guidelines
- Keep translations contextually appropriate
- Maintain consistent tone and terminology
- Consider cultural differences
- Provide context for translators when needed

#### Technical Considerations
- Avoid concatenating translated strings
- Use interpolation for dynamic content
- Handle pluralization properly
- Consider text expansion in different languages

## Maintenance and Updates

### Regular Maintenance Tasks
- Review and update translations based on user feedback
- Clean up unused translation keys
- Validate translation coverage for new features
- Update translation documentation

### Version Control
- Track translation changes with meaningful commit messages
- Review translation changes in pull requests
- Maintain translation changelog for major updates

### Performance Optimization
- Monitor bundle size impact of translations
- Use namespace splitting for large applications
- Implement lazy loading for non-critical translations
- Cache translations appropriately

## Troubleshooting

### Common Issues

**Missing Translations**
- Check translation key spelling
- Verify namespace is loaded
- Confirm translation exists in JSON file

**Translation Not Updating**
- Clear browser cache
- Restart development server
- Check for JSON syntax errors

**Fallback Not Working**
- Verify enhanced translation hook usage
- Check fallback language configuration
- Ensure default text is provided

### Debug Tools
- Browser developer tools for network requests
- React Developer Tools for component state
- i18next debug mode for detailed logging

### Getting Help
- Check browser console for translation warnings
- Use validation scripts to identify issues
- Review translation test results
- Consult i18next documentation for advanced features

## Future Enhancements

### Planned Improvements
- Translation management interface
- Automated translation validation in CI/CD
- Translation memory for consistency
- Professional translation service integration

### Scalability Considerations
- Additional language support (Polish, Romanian)
- Regional dialect variations
- Right-to-left language support preparation
- Translation workflow automation