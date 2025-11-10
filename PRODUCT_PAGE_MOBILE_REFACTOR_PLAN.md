# Product Page Mobile View Refactor Plan

## Current State Analysis

### Current Layout Structure
- **Desktop**: 3-column layout (Info/Tabs | Images | Actions)
- **Mobile**: Stacked vertically with fixed bottom action bar
- **Breakpoint**: Uses `small:` prefix (576px+) for responsive changes

### Current Issues
1. **Layout Order**: On mobile, info appears before images (not optimal UX)
2. **Fixed Bottom Bar**: Mobile actions bar can be intrusive and covers content
3. **Image Gallery**: Limited mobile optimization (no swipe gestures, no thumbnails)
4. **Product Info**: Takes up too much vertical space on mobile
5. **Product Tabs**: Accordion works but could be more mobile-friendly
6. **Sticky Elements**: Desktop sticky behavior doesn't work well on mobile
7. **Spacing**: Padding and gaps may be too large for mobile screens

---

## Refactor Goals

1. **Optimize Mobile Layout Order**: Images → Key Info → Actions → Details
2. **Improve Mobile Image Experience**: Add swipe gestures, thumbnails, zoom
3. **Better Mobile Actions**: Sticky header instead of bottom bar, or improved bottom sheet
4. **Reduce Vertical Scrolling**: More compact mobile layout
5. **Touch-Friendly Interactions**: Larger tap targets, better spacing
6. **Performance**: Optimize images and lazy loading for mobile

---

## Proposed Mobile Layout Structure

### Mobile View (Default, < 576px)
```
┌─────────────────────────┐
│   Image Gallery         │
│   (Swipeable, Full-width)│
│   [Thumbnails below]    │
├─────────────────────────┤
│   Product Title         │
│   Price                 │
│   Collection Badge      │
├─────────────────────────┤
│   Variant Selector      │
│   [Sticky Header]       │
├─────────────────────────┤
│   Add to Cart Button    │
│   [Sticky/Fixed]        │
├─────────────────────────┤
│   Description           │
│   (Collapsible)         │
├─────────────────────────┤
│   Product Info Tabs     │
│   (Accordion)           │
├─────────────────────────┤
│   Related Products      │
└─────────────────────────┘
```

### Desktop View (≥ 576px)
```
┌──────────┬──────────────┬──────────┐
│ Info     │              │ Actions │
│ & Tabs   │   Images     │ & Price │
│ (Sticky) │   (Center)   │ (Sticky)│
└──────────┴──────────────┴──────────┘
```

---

## Implementation Plan

### Phase 1: Layout Restructuring

#### 1.1 Create Mobile-Specific Layout Component
**File**: `storefront/src/modules/products/templates/mobile-layout.tsx`
- New component that handles mobile-specific layout
- Reorders components: Images → Info → Actions → Tabs
- Uses conditional rendering based on screen size

**Changes**:
```tsx
// Mobile-first approach
<div className="flex flex-col lg:hidden">
  <ImageGallery images={images} />
  <ProductInfoMobile product={product} />
  <ProductActionsMobile product={product} />
  <ProductTabsMobile product={product} />
</div>

// Desktop layout (existing)
<div className="hidden lg:flex">
  {/* Existing 3-column layout */}
</div>
```

#### 1.2 Update Main Template
**File**: `storefront/src/modules/products/templates/index.tsx`
- Add mobile/desktop layout switching
- Use CSS-based approach or component-based approach
- Maintain backward compatibility

---

### Phase 2: Image Gallery Mobile Enhancement

#### 2.1 Add Swipe Gestures
**File**: `storefront/src/modules/products/components/image-gallery/mobile-gallery.tsx`
- New mobile-specific gallery component
- Implement swipe gestures (use `react-swipeable` or similar)
- Add image indicators (dots)
- Full-screen image view on tap

**Features**:
- Swipe left/right to navigate images
- Pinch to zoom
- Tap to view fullscreen
- Image counter (1/5)
- Thumbnail strip at bottom (optional)

#### 2.2 Optimize Image Loading
- Lazy load images below the fold
- Use Next.js Image optimization
- Implement progressive loading
- Add blur placeholders

---

### Phase 3: Mobile Actions Refactor

#### 3.1 Replace Fixed Bottom Bar
**Option A: Sticky Header Approach**
- Move actions to top (below images)
- Sticky on scroll down
- More natural mobile pattern

**Option B: Improved Bottom Sheet**
- Better bottom sheet implementation
- Slide up from bottom
- Better backdrop handling
- Smoother animations

**File**: `storefront/src/modules/products/components/product-actions/mobile-actions-v2.tsx`

#### 3.2 Mobile Actions Layout
```
┌─────────────────────────┐
│ Variant Selector       │
│ [Dropdown/Modal]       │
├─────────────────────────┤
│ Price (Large)          │
├─────────────────────────┤
│ Add to Cart (Full-width)│
│ [Primary CTA]          │
└─────────────────────────┘
```

---

### Phase 4: Product Info Mobile Optimization

#### 4.1 Compact Product Info
**File**: `storefront/src/modules/products/templates/product-info/mobile-info.tsx`
- Reduce vertical spacing
- Make title and price more prominent
- Collapsible description
- Collection badge as chip

**Changes**:
- Smaller font sizes for mobile
- Reduced padding/margins
- Inline price with title
- "Read more" for long descriptions

#### 4.2 Mobile Product Tabs
- Keep accordion pattern (works well)
- Reduce padding
- Better touch targets
- Consider tabs instead of accordion (horizontal scroll)

---

### Phase 5: Performance Optimizations

