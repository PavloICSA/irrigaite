# Design System Documentation

## Overview

IrrigAIte UA implements a minimalist design system focused on clarity, accessibility, and agricultural functionality. The design emphasizes generous whitespace, clean typography, and intuitive user interactions while maintaining professional agricultural aesthetics.

## Design Principles

### Minimalism
- **Generous Whitespace**: Ample spacing between elements for visual breathing room
- **Clean Typography**: Refined font scales with optimized readability
- **Focused Content**: Clear hierarchy and purposeful element placement
- **Reduced Visual Noise**: Minimal decorative elements, emphasis on functionality

### Accessibility First
- **WCAG 2.1 AA Compliance**: Minimum 4.5:1 contrast ratios
- **Keyboard Navigation**: Full keyboard accessibility with visible focus indicators
- **Screen Reader Support**: Semantic HTML and proper ARIA labels
- **Reduced Motion**: Respects user's motion preferences

### Agricultural Context
- **Green Color Palette**: Earth-tones reflecting agricultural and irrigation themes
- **Professional Aesthetics**: Clean, scientific appearance suitable for agricultural professionals
- **Data-Focused**: Clear presentation of calculations and technical information

## Color System

### Primary Palette
The color system uses HSL values with CSS custom properties for seamless theme switching:

```css
/* Light Mode */
--primary: 120 45% 45%;        /* Agricultural green */
--primary-foreground: 0 0% 100%; /* White text on primary */

/* Dark Mode */
--primary: 120 40% 55%;        /* Adjusted for dark backgrounds */
--primary-foreground: 0 0% 9%; /* Dark text on primary */
```

### Color Scale
- **Primary 50-900**: Full green scale from very light to very dark
- **Neutral 50-900**: Grayscale palette for text and backgrounds
- **Status Colors**: Success (green), Warning (amber), Error (red)

### Usage Guidelines
- **Primary**: Main actions, navigation highlights, brand elements
- **Neutral**: Text, borders, backgrounds, subtle elements
- **Status**: Feedback messages, validation states, alerts

## Typography

### Font System
Refined typography scale with optimized line heights and letter spacing:

```css
/* Base font settings */
body {
  font-feature-settings: "rlig" 1, "calt" 1;
  letter-spacing: 0.025em;
}

/* Typography scale */
text-xs: 0.75rem (line-height: 1.5)
text-sm: 0.875rem (line-height: 1.5)
text-base: 1rem (line-height: 1.6)
text-lg: 1.125rem (line-height: 1.6)
text-xl: 1.25rem (line-height: 1.5)
text-2xl: 1.5rem (line-height: 1.4)
text-3xl: 1.875rem (line-height: 1.3)
text-4xl: 2.25rem (line-height: 1.2)
```

### Font Weights
- **Normal (400)**: Body text, descriptions
- **Medium (500)**: Emphasized text, labels
- **Semibold (600)**: Subheadings, important information
- **Bold (700)**: Headings, strong emphasis

### Text Utilities
- **Text Justification**: Improved readability with balanced text layout
- **Language Support**: Optimized rendering for Ukrainian and English
- **Responsive Typography**: Appropriate scaling across device sizes

## Spacing System

### Enhanced Spacing Scale
Generous spacing for minimalist design:

```css
/* Standard Tailwind + Enhanced */
4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px
/* Additional spacing */
72px (18), 88px (22), 104px (26), 120px (30)
```

### Spacing Guidelines
- **Component Padding**: 16px-24px for comfortable touch targets
- **Section Spacing**: 48px-96px between major sections
- **Element Spacing**: 8px-16px between related elements
- **Page Margins**: Responsive margins with generous desktop spacing

## Component System

### Button Components

#### Primary Button
```css
.btn-primary {
  @apply px-4 py-2 text-sm font-medium rounded-md;
  @apply bg-primary text-primary-foreground;
  @apply hover:bg-primary/90 transition-colors;
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring;
}
```

#### Minimal Button
```css
.btn-minimal {
  @apply px-4 py-2 text-sm font-medium rounded-md;
  @apply bg-transparent border border-border text-foreground;
  @apply hover:bg-accent hover:text-accent-foreground;
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring;
}
```

#### Ghost Button
```css
.btn-ghost {
  @apply px-4 py-2 text-sm font-medium rounded-md;
  @apply bg-transparent text-foreground;
  @apply hover:bg-accent hover:text-accent-foreground;
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring;
}
```

### Input Components

#### Minimal Input
```css
.input-minimal {
  @apply w-full px-3 py-2 text-sm rounded-md border border-border;
  @apply bg-background text-foreground placeholder:text-muted-foreground;
  @apply focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent;
  @apply disabled:cursor-not-allowed disabled:opacity-50;
}
```

### Card Components

#### Minimal Card
```css
.card-minimal {
  @apply bg-surface border border-border rounded-lg p-6;
  @apply shadow-subtle;
}
```

#### Elevated Card
```css
.card-elevated {
  @apply bg-surface border border-border rounded-lg p-6;
  @apply shadow-soft;
}
```

### Navigation Components

#### Navigation Bar
```css
.nav-minimal {
  @apply bg-background/95 backdrop-blur-sm border-b border-border;
}
```

