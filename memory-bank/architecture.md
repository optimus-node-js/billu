# Proposal Site Architecture Documentation

## 🏗️ Project Overview

**Project Name:** Proposal Site  
**Version:** 0.1.0  
**Type:** Interactive Proposal Website  
**Framework:** Next.js 15.5.0 with React 19.1.0  
**Styling:** Tailwind CSS v4  
**Animation:** Motion (Framer Motion) v12.23.12  

## 🎯 Project Purpose

An emotionally engaging, interactive proposal website designed to create a memorable and magical experience for expressing love. The site uses progressive disclosure, smooth animations, and interactive elements to build emotional connection through a carefully crafted user journey.

## 🏛️ Architecture Overview

### Core Architecture Pattern
- **Single Page Application (SPA)** with screen-based navigation
- **State-driven screen transitions** using React useState
- **Component-based modular design** with clear separation of concerns
- **Progressive disclosure** pattern for emotional engagement

### Technology Stack

#### Frontend Framework
- **Next.js 15.5.0** - React framework with App Router
- **React 19.1.0** - Component library with latest features
- **Client-side rendering** - All components use "use client" directive

#### Styling & UI
- **Tailwind CSS v4** - Utility-first CSS framework
- **Custom CSS animations** - Panda loader and scrollbar styling
- **Responsive design** - Mobile-first approach with md: breakpoints
- **Gradient backgrounds** - Dynamic color schemes throughout

#### Animation & Interactions
- **Motion (Framer Motion) v12.23.12** - Smooth animations and transitions
- **Canvas Confetti v1.9.3** - Celebration effects
- **SweetAlert2 v11.22.4** - Interactive modal dialogs
- **Swiper v11.2.10** - Photo carousel with coverflow effect

#### Icons & Assets
- **Lucide React v0.541.0** - Icon library
- **Static assets** - Images, GIFs, and audio files in public directory

## 📁 Project Structure

```
proposal-site/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and animations
│   │   ├── layout.js            # Root layout with metadata
│   │   └── page.jsx             # Main application entry point
│   └── components/
│       ├── FirstScreen.jsx      # Welcome screen with CTA
│       ├── QuestionScreen.jsx   # Interactive Q&A screens
│       ├── BalloonsScreen.jsx   # "I Love You" balloon animation
│       ├── PhotoScreen.jsx      # Photo carousel with memories
│       ├── FinalScreen.jsx      # Proposal message and confetti
│       └── CuteLoader.jsx       # Animated panda loader
├── public/
│   ├── audio/                   # Background music (bg.mp3)
│   ├── gif/                     # Animated GIFs for interactions
│   └── images/                  # Photo gallery assets
└── configuration files...
```

## 🔄 Screen Flow Architecture

### State Management
- **Single state variable:** `currentScreen` controls entire application flow
- **Screen progression:** loader → first → question1 → question2 → balloons → photos → final
- **No external state management** - Pure React useState pattern

### Screen Transition Pattern
```javascript
const [currentScreen, setCurrentScreen] = useState("loader")
const nextScreen = (screen) => setCurrentScreen(screen)
```

### Screen Components

1. **CuteLoader** - 3-second animated panda with loading dots
2. **FirstScreen** - Welcome message with "Tap to Begin" CTA
3. **QuestionScreen** - Interactive Q&A with SweetAlert2 modals
4. **BalloonsScreen** - Animated "I Love You" balloons with physics
5. **PhotoScreen** - Swiper carousel with coverflow effect
6. **FinalScreen** - Typing animation proposal with confetti celebration

## 🎨 Design System

### Color Palette
- **Primary:** Pink gradients (#ec4899, #be185d)
- **Secondary:** Purple gradients (#a855f7, #7c3aed)
- **Background:** Dark gradients with transparency
- **Text:** White/pink variations with opacity

### Typography
- **Font:** Shantell Sans (Google Fonts)
- **Hierarchy:** Responsive text sizing (text-2xl to text-6xl)
- **Effects:** Gradient text with bg-clip-text

### Animation Principles
- **Entrance animations:** Scale, opacity, and transform combinations
- **Micro-interactions:** Hover effects and button scaling
- **Timing:** Staggered delays for sequential reveals
- **Easing:** Spring physics for natural movement

## 🔧 Component Architecture

### Component Patterns

#### Screen Components
- **Consistent structure:** min-h-screen flex layout
- **Animation wrapper:** Motion.div with entrance/exit animations
- **Content centering:** flex items-center justify-center
- **Responsive design:** px-4 py-6 with max-width containers

#### Interactive Elements
- **Button pattern:** Gradient backgrounds with hover effects
- **Modal pattern:** SweetAlert2 with custom styling
- **Carousel pattern:** Swiper with coverflow effect
- **Typing effect:** Custom interval-based text animation

### Key Architectural Decisions

1. **No routing** - Single page with state-based navigation
2. **Client-side only** - All components use "use client"
3. **Progressive disclosure** - Information revealed gradually
4. **Emotional pacing** - Delays and animations create anticipation
5. **Mobile-first** - Responsive design with touch interactions

## 🚀 Performance Considerations

### Optimization Strategies
- **Image optimization:** Next.js Image component with proper sizing
- **Animation performance:** Transform and opacity for GPU acceleration
- **Bundle size:** Tree-shaking with ES6 imports
- **Loading strategy:** 3-second loader with asset preloading

### Asset Management
- **Static assets:** Organized in public directory by type
- **Image formats:** JPG for photos, GIF for animations
- **Audio:** MP3 format for background music
- **Icons:** Lucide React for consistent iconography

## 🔒 Security & Privacy

### Data Handling
- **No user data collection** - Purely client-side experience
- **No external APIs** - Self-contained application
- **No authentication** - Public access design
- **Asset security** - Static files only

## 📱 Responsive Design

### Breakpoint Strategy
- **Mobile-first:** Base styles for mobile devices
- **md: breakpoint:** Tablet and desktop enhancements
- **Flexible layouts:** Grid and flexbox for adaptability
- **Touch-friendly:** Large tap targets and gestures

### Device Considerations
- **Mobile:** Touch interactions and portrait orientation
- **Tablet:** Enhanced spacing and larger text
- **Desktop:** Hover effects and keyboard navigation
- **Accessibility:** Semantic HTML and ARIA labels

## 🔮 Future Architecture Considerations

### Scalability
- **Component library:** Reusable animation components
- **Theme system:** Configurable color schemes
- **Internationalization:** Multi-language support
- **Analytics:** User interaction tracking

### Enhancement Opportunities
- **PWA features:** Offline capability and app-like experience
- **Advanced animations:** Lottie animations and 3D effects
- **Personalization:** Customizable content and themes
- **Social sharing:** Integration with social platforms
