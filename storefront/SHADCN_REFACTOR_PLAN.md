# shadcn/ui Refactoring Plan for Medusa Storefront

## Executive Summary

This document outlines a comprehensive plan to refactor the Medusa.js Next.js storefront from its current UI stack (`@medusajs/ui`, `@headlessui/react`) to `shadcn/ui`, a modern component library built on Radix UI and Tailwind CSS.

---

## Current State Analysis

### Current UI Stack
- **@medusajs/ui** (preview): Primary component library for buttons, inputs, labels, checkboxes
- **@headlessui/react** (v1.6.1): Used for modals, dropdowns, and accessibility features
- **@medusajs/ui-preset**: Tailwind preset with custom theme
- **tailwindcss-radix**: Radix UI integration for Tailwind
- **@hookform/error-message**: Form error handling
- **Custom components**: Built with Tailwind CSS in `src/modules/common/components/`

### Component Inventory

#### Components Using @medusajs/ui:
- `Button` - Used in `submit-button`, various action components
- `Label` - Used in `input`, `checkbox` components
- `Checkbox` - Custom checkbox wrapper
- `clx` utility - Class name merging utility

#### Components Using @headlessui/react:
- `Modal` (`Dialog`, `Transition`) - `src/modules/common/components/modal/`
- `Listbox` - Used in `address-select` component
- `Transition` - Animation utilities

#### Custom Components (74 files):
- `Input` - Custom input with floating label
- `NativeSelect` - Styled select dropdown
- `Checkbox` wrapper
- `Radio` - Custom radio button
- `Modal` - Custom modal wrapper
- `Divider`
- `InteractiveLink`
- Various module-specific components

### Styling System
- **Tailwind CSS v3.0.23** with custom theme
- Custom color scale (`grey-0` to `grey-90`)
- Custom border radius tokens
- Custom animations (fade-in, slide-in, accordion animations)
- Custom breakpoints
- Typography utility classes (text-small-regular, text-base-semi, etc.)

---

## Refactoring Goals

1. **Replace @medusajs/ui** with shadcn/ui components
2. **Replace @headlessui/react** with Radix UI primitives (via shadcn/ui)
3. **Maintain existing design language** and functionality
4. **Improve accessibility** with Radix UI primitives
5. **Reduce bundle size** by using only needed components
6. **Enable better customization** with shadcn/ui's copy-paste approach
7. **Maintain TypeScript type safety**

---

## Phase 1: Setup & Foundation

### 1.1 Install shadcn/ui
```bash
cd storefront
npx shadcn@latest init
```

**Configuration:**
- Style: `default`
- Base color: `slate` (closest to current grey scale)
- CSS variables: `yes`
- Component location: `src/components/ui`
- Utils location: `src/lib/utils`
- Use alias: `@/components/ui`
- Tailwind config: merge with existing
- TypeScript: enabled

### 1.2 Update Dependencies
**Remove:**
- `@medusajs/ui` (or keep temporarily for migration)
- `@medusajs/ui-preset` (replace with shadcn config)

**Add:**
- `class-variance-authority` (for variant management)
- `clsx` and `tailwind-merge` (if not already installed)
- `@radix-ui/react-*` packages (via shadcn component installation)

### 1.3 Update Tailwind Config
**File:** `tailwind.config.js`

**Changes:**
- Remove `@medusajs/ui-preset` from presets
- Add shadcn/ui theme configuration
- Map existing custom colors to shadcn CSS variables:
  - `grey-0` → `background`
  - `grey-90` → `foreground`
  - Map existing grey scale to shadcn's neutral scale
- Preserve existing custom animations and keyframes
- Preserve custom breakpoints
- Add shadcn/ui content paths

**Example mapping:**
```js
colors: {
  background: "hsl(var(--background))", // grey-0
  foreground: "hsl(var(--foreground))", // grey-90
  // Map grey scale to neutral scale
  grey: {
    0: "hsl(var(--background))",
    // ... map existing grey tokens
  }
}
```

### 1.4 Create Utility Functions
**File:** `src/lib/utils.ts`

Create utility functions for:
- `cn()` - Class name merging (using `clsx` + `tailwind-merge`)
- Preserve existing utility functions if any

### 1.5 Update CSS Variables
**File:** `src/styles/globals.css`

Add shadcn/ui CSS variables while preserving:
- Existing utility classes
- Existing component classes
- Custom scrollbar styles
- Form autofill styles

---

## Phase 2: Core Component Migration

### 2.1 Install Base shadcn/ui Components
Install these components first as they're dependencies for others:

```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add checkbox
npx shadcn@latest add select
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add radio-group
npx shadcn@latest add form
```

### 2.2 Component Replacement Map

