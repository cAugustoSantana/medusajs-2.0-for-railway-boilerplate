# Retro Computer Vibe Implementation Guide

This guide shows you how to achieve the AWGE-style retro computer/terminal aesthetic in your Medusa storefront.

---

## 1. Typography - Monospace Fonts

### Step 1: Add Monospace Font to Tailwind Config

Update `storefront/tailwind.config.js`:

```javascript
fontFamily: {
  sans: [
    "Helvetica",
    "Helvetica Neue",
    "Arial",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Ubuntu",
    "sans-serif",
  ],
  mono: [
    "Courier New",
    "Courier",
    "monospace",
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "monospace",
  ],
},
```

### Step 2: Add Retro Font Classes to globals.css

Add to `storefront/src/styles/globals.css`:

```css
@layer components {
  /* ... existing classes ... */
  
  /* Retro Terminal Typography */
  .terminal-font {
    @apply font-mono;
  }
  
  .terminal-text {
    @apply font-mono text-terminal-green;
  }
  
  .terminal-heading {
    @apply font-mono text-terminal-green uppercase tracking-wider;
  }
}
```

---

## 2. Color Scheme - Terminal Colors

### Step 1: Add Terminal Colors to Tailwind Config

Update `storefront/tailwind.config.js` in the `colors` section:

```javascript
colors: {
  // ... existing grey colors ...
  
  terminal: {
    green: "#00ff00",      // Classic terminal green
    "green-dim": "#00cc00", // Dimmed green
    "green-bright": "#00ff41", // Bright green
    amber: "#ffb000",      // Amber/orange terminal
    cyan: "#00ffff",       // Cyan terminal
    black: "#000000",      // Pure black
    "dark-grey": "#1a1a1a", // Dark grey background
    "border": "#00ff00",    // Terminal border color
  },
},
```

### Step 2: Add Terminal Background Classes

Add to `storefront/src/styles/globals.css`:

```css
@layer components {
  /* Terminal Background */
  .terminal-bg {
    @apply bg-terminal-black text-terminal-green;
  }
  
  .terminal-bg-dark {
    @apply bg-terminal-dark-grey text-terminal-green;
  }
  
  /* Terminal Border */
  .terminal-border {
    @apply border border-terminal-border;
  }
  
  .terminal-border-thick {
    @apply border-2 border-terminal-border;
  }
}
```

---

## 3. Retro Styling Utilities

### Add to `storefront/src/styles/globals.css`:

```css
@layer components {
  /* Terminal Button */
  .terminal-btn {
    @apply font-mono px-4 py-2 border border-terminal-border;
    @apply bg-terminal-black text-terminal-green;
    @apply hover:bg-terminal-green hover:text-terminal-black;
    @apply transition-colors duration-200;
    @apply uppercase tracking-wider;
    @apply cursor-pointer;
  }
  
  .terminal-btn:active {
    @apply bg-terminal-green-dim;
  }
  
  /* Terminal Input */
  .terminal-input {
    @apply font-mono px-3 py-2 border border-terminal-border;
    @apply bg-terminal-black text-terminal-green;
    @apply focus:outline-none focus:ring-2 focus:ring-terminal-green;
    @apply placeholder-terminal-green-dim;
  }
  
  /* Terminal Card/Container */
  .terminal-card {
    @apply border border-terminal-border;
    @apply bg-terminal-black text-terminal-green;
    @apply p-4;
  }
  
  /* Terminal Text Effects */
  .terminal-glow {
    text-shadow: 0 0 5px currentColor, 0 0 10px currentColor;
  }
  
  .terminal-blink {
    animation: terminal-blink 1s infinite;
  }
  
  /* Command Prompt Style */
  .terminal-prompt::before {
    content: '› ';
    @apply text-terminal-green;
  }
  
  .terminal-prompt::after {
    content: '_';
    @apply text-terminal-green terminal-blink;
  }
}

@keyframes terminal-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
```

---

## 4. Remove Rounded Corners (Retro Aesthetic)

### Update Tailwind Config

In `storefront/tailwind.config.js`, you can override border radius:

```javascript
borderRadius: {
  none: "0px",
  // Remove or comment out rounded corners
  // soft: "2px",
  // base: "4px",
  // rounded: "8px",
  // large: "16px",
  // circle: "9999px",
},
```

Or create utility classes:

```css
@layer utilities {
  .no-rounded {
    border-radius: 0 !important;
  }
  
  .terminal-no-rounded {
    @apply rounded-none;
  }
}
```

---

## 5. Component Examples

### A. Landing Screen Component

Create `storefront/src/modules/home/components/terminal-landing/index.tsx`:

```tsx
"use client"

import { useState } from "react"

type TerminalLandingProps = {
  onStart: () => void
}

export default function TerminalLanding({ onStart }: TerminalLandingProps) {
  return (
    <div className="fixed inset-0 terminal-bg flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="terminal-border p-8">
          <h1 className="terminal-heading text-4xl">YOUR BRAND</h1>
        </div>
        
        {/* Press Start Button */}
        <button
          onClick={onStart}
          className="terminal-btn text-xl px-8 py-4 terminal-glow"
        >
          › PRESS START
        </button>
        
        {/* Copyright */}
        <p className="terminal-text text-sm">
          © {new Date().getFullYear()} YOUR BRAND
        </p>
      </div>
    </div>
  )
}
```

### B. Terminal-Style Button Component

Create `storefront/src/modules/common/components/terminal-button/index.tsx`:

