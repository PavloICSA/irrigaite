# Implementation Plan

- [x] 1. Create temperature input mode selector component






  - Create `TemperatureInputModeSelector.tsx` component with radio button interface
  - Implement mode selection state management (realtime/manual)
  - Add proper TypeScript interfaces and props
  - Include responsive design with Tailwind CSS styling
  - _Requirements: 1.1, 4.1, 4.2_

- [x] 2. Create manual temperature input component








  - Create `ManualTemperatureInput.tsx` component with numeric input field
  - Implement temperature validation logic (0°C to 60°C range)
  - Add real-time input validation with error state handling
  - Include Celsius unit display and proper input formatting
  - _Requirements: 2.1, 2.3, 4.3_

- [x] 3. Add localization support for temperature input components





  - Add translation keys to `public/locales/en/calculations.json` for temperature input interface
  - Add corresponding Ukrainian translations to `public/locales/uk/calculations.json`
  - Include mode selector labels, input labels, validation messages, and source indicators
  - Test localization switching for all new interface elements
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 4. Integrate temperature input components into PETEvaluation page





  - Import and add `TemperatureInputModeSelector` and `ManualTemperatureInput` components to PETEvaluation.tsx
  - Add state management for temperature input mode and manual temperature value
  - Implement mode switching logic with proper state updates
  - Add conditional rendering based on selected temperature input mode
  - _Requirements: 1.1, 1.3, 4.2_

- [x] 5. Implement temperature input mode persistence





  - Add localStorage integration to save user's preferred temperature input mode
  - Implement mode restoration on component mount with fallback to realtime mode
  - Add proper error handling for localStorage access failures
  - Test persistence across browser sessions and page refreshes
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 6. Modify PET calculation logic to support manual temperature





  - Update `handleConfirmRegion` function to use manual temperature when in manual mode
  - Skip OpenWeather API call when manual temperature is provided
  - Ensure PET calculation uses correct temperature source (manual or API)
  - Add temperature source tracking for result display
  - _Requirements: 2.2, 2.4_

- [x] 7. Update RegionConfirmModal to display temperature information







  - Modify `RegionConfirmModal.tsx` to show temperature source information
  - Display manual temperature value when applicable
  - Update confirmation text based on temperature input mode
  - Add localized labels for temperature source display
  - _Requirements: 4.4, 6.4_

- [x] 8. Update PETResultModal to show temperature source







  - Modify `PETResultModal.tsx` to display temperature source indicator
  - Show "Manual Input" or "Real-time Weather Data" labels based on source
  - Update temperature display to include source information
  - Ensure proper localization of source labels
  - _Requirements: 3.4, 4.4, 6.4_

- [x] 9. Implement license bypass for manual temperature calculations





  - Add logic to bypass license validation when using manual temperature input
  - Ensure unlimited calculations are allowed in manual mode
  - Maintain existing license restrictions for real-time mode
  - Add conditional license checking based on temperature input mode
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 10. Create comprehensive unit tests for temperature input components





  - Write tests for `TemperatureInputModeSelector` component functionality
  - Create tests for `ManualTemperatureInput` validation logic and error handling
  - Test temperature range validation (boundary values, invalid inputs)
  - Verify proper event handling and state management
  - _Requirements: 2.3, 4.1, 4.2_

- [x] 11. Create integration tests for manual temperature workflow




  - Write end-to-end tests for complete manual temperature input flow
  - Test mode switching between realtime and manual modes
  - Verify PET calculation accuracy with manual temperature inputs
  - Test temperature source tracking and display in results
  - _Requirements: 1.2, 1.3, 2.2, 3.4_

- [x] 12. Create localization tests for temperature input interface





  - Test all temperature input interface elements in English and Ukrainian
  - Verify error message localization for temperature validation
  - Test temperature unit display and source labels in both languages
  - Ensure proper language switching for all new components
  - _Requirements: 6.1, 6.2, 6.3, 6.4_