| Current Component | shadcn/ui Component | Migration Path |
|------------------|---------------------|----------------|
| `@medusajs/ui` Button | `Button` | Direct replacement |
| Custom `Input` | `Input` + custom wrapper | Extend shadcn Input |
| `@medusajs/ui` Label | `Label` | Direct replacement |
| `@medusajs/ui` Checkbox | `Checkbox` | Direct replacement |
| Custom `Radio` | `RadioGroup` | Use Radix RadioGroup |
| Custom `NativeSelect` | `Select` | Replace with shadcn Select |
| `@headlessui` Modal | `Dialog` | Replace Dialog/Transition |
| `@headlessui` Listbox | `Select` or `DropdownMenu` | Context-dependent |

---

## Phase 3: Component-by-Component Migration

### 3.1 Button Component
**Files affected:**
- `src/modules/checkout/components/submit-button/index.tsx`
- Various module components using buttons

**Migration:**
1. Replace `@medusajs/ui` Button with shadcn Button
2. Map variant props:
   - `primary` → `default`
   - `secondary` → `secondary`
   - `transparent` → `ghost` or `outline`
   - `danger` → `destructive`
3. Map size props:
   - `large` → `lg`
   - `small` → `sm`
   - `medium` → `default`
4. Handle `isLoading` prop (shadcn doesn't have built-in, may need extension)

**Estimated effort:** 2-4 hours

### 3.2 Input Component
**File:** `src/modules/common/components/input/index.tsx`

**Migration:**
1. Replace custom input with shadcn Input
2. Preserve floating label functionality
3. Preserve password visibility toggle
4. Maintain existing props interface
5. Update styling to match current design

**Custom requirements:**
- Floating label animation
- Password visibility toggle
- Error state styling

**Estimated effort:** 4-6 hours

### 3.3 Modal/Dialog Component
**File:** `src/modules/common/components/modal/index.tsx`

**Migration:**
1. Replace `@headlessui/react` Dialog with shadcn Dialog
2. Replace Transition components with Radix animations or CSS transitions
3. Maintain existing API (Title, Description, Body, Footer subcomponents)
4. Preserve backdrop blur effect
5. Maintain size variants (small, medium, large)

**Custom requirements:**
- Compound component pattern (Modal.Title, Modal.Body, etc.)
- Custom backdrop blur
- Size variants
- Search mode variant

**Estimated effort:** 6-8 hours

### 3.4 Select Component
**Files:**
- `src/modules/common/components/native-select/index.tsx`
- `src/modules/checkout/components/address-select/index.tsx`
- `src/modules/layout/components/country-select/index.tsx`

**Migration:**
1. Replace native select with shadcn Select
2. Replace HeadlessUI Listbox with shadcn Select or DropdownMenu
3. Maintain address display formatting
4. Preserve custom styling

**Estimated effort:** 6-8 hours

### 3.5 Checkbox Component
**File:** `src/modules/common/components/checkbox/index.tsx`

**Migration:**
1. Replace `@medusajs/ui` Checkbox with shadcn Checkbox
2. Maintain label integration
3. Update styling to match design

**Estimated effort:** 2-3 hours

### 3.6 Radio Component
**File:** `src/modules/common/components/radio/index.tsx`

**Migration:**
1. Replace custom radio with shadcn RadioGroup
2. Maintain existing API
3. Update styling

**Estimated effort:** 3-4 hours

### 3.7 Form Components
**Files:**
- Multiple form components in checkout, account modules

**Migration:**
1. Install and configure `react-hook-form` (if not already)
2. Use shadcn Form component with react-hook-form integration
3. Replace error message handling
4. Update form validation patterns

**Estimated effort:** 8-12 hours

---

## Phase 4: Module-Specific Components

### 4.1 Checkout Module
**Components to migrate:**
- `address-select`
- `country-select`
- `discount-code` (form input)
- `payment-container`
- `submit-button`

**Estimated effort:** 6-8 hours

### 4.2 Account Module
**Components to migrate:**
- `login` form
- `register` form
- `profile-*` forms (email, name, password, phone)
- `address-card` modals

**Estimated effort:** 8-10 hours

### 4.3 Cart Module
**Components to migrate:**
- `cart-item-select` (may use Select)
- Form inputs in cart

**Estimated effort:** 4-6 hours

### 4.4 Layout Module
**Components to migrate:**
- `side-menu` (may use Sheet component)
- `cart-dropdown` (may use DropdownMenu or Popover)

**Estimated effort:** 6-8 hours

### 4.5 Product Module
**Components to migrate:**
- `product-actions` (quantity selectors, variants)
- `product-tabs` (may use Tabs component)

**Estimated effort:** 6-8 hours

---

## Phase 5: Advanced Components

### 5.1 Install Additional shadcn/ui Components
Based on needs, install:
- `sheet` - For mobile menus
- `tabs` - For product tabs
- `accordion` - For expandable content
- `popover` - For dropdowns
- `toast` - For notifications
- `tooltip` - For help text
- `skeleton` - For loading states (may already have custom)
- `card` - For product cards
- `badge` - For labels/tags

### 5.2 Custom Component Extensions
Create wrapper components or extend shadcn components for:
- Custom color schemes
- Brand-specific variants
- Complex interactions specific to e-commerce

---

## Phase 6: Styling & Theme Consolidation

### 6.1 Color System Migration
- Map all existing `grey-*` colors to shadcn's neutral/grayscale
- Ensure dark mode compatibility
- Update all component color references

### 6.2 Typography
- Preserve existing typography utility classes
- Ensure consistency across components
- Update component typography to use Tailwind utilities

### 6.3 Animation & Transitions
- Replace HeadlessUI Transition with CSS transitions or Radix animations
- Preserve existing custom animations
- Ensure performance is maintained

---

## Phase 7: Testing & Quality Assurance

### 7.1 Visual Regression Testing
- Compare before/after screenshots
- Test all interactive states
- Verify animations and transitions

### 7.2 Functional Testing
- Test all form submissions
- Test all modals and dialogs
- Test dropdown interactions
- Test accessibility (keyboard navigation, screen readers)

### 7.3 E2E Testing
- Run existing Playwright tests
- Update test selectors if component structure changes
- Verify checkout flow
- Verify account management flows

### 7.4 Performance Testing
- Compare bundle sizes
- Measure runtime performance
- Verify no regressions in Core Web Vitals

---

## Phase 8: Cleanup & Documentation

### 8.1 Remove Unused Dependencies
- Remove `@medusajs/ui` if completely migrated
- Remove `@headlessui/react` if completely migrated
- Remove `@medusajs/ui-preset`
- Remove `tailwindcss-radix` (shadcn uses Radix directly)

### 8.2 Update Documentation
- Update component documentation
- Create migration guide for future changes
- Document custom component patterns

### 8.3 Code Review
- Review all component implementations
- Ensure consistency across modules
- Optimize component reusability

---

## Migration Strategy

### Incremental Migration Approach

1. **Parallel Implementation**: Keep old components working while building new ones
2. **Feature Flag**: Use feature flags to toggle between old/new components
3. **Module-by-Module**: Migrate one module at a time for easier rollback
4. **Bottom-Up**: Start with leaf components, work up to complex compositions

### Rollback Plan

- Keep old components in a `legacy` folder
- Maintain feature flags for quick rollback
- Create migration checklist to track progress
- Version control allows easy reversion

---

## Estimated Timeline

| Phase | Estimated Time | Dependencies |
|-------|---------------|--------------|
| Phase 1: Setup | 4-6 hours | None |
| Phase 2: Core Components | 8-12 hours | Phase 1 |
| Phase 3: Component Migration | 30-40 hours | Phase 2 |
| Phase 4: Module Components | 30-40 hours | Phase 3 |
| Phase 5: Advanced Components | 12-16 hours | Phase 4 |
| Phase 6: Styling | 8-12 hours | Phase 3-5 |
| Phase 7: Testing | 16-20 hours | Phase 6 |
| Phase 8: Cleanup | 4-8 hours | Phase 7 |
| **Total** | **112-154 hours** | |

*Note: This is for a single developer. With a team, phases can be parallelized.*

---

## Risk Assessment

### High Risk
- **Breaking existing functionality**: Mitigate with thorough testing
- **Visual inconsistencies**: Mitigate with design review
- **Accessibility regressions**: Mitigate with accessibility testing

### Medium Risk
- **Performance degradation**: Monitor bundle size and runtime performance
- **Third-party integration issues**: Test Stripe, PayPal integrations thoroughly

### Low Risk
- **Bundle size increase**: shadcn/ui is tree-shakeable
- **TypeScript errors**: shadcn/ui has excellent TypeScript support

---

## Success Criteria

✅ All components migrated to shadcn/ui  
✅ Visual design matches original  
✅ All functionality preserved  
✅ Accessibility maintained or improved  
✅ Bundle size equal or smaller  
✅ All tests passing  
✅ Performance metrics maintained  
✅ No TypeScript errors  
✅ Documentation updated  

---

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com/)

---

## Notes

- Consider keeping `@medusajs/icons` for icons if they're being used
- May need to install `@radix-ui/react-icons` as alternative
- Review shadcn/ui component customization capabilities
- Consider creating a design system documentation site during migration
- Plan for future component additions as storefront evolves

