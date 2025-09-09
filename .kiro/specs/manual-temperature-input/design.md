# Design Document

## Overview

This design document outlines the implementation of manual temperature input functionality for the PET evaluation system. The feature will provide users with the flexibility to choose between real-time weather data from OpenWeather API or manual temperature entry, ensuring accessibility and removing license restrictions for manual calculations.

The design maintains the existing PET calculation logic while introducing a new temperature input mode selector and manual input interface. All components will be fully localized in English and Ukrainian languages.

## Architecture

### Component Structure

The manual temperature input feature will be integrated into the existing `PETEvaluation.tsx` component with the following architectural changes:

```
PETEvaluation.tsx
├── TemperatureInputModeSelector (new component)
├── ManualTemperatureInput (new component)
├── RegionSelector (existing)
├── RegionConfirmModal (modified)
├── PETResultModal (modified)
└── IrrigationModal (existing)
```

### State Management

The component will manage additional state variables:

- `temperatureInputMode`: 'realtime' | 'manual'
- `manualTemperature`: number | null
- `temperatureSource`: 'realtime' | 'manual'

### Data Flow

1. User selects temperature input mode (realtime/manual)
2. If manual mode: User enters temperature value
3. User selects region
4. System confirms selection and proceeds with calculation using appropriate temperature source
5. PET calculation uses either fetched or manual temperature
6. Results display temperature source information

## Components and Interfaces

### TemperatureInputModeSelector Component

**Purpose**: Allows users to choose between real-time and manual temperature input modes.

**Props Interface**:
```typescript
interface TemperatureInputModeSelectorProps {
  selectedMode: 'realtime' | 'manual';
  onModeChange: (mode: 'realtime' | 'manual') => void;
}
```

**Features**:
- Radio button or toggle interface
- Clear visual indicators for selected mode
- Localized labels and descriptions
- Responsive design

### ManualTemperatureInput Component

**Purpose**: Provides input field for manual temperature entry with validation.

**Props Interface**:
```typescript
interface ManualTemperatureInputProps {
  temperature: number | null;
  onTemperatureChange: (temperature: number | null) => void;
  error?: string;
}
```

**Features**:
- Numeric input field with Celsius unit display
- Real-time validation (0°C to 60°C range)
- Error message display
- Placeholder text and input formatting
- Localized labels and validation messages

### Modified RegionConfirmModal

**Enhancements**:
- Display temperature source information
- Show manual temperature value when applicable
- Updated confirmation text based on temperature mode

### Modified PETResultModal

**Enhancements**:
- Display temperature source ("Real-time Weather Data" or "Manual Input")
- Show temperature value with appropriate source label
- Maintain existing calculation display logic

## Data Models

### Temperature Input State

```typescript
interface TemperatureInputState {
  mode: 'realtime' | 'manual';
  manualValue: number | null;
  source: 'realtime' | 'manual';
  isValid: boolean;
}
```

### PET Calculation Result

```typescript
interface PETCalculationResult {
  petValue: number;
  temperature: number;
  temperatureSource: 'realtime' | 'manual';
  region: string;
  timestamp: Date;
}
```

## Error Handling

### Temperature Input Validation

1. **Range Validation**: Temperature must be between 0°C and 60°C
2. **Format Validation**: Must be a valid numeric value
3. **Required Field**: Temperature is required when manual mode is selected

### Error States

- Invalid temperature range: Display localized error message
- Empty manual temperature: Prevent calculation until value is entered
- API failures in real-time mode: Fallback to existing error handling

### Error Messages

All error messages will be localized and stored in translation files:

```json
{
  "temperatureInput": {
    "invalidRange": "Temperature must be between 0°C and 60°C",
    "required": "Please enter a temperature value",
    "invalidFormat": "Please enter a valid temperature"
  }
}
```

## Testing Strategy

### Unit Tests

1. **TemperatureInputModeSelector**:
   - Mode selection functionality
   - Proper event handling
   - Localization rendering

2. **ManualTemperatureInput**:
   - Input validation logic
   - Error state handling
   - Value formatting and parsing