```tsx
import { ButtonHTMLAttributes } from "react"
import { clx } from "@medusajs/ui"

type TerminalButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary"
}

export default function TerminalButton({
  children,
  className,
  variant = "primary",
  ...props
}: TerminalButtonProps) {
  return (
    <button
      className={clx(
        "terminal-btn",
        {
          "bg-terminal-black text-terminal-green hover:bg-terminal-green hover:text-terminal-black":
            variant === "primary",
          "bg-terminal-dark-grey text-terminal-green border-terminal-green-dim":
            variant === "secondary",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

### C. Terminal-Style Product Card

Example for product cards:

```tsx
<div className="terminal-card terminal-no-rounded">
  <div className="terminal-border-thick p-4">
    <h3 className="terminal-heading text-lg mb-2">{product.title}</h3>
    <p className="terminal-text text-sm mb-4">{product.description}</p>
    <div className="flex items-center justify-between">
      <span className="terminal-text text-xl terminal-glow">
        {price}
      </span>
      <button className="terminal-btn">
        ADD TO CART
      </button>
    </div>
  </div>
</div>
```

### D. Terminal-Style Modal

```tsx
"use client"

import { useEffect } from "react"

type TerminalModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function TerminalModal({
  isOpen,
  onClose,
  title,
  children,
}: TerminalModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-terminal-black/80"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative terminal-card terminal-no-rounded max-w-2xl w-full mx-4 terminal-border-thick">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 terminal-border-b pb-2">
          <h2 className="terminal-heading text-2xl">{title}</h2>
          <button
            onClick={onClose}
            className="terminal-btn w-10 h-10 flex items-center justify-center"
          >
            X
          </button>
        </div>
        
        {/* Content */}
        <div className="terminal-text">{children}</div>
      </div>
    </div>
  )
}
```

---

## 6. Apply to Existing Components

### Update Product Page

In `storefront/src/modules/products/templates/product-info/index.tsx`:

```tsx
// Add terminal classes
<Heading
  level="h2"
  className="terminal-heading text-3xl leading-10 text-center small:text-left"
>
  {product.title}
</Heading>

<Text className="terminal-text text-medium whitespace-pre-line text-center small:text-left">
  {product.description}
</Text>
```

### Update Buttons

Replace existing buttons with terminal styling:

```tsx
// Before
<Button>Add to Cart</Button>

// After
<button className="terminal-btn">ADD TO CART</button>
```

### Update Cart/Checkout Modals

Use the `TerminalModal` component for cart and checkout:

```tsx
<TerminalModal
  isOpen={isCartOpen}
  onClose={closeCart}
  title="CART"
>
  {cartItems.length === 0 ? (
    <p className="terminal-text text-center py-8">
      YOUR CART IS EMPTY...
    </p>
  ) : (
    <CartItems items={cartItems} />
  )}
</TerminalModal>
```

---

## 7. Advanced Effects

### Typewriter Effect

```tsx
"use client"

import { useState, useEffect } from "react"

type TypewriterProps = {
  text: string
  speed?: number
}

export default function Typewriter({ text, speed = 50 }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <span className="terminal-text">
      {displayedText}
      <span className="terminal-blink">_</span>
    </span>
  )
}
```

### Terminal Glitch Effect

Add to `globals.css`:

```css
@keyframes terminal-glitch {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}

.terminal-glitch {
  animation: terminal-glitch 0.3s infinite;
}
```

### Scanline Effect

```css
.terminal-scanline {
  position: relative;
  overflow: hidden;
}

.terminal-scanline::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(0, 255, 0, 0.1);
  animation: scanline 8s linear infinite;
}

@keyframes scanline {
  0% { transform: translateY(0); }
  100% { transform: translateY(100vh); }
}
```

---

## 8. Full Implementation Checklist

- [ ] Add monospace font to Tailwind config
- [ ] Add terminal colors to Tailwind config
- [ ] Create terminal utility classes in globals.css
- [ ] Remove rounded corners (or create no-rounded utilities)
- [ ] Create TerminalButton component
- [ ] Create TerminalModal component
- [ ] Create TerminalLanding component (optional)
- [ ] Update product cards with terminal styling
- [ ] Update buttons with terminal styling
- [ ] Update modals (cart, checkout) with terminal styling
- [ ] Add terminal font to headings/text
- [ ] Test on mobile and desktop
- [ ] Add animations (glow, blink, typewriter) if desired

---

## 9. Quick Start - Minimal Implementation

If you want a quick start, just add these to your existing files:

### `tailwind.config.js`:
```javascript
fontFamily: {
  // ... existing ...
  mono: ["Courier New", "Courier", "monospace"],
},
colors: {
  // ... existing ...
  terminal: {
    green: "#00ff00",
    black: "#000000",
  },
},
```

### `globals.css`:
```css
@layer components {
  .terminal {
    @apply font-mono bg-terminal-black text-terminal-green;
  }
  
  .terminal-btn {
    @apply font-mono px-4 py-2 border border-terminal-green;
    @apply bg-terminal-black text-terminal-green;
    @apply hover:bg-terminal-green hover:text-terminal-black;
    @apply transition-colors uppercase tracking-wider;
  }
}
```

Then use `className="terminal"` and `className="terminal-btn"` on your components!

---

## 10. Examples of Applied Styling

### Navigation
```tsx
<nav className="terminal-border-b">
  <div className="content-container flex items-center justify-between py-4">
    <h1 className="terminal-heading">YOUR BRAND</h1>
    <button className="terminal-btn">CART</button>
  </div>
</nav>
```

### Product Grid
```tsx
<div className="grid grid-cols-2 small:grid-cols-4 gap-4">
  {products.map((product) => (
    <div key={product.id} className="terminal-card terminal-no-rounded">
      {/* Product content */}
    </div>
  ))}
</div>
```

---

Would you like me to implement any of these changes directly in your codebase?

