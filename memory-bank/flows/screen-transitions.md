# Screen Transition Flow

## 🔄 Screen Transition Architecture

The proposal site uses a state-driven screen transition system where a single `currentScreen` state variable controls the entire application flow. This creates a seamless, linear progression through the emotional journey.

## 📊 Transition State Diagram

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   loader    │───▶│    first    │───▶│ question1   │
│ (3s auto)   │    │ (user tap)  │    │ (user yes)  │
└─────────────┘    └─────────────┘    └─────────────┘
                                              │
                                              ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   final     │◀───│   photos    │◀───│ balloons    │
│ (confetti)  │    │ (continue)  │    │ (auto 3.5s) │
└─────────────┘    └─────────────┘    └─────────────┘
                                              ▲
                                              │
                                    ┌─────────────┐
                                    │ question2   │
                                    │ (user yes)  │
                                    └─────────────┘
```

## 🎬 Transition Implementation

### Main Transition Controller
```javascript
// src/app/page.jsx
const [currentScreen, setCurrentScreen] = useState("loader")

const nextScreen = (screen) => {
  setCurrentScreen(screen)
}

// AnimatePresence handles smooth transitions
<AnimatePresence mode="wait">
  {currentScreen === "loader" && <CuteLoader key="loader" />}
  {currentScreen === "first" && <FirstScreen key="first" onNext={() => nextScreen("question1")} />}
  // ... other screens
</AnimatePresence>
```

### Transition Types

#### 1. **Automatic Transitions**
- **Loader → First:** 3-second timer
- **Balloons → Photos:** Button appears after 3.5s animation

#### 2. **User-Triggered Transitions**
- **First → Question1:** Button click
- **Question1 → Question2:** "Yes" answer
- **Question2 → Balloons:** "Yes" answer
- **Photos → Final:** "See the Message" button

#### 3. **Modal Interactions**
- **"No" answers:** SweetAlert2 modals (no screen change)
- **Persuasive messaging:** Encourages user to continue

## 🎨 Animation Transitions

### Screen Entrance Animations
```javascript
// Standard entrance pattern
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.9 }}
transition={{ duration: 0.8 }}
```

### Special Transition Effects

#### Balloons Screen
- **Entrance:** Scale and opacity with spring physics
- **Exit:** Fade out with scale reduction
- **Internal animations:** Balloons rise from bottom

#### Final Screen
- **Entrance:** Scale and opacity with spring
- **Card opening:** Layout animation with spring physics
- **Typing effect:** Character-by-character reveal

## ⏱️ Timing Strategy

### Automatic Timing
- **Loader duration:** 3000ms (fixed)
- **Balloon animation:** 3500ms before button appears
- **Photo screen:** 2000ms before continue button
- **Typing speed:** 30ms per character

### User-Controlled Timing
- **Question screens:** User controls pace
- **Photo carousel:** User controls viewing time
- **Final screen:** User controls reading pace

## 🔧 Transition Technical Details

### AnimatePresence Configuration
```javascript
<AnimatePresence mode="wait">
  // mode="wait" ensures only one screen is visible at a time
  // Each screen has unique key for proper unmounting
</AnimatePresence>
```

### State Management Pattern
- **Single source of truth:** `currentScreen` state
- **Props drilling:** `onNext` callback passed to each screen
- **No external state:** Pure React useState implementation

### Performance Considerations
- **GPU acceleration:** Transform and opacity animations
- **Memory cleanup:** Components unmount properly
- **Smooth transitions:** Consistent timing and easing

## 🎯 Emotional Transition Design

### Pacing Strategy
1. **Quick start:** 3-second loader builds anticipation
2. **Engagement:** Interactive questions maintain attention
3. **Revelation:** Balloons provide visual impact
4. **Connection:** Photos create personal touch
5. **Climax:** Proposal message delivers main content
6. **Celebration:** Confetti provides joyful closure

### Transition Psychology
- **Anticipation:** Each transition builds excitement
- **Control:** User controls most progression timing
- **Surprise:** Automatic elements create delightful moments
- **Satisfaction:** Smooth transitions feel polished

## 🚀 Future Enhancement Opportunities

### Advanced Transitions
- **Page transitions:** Custom transition effects between screens
- **Gesture navigation:** Swipe gestures for screen changes
- **Keyboard navigation:** Arrow keys for progression
- **Accessibility:** Screen reader announcements for transitions

### Performance Optimizations
- **Preloading:** Load next screen assets in background
- **Lazy loading:** Load screens only when needed
- **Memory management:** Optimize component unmounting
- **Animation optimization:** Reduce motion for accessibility
