# Requirements Document

## Introduction

This feature enhances the PET evaluation system by providing users with flexibility in temperature data input. Users can choose between real-time weather data from OpenWeather API or manual temperature entry, ensuring accessibility and removing license restrictions for manual calculations.

## Requirements

### Requirement 1

**User Story:** As a farmer, I want to choose between real-time and manual temperature input, so that I can perform PET calculations when I prefer to use my own temperature measurements.

#### Acceptance Criteria

1. WHEN the user accesses the PET evaluation page THEN the system SHALL display a temperature input mode selector with "Real-time" and "Manual" options
2. WHEN the user selects "Real-time" mode THEN the system SHALL use the current OpenWeather API implementation to fetch temperature data
3. WHEN the user selects "Manual" mode THEN the system SHALL display a temperature input field for manual entry
4. WHEN the user enters a temperature manually THEN the system SHALL validate the input is within reasonable agricultural temperature ranges (0°C to 60°C)

### Requirement 2

**User Story:** As a farmer, I want to manually enter temperature data, so that I can still calculate PET and irrigation rates without relying on real-time weather services.

#### Acceptance Criteria

1. WHEN the user selects manual temperature input THEN the system SHALL accept temperature values in Celsius
2. WHEN the user enters a valid temperature THEN the system SHALL use this value for all PET and irrigation calculations
3. WHEN the user enters an invalid temperature THEN the system SHALL display appropriate error messages
4. WHEN using manual temperature input THEN the system SHALL preserve all existing PET calculation logic and formulas

### Requirement 3

**User Story:** As any user, I want unlimited access to manual PET calculations, so that I can evaluate irrigation needs without license key restrictions.

#### Acceptance Criteria

1. WHEN the user performs manual temperature-based PET calculations THEN the system SHALL NOT check for license key validation
2. WHEN the user uses manual input mode THEN the system SHALL allow unlimited calculations regardless of license status
3. WHEN the user switches to real-time mode THEN the system SHALL apply existing license restrictions if applicable
4. WHEN displaying calculation results from manual input THEN the system SHALL clearly indicate the temperature source as "Manual Input"

### Requirement 4

**User Story:** As a user, I want a clear and intuitive interface for temperature input selection, so that I can easily understand and switch between different input modes.

#### Acceptance Criteria

1. WHEN the temperature input mode selector is displayed THEN the system SHALL use clear labels and visual indicators
2. WHEN the user switches between modes THEN the system SHALL immediately update the interface to show relevant input fields
3. WHEN in manual mode THEN the system SHALL display temperature input with appropriate units (°C) and placeholder text
4. WHEN the user has entered manual temperature THEN the system SHALL display the entered value clearly in calculation results

### Requirement 5

**User Story:** As a user, I want my temperature input mode preference to be remembered, so that I don't have to reselect my preferred mode each time I use the application.

#### Acceptance Criteria

1. WHEN the user selects a temperature input mode THEN the system SHALL store this preference in local storage
2. WHEN the user returns to the PET evaluation page THEN the system SHALL default to their previously selected mode
3. WHEN no previous preference exists THEN the system SHALL default to "Real-time" mode
4. WHEN the user clears browser data THEN the system SHALL reset to default "Real-time" mode


### Requirement 6

**User Story:** As a user, I want completely localized (English and Ukrainian) interface for choosing the app mode and temperature inputs section, so that I can use the application in my preferred language.

#### Acceptance Criteria

1. WHEN the user views the temperature input mode selector THEN the system SHALL display all labels and options in the selected language (English or Ukrainian)
2. WHEN the user switches languages THEN the system SHALL immediately update all temperature input interface elements to the new language
3. WHEN validation errors occur for temperature input THEN the system SHALL display error messages in the user's selected language
4. WHEN displaying calculation results with manual temperature THEN the system SHALL show temperature source labels and units in the selected language
