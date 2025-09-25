# Component Documentation

## 🧩 Component Architecture Overview

The proposal site follows a modular component architecture where each screen is a self-contained component with consistent patterns for styling, animation, and interaction. All components use React functional components with hooks for state management and effects.

## 📱 Screen Components

### CuteLoader Component
**Purpose:** Initial loading screen with animated panda  
**Duration:** 3 seconds automatic progression  
**Key Features:**
- Animated panda with blinking eyes and smiling mouth
- "Something special is coming..." message
- Pulsing loading dots animation
- Automatic transition to FirstScreen

**Technical Implementation:**
```javascript
// CSS-based panda animation
.panda-head { /* Panda head styling */ }
.eyelid { animation: blink 5s ease-in-out infinite; }
.mouth { animation: smile 5s ease-in-out infinite; }

// Motion loading dots
{[0, 1, 2].map((i) => (
  <motion.div
    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
  />
))}
```

### FirstScreen Component
**Purpose:** Welcome screen with call-to-action  
**User Control:** Button click to proceed  
**Key Features:**
- Animated cute GIF in circular container
- Gradient text headline
- "Tap to Begin" button with heart icon
- Spring animations for visual appeal

**Props:**
- `onNext`: Callback function for navigation

**Animation Sequence:**
1. GIF container scales in with spring physics
2. Headline fades in with upward motion
3. Subtitle appears with delay
4. Button scales in with hover effects

### QuestionScreen Component
**Purpose:** Interactive Q&A with emotional responses  
**User Control:** Yes/No button selection  
**Key Features:**
- Configurable question text
- Different modal responses for "No" answers
- Heart icon with rotation animation
- Persuasive messaging for negative responses

**Props:**
- `question`: String question to display
- `onYes`: Callback for "Yes" response
- `isFirst`: Boolean to determine modal content

**Interactive Behavior:**
- **Yes:** 500ms delay then proceeds to next screen
- **No:** Shows SweetAlert2 modal with appropriate GIF and message

**Modal Content:**
- **First question:** "But this one is special!" with please.gif
- **Second question:** "Please say yes!" with tears.gif

### BalloonsScreen Component
**Purpose:** Animated "I Love You" message with physics  
**Duration:** 3.5 seconds animation + user interaction  
**Key Features:**
- Three balloons spelling "I Love You"
- Physics-based rise animation from bottom
- Continuous rotation animation
- Continue button appears after animation completes

**Animation Sequence:**
1. Text appears with fade-in effect
2. Balloons animate from bottom with spring physics
3. Continuous rotation animation on balloons
4. Continue button fades in after 3.5 seconds

**Technical Details:**
- Complex motion animations with spring physics
- SVG string elements for balloon tethers
- Heart icons with different colors for each balloon
- Pointer events disabled until animation completes

### PhotoScreen Component
**Purpose:** Photo carousel with personal memories  
**User Control:** Swipe navigation + continue button  
**Key Features:**
- Dynamic photo loading from public/images folder
- Swiper carousel with coverflow effect
- Automatic image detection and loading
- Dynamic bullet pagination
- Continue button appears after 2 seconds
- Loading state with spinner

**Technical Implementation:**
```javascript
// Dynamic image loading
const loadImages = async () => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
  const photos = []
  
  for (let i = 1; i <= 50; i++) {
    for (const ext of imageExtensions) {
      const imagePath = `/images/${i}${ext}`
      try {
        const img = new Image()
        await new Promise((resolve, reject) => {
          img.onload = () => resolve()
          img.onerror = () => reject()
          img.src = imagePath
        })
        photos.push({ id: i, src: imagePath })
        break
      } catch (error) {
        // Image doesn't exist, continue to next extension
      }
    }
  }
  setPhotos(photos)
}

// Swiper configuration
<Swiper
  effect={"coverflow"}
  grabCursor={true}
  centeredSlides={true}
  slidesPerView={"auto"}
  coverflowEffect={{ depth: 120 }}
  pagination={{ clickable: true, dynamicBullets: true }}
  modules={[EffectCoverflow, Pagination]}
>
```

**Props:**
- `onNext`: Callback for navigation to final screen

**Dynamic Loading Features:**
- Intelligently detects images by checking consecutive numbers
- Stops after 3 consecutive "not found" images (optimized performance)
- Supports multiple image formats (jpg, jpeg, png, webp, gif)
- Fallback to hardcoded array if dynamic loading fails
- Loading spinner while images are being detected
- Console logging for debugging image detection

**Flip Card Features:**
- 3D flip animation on center photo click
- Click side photos to select and center them
- Auto-reset flipped cards when selecting new photo
- Dynamic story mapping based on photo ID
- Beautiful story cards with metadata
- Smooth CSS 3D transforms with Motion.js
- Hover effects and visual hints
- Active card highlighting with ring border
- Fallback stories for photos without custom content