#### Navigation Items
```css
.nav-item {
  @apply px-3 py-2 text-sm font-medium rounded-md transition-colors;
  @apply text-muted-foreground hover:text-foreground hover:bg-accent;
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring;
}

.nav-item-active {
  @apply bg-accent text-accent-foreground;
}
```

## Layout System

### Container Patterns
- **Max Width**: Responsive containers with appropriate max-widths
- **Padding**: Consistent horizontal padding across breakpoints
- **Centering**: Centered layouts with balanced whitespace

### Grid System
- **CSS Grid**: Modern grid layouts for complex arrangements
- **Flexbox**: Flexible layouts for component arrangements
- **Responsive**: Mobile-first responsive design patterns

### Page Layout
```tsx
// Standard page layout pattern
<div className="min-h-screen bg-background">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="text-center mb-16">
      <h1 className="text-3xl font-bold text-foreground mb-4">
        Page Title
      </h1>
      <p className="text-lg text-muted-foreground">
        Page description
      </p>
    </div>
    {/* Page content */}
  </div>
</div>
```

## Theme System

### Light Theme
- **Background**: Pure white (#FFFFFF)
- **Surface**: Off-white (#FAFAFA)
- **Text**: Near-black (#171717)
- **Borders**: Light gray (#E5E5E5)

### Dark Theme
- **Background**: Dark gray (#171717)
- **Surface**: Slightly lighter gray (#1F1F1F)
- **Text**: Off-white (#FAFAFA)
- **Borders**: Dark gray (#333333)

### Theme Implementation
```css
/* CSS Custom Properties for theme switching */
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 9%;
  --surface: 0 0% 98%;
  --border: 0 0% 90%;
}

.dark {
  --background: 0 0% 9%;
  --foreground: 0 0% 98%;
  --surface: 0 0% 12%;
  --border: 0 0% 20%;
}
```

### Theme Switching
- **System Preference**: Respects user's OS theme preference
- **Manual Toggle**: User can override system preference
- **Persistence**: Theme choice stored in localStorage
- **Smooth Transitions**: Animated theme transitions

## Animation System

### Subtle Animations
Minimal animation system focused on enhancing usability:

```css
/* Fade in animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide up animation */
@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Animation classes */
.animate-fade-in { animation: fadeIn 0.2s ease-in-out; }
.animate-slide-up { animation: slideUp 0.2s ease-out; }
```

### Transition System
```css
/* Global transitions for theme switching */
* {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Shadow System

### Minimal Shadow Scale
```css
/* Subtle shadows for depth */
shadow-subtle: 0 1px 2px 0 rgb(0 0 0 / 0.05);
shadow-soft: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
shadow-medium: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
```

### Usage Guidelines
- **Subtle**: Default card elevation, minimal depth
- **Soft**: Interactive elements, slight elevation
- **Medium**: Modals, dropdowns, prominent elements

## Border Radius System

### Consistent Radius Scale
```css
border-radius-sm: 0.25rem (4px)
border-radius-md: 0.375rem (6px)
border-radius-lg: 0.5rem (8px)
border-radius-xl: 0.75rem (12px)
```

### Usage Guidelines
- **Small**: Buttons, inputs, small elements
- **Medium**: Cards, containers, standard elements
- **Large**: Modals, major containers
- **Extra Large**: Hero sections, prominent features

## Accessibility Features

### Focus Management
```css
/* Enhanced focus indicators */
*:focus-visible {
  @apply outline-none ring-2 ring-ring ring-offset-2 ring-offset-background;
}
```

### Screen Reader Support
```css
/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Color Contrast
- **Text on Background**: Minimum 4.5:1 ratio
- **Interactive Elements**: Enhanced contrast for better visibility
- **Status Colors**: Accessible color choices for all users

## Responsive Design

### Breakpoint System
```css
/* Tailwind CSS breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

### Mobile-First Approach
- **Base Styles**: Optimized for mobile devices
- **Progressive Enhancement**: Enhanced features for larger screens
- **Touch Targets**: Minimum 44px touch targets for mobile
- **Readable Text**: Appropriate font sizes across devices

## Implementation Guidelines

### Component Development
1. **Start with Utility Classes**: Use Tailwind utilities for rapid development
2. **Extract Patterns**: Create reusable utility classes for common patterns
3. **Maintain Consistency**: Follow established design patterns
4. **Test Accessibility**: Verify keyboard navigation and screen reader support

### Design Tokens
- **Use CSS Custom Properties**: For theme-aware values
- **Consistent Naming**: Follow established naming conventions
- **Documentation**: Document custom properties and their usage

### Performance Considerations
- **Minimal CSS**: Purge unused styles in production
- **Efficient Animations**: Use transform and opacity for smooth animations
- **Optimized Images**: Proper image optimization and lazy loading

## Future Enhancements

### Planned Improvements
- **Component Library**: Standalone component library extraction
- **Design Tokens**: Formal design token system
- **Advanced Animations**: More sophisticated micro-interactions
- **Accessibility Enhancements**: Additional accessibility features

### Scalability Considerations
- **Theme Variants**: Additional theme options
- **Component Variants**: More component variations
- **Responsive Improvements**: Enhanced mobile experience
- **Performance Optimization**: Continued performance improvements