3. **PET Calculation Logic**:
   - Manual temperature integration
   - Calculation accuracy with manual inputs
   - Temperature source tracking

### Integration Tests

1. **End-to-End Flow**:
   - Complete manual temperature workflow
   - Mode switching behavior
   - Result display accuracy

2. **Localization Tests**:
   - All interface elements in both languages
   - Error messages localization
   - Temperature unit display

### Validation Tests

1. **Temperature Range Validation**:
   - Boundary value testing (0°C, 60°C)
   - Invalid range rejection
   - Edge case handling

2. **License Bypass Validation**:
   - Unlimited manual calculations
   - License check bypass for manual mode
   - Real-time mode license enforcement

## Localization Implementation

### Translation Keys Structure

```json
{
  "temperatureInput": {
    "modeSelector": {
      "title": "Temperature Input Mode",
      "realtime": "Real-time Weather Data",
      "manual": "Manual Input",
      "realtimeDescription": "Use current weather data from OpenWeather API",
      "manualDescription": "Enter temperature manually"
    },
    "manualInput": {
      "label": "Temperature (°C)",
      "placeholder": "Enter temperature (e.g., 25.5)",
      "unit": "°C"
    },
    "validation": {
      "required": "Temperature is required",
      "invalidRange": "Temperature must be between 0°C and 60°C",
      "invalidFormat": "Please enter a valid number"
    },
    "source": {
      "realtime": "Real-time Weather Data",
      "manual": "Manual Input"
    }
  }
}
```

### Localization Files

- `public/locales/en/calculations.json` - English translations
- `public/locales/uk/calculations.json` - Ukrainian translations

## User Experience Flow

### Manual Temperature Mode Flow

1. **Mode Selection**: User selects "Manual" temperature input mode
2. **Temperature Entry**: User enters temperature value in Celsius
3. **Validation**: System validates temperature range (0-60°C)
4. **Region Selection**: User selects region (existing flow)
5. **Confirmation**: System shows confirmation with manual temperature
6. **Calculation**: PET calculated using manual temperature
7. **Results**: Results display with "Manual Input" source indicator

### Real-time Mode Flow

1. **Mode Selection**: User selects "Real-time" temperature input mode (default)
2. **Region Selection**: User selects region
3. **Confirmation**: System shows confirmation
4. **API Call**: System fetches weather data
5. **Calculation**: PET calculated using API temperature
6. **Results**: Results display with "Real-time Weather Data" source

## License Integration

### Manual Mode License Bypass

- Manual temperature calculations bypass all license restrictions
- No license key validation for manual mode
- Unlimited calculations allowed with manual input

### Real-time Mode License Enforcement

- Existing license validation remains unchanged
- API-based calculations continue to require valid license
- License status checks only apply to real-time mode

## Performance Considerations

### State Management Optimization

- Minimize re-renders during temperature input
- Debounce validation for manual input
- Efficient mode switching without data loss

### Memory Management

- Clean up temperature input state on component unmount
- Proper event listener cleanup
- Optimized re-rendering for large temperature ranges

## Security Considerations

### Input Validation

- Server-side validation for temperature ranges
- Sanitization of manual temperature inputs
- Prevention of injection attacks through input fields

### API Security

- Existing OpenWeather API security measures maintained
- No additional API exposure for manual mode
- Secure storage of temperature input preferences

## Accessibility

### Keyboard Navigation

- Full keyboard support for mode selector
- Tab navigation through temperature input
- Enter key submission for temperature values

### Screen Reader Support

- Proper ARIA labels for all input elements
- Descriptive text for temperature modes
- Error message announcements

### Visual Accessibility

- High contrast mode support
- Clear visual indicators for selected modes
- Readable font sizes and spacing

## Browser Compatibility

### Local Storage

- Temperature mode preference storage
- Fallback for browsers without localStorage
- Cross-browser compatibility testing

### Input Field Support

- Number input type with fallbacks
- Mobile-friendly input interfaces
- Touch device optimization