### FlipPhotoCard Component
**Purpose:** Interactive photo card with 3D flip animation and story display  
**User Control:** Click side photos to select • Click center photo to flip  
**Key Features:**
- 3D CSS flip animation with smooth transitions
- Click side photos to select and center them
- Auto-reset when card becomes inactive
- Dynamic story loading based on photo ID
- Beautiful gradient story cards with metadata
- Active card highlighting with ring border
- Hover effects and visual hints
- Photo number indicators
- Responsive design with proper aspect ratios

**Technical Implementation:**
```javascript
// 3D flip animation
<motion.div
  animate={{ rotateY: isFlipped ? 180 : 0 }}
  transition={{ duration: 0.8, ease: "easeInOut" }}
>

// Story mapping
const story = getPhotoStory(photo.id)

// CSS 3D transforms
.perspective-1000 { perspective: 1000px; }
.backface-hidden { backface-visibility: hidden; }
```

**Props:**
- `photo`: Photo object with id and src
- `index`: Array index for animation delays

**Story Data Structure:**
- Title, story text, date, and mood for each photo
- Default fallback story for photos without custom content
- JSON-based configuration for easy management

### FinalScreen Component
**Purpose:** Proposal message with celebration  
**User Control:** Tap to open + typing animation + confetti  
**Key Features:**
- Closed envelope with pulsing animation
- Tap-to-open interactive card
- Typing animation for proposal message
- Confetti celebration on "Yes" response
- Final heart merging animation

**Animation Sequence:**
1. Envelope with pulsing animation
2. Card opens with spring animation
3. Text types out character by character (30ms intervals)
4. Question and button appear after typing completes
5. Confetti explosion on button click
6. Heart halves merge with animation
7. Final celebration message

**Technical Details:**
- Canvas Confetti library for celebration effects
- Custom typing animation with intervals
- Complex heart merging animation with clip-path
- Overlay modal for final celebration
- Auto-scroll during typing animation

## 🎨 Shared Component Patterns

### Motion Wrapper Pattern
All screen components use consistent motion wrapper:
```javascript
<motion.div
  className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 1 }}
>
```

### Button Pattern
Consistent button styling across components:
```javascript
<button
  onClick={handleAction}
  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center"
>
  <Heart className="w-5 h-5 mr-2" />
  Button Text
</button>
```

### Text Animation Pattern
Staggered text animations for visual hierarchy:
```javascript
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1, duration: 0.8 }}
>
  Headline Text
</motion.h1>

<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.5, duration: 0.8 }}
>
  Subtitle Text
</motion.p>
```

## 🔧 Component Communication

### Props Interface
- **onNext:** Callback function for screen progression
- **question:** String for QuestionScreen component
- **isFirst:** Boolean for modal content determination

### State Management
- **Local state:** Each component manages its own internal state
- **Parent state:** Main page component manages screen progression
- **No external state:** Pure React useState implementation

### Event Handling
- **Click events:** Button interactions for navigation
- **Timer events:** Automatic progression for animations
- **Animation events:** Callbacks for animation completion

## 🎯 Component Design Principles

### Consistency
- **Layout structure:** All screens use same flex layout pattern
- **Animation timing:** Consistent duration and easing
- **Color scheme:** Unified gradient and color palette
- **Typography:** Consistent font hierarchy and sizing

### Responsiveness
- **Mobile-first:** Base styles for mobile devices
- **Breakpoint usage:** md: prefix for tablet/desktop
- **Flexible layouts:** Grid and flexbox for adaptability
- **Touch-friendly:** Large tap targets and gestures

### Performance
- **Animation optimization:** Transform and opacity for GPU acceleration
- **Asset optimization:** Next.js Image component with proper sizing
- **Memory management:** Cleanup of timers and intervals
- **Bundle optimization:** Tree-shaking and code splitting

## 🚀 Component Enhancement Opportunities

### Accessibility Improvements
- **Screen reader support:** ARIA labels and semantic HTML
- **Keyboard navigation:** Arrow keys for progression
- **Motion preferences:** Respect prefers-reduced-motion
- **Focus management:** Proper focus handling

### Advanced Features
- **Gesture navigation:** Swipe gestures for screen changes
- **Sound effects:** Audio feedback for interactions
- **Haptic feedback:** Vibration for mobile devices
- **Analytics:** User interaction tracking

### Customization
- **Theme system:** Configurable color schemes
- **Content management:** Dynamic content loading
- **Personalization:** Customizable messages and images
- **Localization:** Multi-language support