#### 5.1 Image Optimization
- Implement responsive image sizes
- Use WebP format
- Lazy load below fold
- Preload first image

#### 5.2 Code Splitting
- Lazy load RelatedProducts
- Code split mobile components
- Reduce initial bundle size

#### 5.3 Intersection Observer
- Use for lazy loading
- Trigger animations on scroll
- Optimize re-renders

---

## File Structure Changes

### New Files to Create
```
storefront/src/modules/products/
├── templates/
│   ├── mobile-layout.tsx          # Mobile-specific layout
│   └── desktop-layout.tsx         # Desktop-specific layout (extracted)
├── components/
│   ├── image-gallery/
│   │   ├── mobile-gallery.tsx     # Mobile gallery with swipe
│   │   └── desktop-gallery.tsx    # Desktop gallery (existing)
│   ├── product-actions/
│   │   ├── mobile-actions-v2.tsx  # New mobile actions
│   │   └── mobile-header.tsx      # Sticky header variant
│   └── product-info/
│       └── mobile-info.tsx        # Compact mobile info
└── hooks/
    ├── use-mobile-gallery.ts      # Swipe gesture hook
    └── use-sticky-header.ts       # Sticky header logic
```

### Files to Modify
```
storefront/src/modules/products/
├── templates/
│   └── index.tsx                  # Add layout switching
├── components/
│   ├── image-gallery/
│   │   └── index.tsx              # Add mobile variant
│   └── product-actions/
│       ├── index.tsx              # Refactor mobile actions
│       └── mobile-actions.tsx      # Update or replace
```

---

## Implementation Steps

### Step 1: Setup Mobile Layout Structure (2-3 hours)
1. Create `mobile-layout.tsx` component
2. Reorder components for mobile
3. Add responsive breakpoints
4. Test layout on mobile devices

### Step 2: Enhance Image Gallery (4-5 hours)
1. Install swipe library (or implement custom)
2. Create `mobile-gallery.tsx`
3. Add swipe gestures
4. Add image indicators
5. Implement fullscreen view
6. Add thumbnail strip (optional)

### Step 3: Refactor Mobile Actions (3-4 hours)
1. Create new mobile actions component
2. Implement sticky header or improved bottom sheet
3. Update variant selector UI
4. Improve button layout
5. Test interactions

### Step 4: Optimize Product Info (2-3 hours)
1. Create compact mobile info component
2. Add collapsible description
3. Optimize typography
4. Reduce spacing

### Step 5: Performance & Polish (2-3 hours)
1. Optimize images
2. Add lazy loading
3. Code splitting
4. Test performance
5. Fix any bugs

### Step 6: Testing & Refinement (2-3 hours)
1. Test on real devices
2. Test different screen sizes
3. Test touch interactions
4. Fix accessibility issues
5. Performance testing

**Total Estimated Time**: 15-21 hours

---

## Technical Considerations

### Breakpoints
- **Mobile**: < 576px (default, no prefix)
- **Small**: ≥ 576px (`small:`)
- **Medium**: ≥ 768px (`medium:`)
- **Large**: ≥ 992px (`lg:`)

### Libraries to Consider
- **Swipe Gestures**: `react-swipeable`, `swiper`, or custom hook
- **Bottom Sheet**: `@headlessui/react` (already used) or `vaul`
- **Image Zoom**: `react-medium-image-zoom` or custom
- **Animations**: Framer Motion (if not already used)

### Accessibility
- Ensure touch targets are ≥ 44x44px
- Proper ARIA labels for swipe gestures
- Keyboard navigation support
- Screen reader compatibility

### Performance Metrics
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

---

## Testing Checklist

### Functional Testing
- [ ] Images swipe correctly
- [ ] Variant selection works
- [ ] Add to cart works
- [ ] Sticky header/actions work
- [ ] Tabs/accordion work
- [ ] Related products load

### Responsive Testing
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13 (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] iPad Mini (768px)
- [ ] Desktop (1024px+)

### Performance Testing
- [ ] Lighthouse score > 90
- [ ] Images load progressively
- [ ] No layout shifts
- [ ] Smooth scrolling
- [ ] Fast interactions

### Accessibility Testing
- [ ] Screen reader compatible
- [ ] Keyboard navigation works
- [ ] Touch targets adequate
- [ ] Color contrast sufficient

---

## Migration Strategy

### Option 1: Gradual Migration
1. Create new mobile components alongside existing
2. Use feature flag to switch between old/new
3. Test thoroughly
4. Switch to new version
5. Remove old code

### Option 2: Direct Replacement
1. Implement new components
2. Replace in template
3. Test and fix issues
4. Deploy

**Recommendation**: Option 1 (Gradual Migration) for safer rollout

---

## Success Criteria

1. ✅ Mobile layout is optimized for small screens
2. ✅ Images are swipeable and zoomable
3. ✅ Actions are easily accessible
4. ✅ Page loads fast on mobile
5. ✅ Smooth scrolling and interactions
6. ✅ Better conversion rate on mobile
7. ✅ Improved user experience metrics

---

## Future Enhancements (Post-Refactor)

1. **AR/3D Product View**: For applicable products
2. **Video Support**: Product videos in gallery
3. **360° View**: Rotating product images
4. **Size Guide**: Interactive size selector
5. **Reviews Section**: Mobile-optimized reviews
6. **Social Sharing**: Easy share buttons
7. **Wishlist**: Quick add to wishlist
8. **Quick View**: Modal product view from listings

---

## Notes

- Maintain backward compatibility during migration
- Keep desktop experience unchanged
- Test on real devices, not just browser dev tools
- Consider user feedback during development
- Document any breaking changes
- Update tests for new components

