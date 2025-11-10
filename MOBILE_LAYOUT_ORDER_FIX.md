# Mobile Layout Order Fix - Detailed Breakdown

## Problem Statement

**Current Issue**: On mobile devices, the product page displays in this order:
1. Product Info (title, description, collection)
2. Product Tabs
3. Image Gallery
4. Product Actions (add to cart)

**Desired Order**: 
1. Image Gallery (first - most important for product discovery)
2. Product Info (title, price, collection)
3. Product Actions (variant selector, add to cart)
4. Product Tabs (details, shipping info)

---

## Current Code Analysis

### Current Structure (`templates/index.tsx`)

```tsx
<div className="flex flex-col small:flex-row">
  {/* Column 1: Info & Tabs (appears first on mobile) */}
  <div className="flex flex-col small:sticky small:top-48 small:max-w-[300px]">
    <ProductInfo product={product} />
    <ProductTabs product={product} />
  </div>
  
  {/* Column 2: Images (appears second on mobile) */}
  <div className="block w-full relative">
    <ImageGallery images={product?.images || []} />
  </div>
  
  {/* Column 3: Actions (appears third on mobile) */}
  <div className="flex flex-col small:sticky small:top-48 small:max-w-[300px]">
    <ProductOnboardingCta />
    <ProductActionsWrapper />
  </div>
</div>
```

**Problem**: The flexbox order follows DOM order on mobile, so Info appears before Images.

---

## Solution Approaches

### Approach 1: CSS Order Property (Simplest - Recommended)

**Pros**: 
- Minimal code changes
- No component duplication
- Maintains single source of truth

**Cons**: 
- Requires careful CSS management
- Can be confusing for developers

**Implementation**:

```tsx
<div className="flex flex-col small:flex-row">
  {/* Column 1: Info & Tabs - Order 2 on mobile, Order 1 on desktop */}
  <div className="order-2 small:order-1 flex flex-col small:sticky small:top-48 small:max-w-[300px]">
    <ProductInfo product={product} />
    <ProductTabs product={product} />
  </div>
  
  {/* Column 2: Images - Order 1 on mobile, Order 2 on desktop */}
  <div className="order-1 small:order-2 block w-full relative">
    <ImageGallery images={product?.images || []} />
  </div>
  
  {/* Column 3: Actions - Order 3 on mobile, Order 3 on desktop */}
  <div className="order-3 flex flex-col small:sticky small:top-48 small:max-w-[300px]">
    <ProductOnboardingCta />
    <ProductActionsWrapper />
  </div>
</div>
```

**Breakdown**:
- `order-1` = First on mobile (Images)
- `order-2` = Second on mobile (Info)
- `order-3` = Third on mobile (Actions)
- `small:order-1`, `small:order-2`, `small:order-3` = Desktop order (Info, Images, Actions)

---

### Approach 2: Conditional Rendering (More Explicit)

**Pros**: 
- Very clear intent
- Easy to understand
- Can have different mobile/desktop components

**Cons**: 
- Code duplication
- More maintenance
- Larger bundle size

**Implementation**:

```tsx
{/* Mobile Layout */}
<div className="flex flex-col small:hidden">
  <ImageGallery images={product?.images || []} />
  <ProductInfo product={product} />
  <ProductActionsWrapper id={product.id} region={region} />
  <ProductTabs product={product} />
</div>

{/* Desktop Layout */}
<div className="hidden small:flex flex-row small:items-start">
  <div className="flex flex-col small:sticky small:top-48 small:max-w-[300px]">
    <ProductInfo product={product} />
    <ProductTabs product={product} />
  </div>
  <div className="block w-full relative">
    <ImageGallery images={product?.images || []} />
  </div>
  <div className="flex flex-col small:sticky small:top-48 small:max-w-[300px]">
    <ProductOnboardingCta />
    <ProductActionsWrapper id={product.id} region={region} />
  </div>
</div>
```

---

### Approach 3: Separate Mobile Component (Most Flexible)

**Pros**: 
- Complete control over mobile layout
- Can optimize mobile-specific components
- Easier to maintain mobile-specific features

**Cons**: 
- Most code duplication
- More files to maintain
- Requires careful synchronization

**Implementation**:

Create `mobile-layout.tsx`:
```tsx
// storefront/src/modules/products/templates/mobile-layout.tsx
export default function MobileLayout({ product, region, countryCode }) {
  return (
    <div className="flex flex-col small:hidden">
      <ImageGallery images={product?.images || []} />
      <ProductInfo product={product} />
      <ProductActionsWrapper id={product.id} region={region} />
      <ProductTabs product={product} />
      <RelatedProducts product={product} countryCode={countryCode} />
    </div>
  )
}
```

Update `index.tsx`:
```tsx
import MobileLayout from "./mobile-layout"
import DesktopLayout from "./desktop-layout"

export default function ProductTemplate({ product, region, countryCode }) {
  return (
    <>
      <MobileLayout product={product} region={region} countryCode={countryCode} />
      <DesktopLayout product={product} region={region} countryCode={countryCode} />
    </>
  )
}
```

---

## Recommended Solution: Approach 1 (CSS Order)

### Step-by-Step Implementation

#### Step 1: Update Main Template File

**File**: `storefront/src/modules/products/templates/index.tsx`

**Current Code** (lines 31-56):
```tsx
<div
  className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
  data-testid="product-container"
>
  <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
    <ProductInfo product={product} />
    <ProductTabs product={product} />
  </div>
  <div className="block w-full relative">
    <ImageGallery images={product?.images || []} />
  </div>
  <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
    <ProductOnboardingCta />
    <Suspense fallback={...}>
      <ProductActionsWrapper id={product.id} region={region} />
    </Suspense>
  </div>
</div>
```

**New Code**:
```tsx
<div
  className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
  data-testid="product-container"
>
  {/* Column 1: Info & Tabs - Order 2 on mobile, Order 1 on desktop */}
  <div className="order-2 small:order-1 flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
    <ProductInfo product={product} />
    <ProductTabs product={product} />
  </div>
  
  {/* Column 2: Images - Order 1 on mobile, Order 2 on desktop */}
  <div className="order-1 small:order-2 block w-full relative">
    <ImageGallery images={product?.images || []} />
  </div>
  
  {/* Column 3: Actions - Order 3 on mobile, Order 3 on desktop */}
  <div className="order-3 flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
    <ProductOnboardingCta />
    <Suspense
      fallback={
        <ProductActions
          disabled={true}
          product={product}
          region={region}
        />
      }
    >
      <ProductActionsWrapper id={product.id} region={region} />
    </Suspense>
  </div>
</div>
```

**Key Changes**:
1. Added `order-1 small:order-2` to ImageGallery container (first on mobile, second on desktop)
2. Added `order-2 small:order-1` to Info/Tabs container (second on mobile, first on desktop)
3. Added `order-3` to Actions container (third on both, but desktop uses natural order)

---

#### Step 2: Verify Breakpoints

**Current Breakpoint**: `small:` = 576px+

**Mobile**: < 576px (uses `order-1`, `order-2`, `order-3`)
**Desktop**: ≥ 576px (uses `small:order-1`, `small:order-2`, `small:order-3`)

**Result**:
- **Mobile**: Images (1) → Info (2) → Actions (3)
- **Desktop**: Info (1) → Images (2) → Actions (3)

---

#### Step 3: Test the Changes

**Testing Checklist**:
- [ ] Mobile view (< 576px): Images appear first
- [ ] Mobile view: Info appears second
- [ ] Mobile view: Actions appear third
- [ ] Desktop view (≥ 576px): Original 3-column layout maintained
- [ ] Desktop view: Sticky positioning still works
- [ ] No layout shifts or visual glitches
- [ ] All interactive elements still work

---

## Alternative: More Granular Mobile Order

If you want even more control, you can separate ProductInfo and ProductTabs:

```tsx
<div className="flex flex-col small:flex-row">
  {/* Images - First on mobile */}
  <div className="order-1 small:order-2 block w-full relative">
    <ImageGallery images={product?.images || []} />
  </div>
  
  {/* Product Info - Second on mobile */}
  <div className="order-2 small:order-1 flex flex-col small:sticky small:top-48 small:max-w-[300px]">
    <ProductInfo product={product} />
  </div>
  
  {/* Actions - Third on mobile */}
  <div className="order-3 flex flex-col small:sticky small:top-48 small:max-w-[300px]">
    <ProductActionsWrapper />
  </div>
  
  {/* Tabs - Fourth on mobile (below everything) */}
  <div className="order-4 small:order-1 w-full small:max-w-[300px]">
    <ProductTabs product={product} />
  </div>
</div>
```

**Note**: This requires moving ProductTabs out of the first column on desktop, which might need additional styling.

---

## Implementation Time Estimate

- **Approach 1 (CSS Order)**: 15-30 minutes
  - Update template file
  - Test on mobile/desktop
  - Fix any styling issues

- **Approach 2 (Conditional Rendering)**: 1-2 hours
  - Duplicate layout code
  - Test both layouts
  - Ensure consistency

- **Approach 3 (Separate Component)**: 2-3 hours
  - Create new component files
  - Extract desktop layout
  - Test thoroughly
  - Maintain both versions

---

## Recommended Next Steps

1. **Start with Approach 1** (CSS Order) - Quickest fix
2. **Test thoroughly** on real mobile devices
3. **If issues arise**, consider Approach 2 or 3
4. **Document the change** for future developers

---

## Code Example: Complete Fix

Here's the complete updated `templates/index.tsx` with the fix:

```tsx
import React, { Suspense } from "react"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
        data-testid="product-container"
      >
        {/* Column 1: Info & Tabs - Order 2 on mobile, Order 1 on desktop */}
        <div className="order-2 small:order-1 flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div>
        
        {/* Column 2: Images - Order 1 on mobile, Order 2 on desktop */}
        <div className="order-1 small:order-2 block w-full relative">
          <ImageGallery images={product?.images || []} />
        </div>
        
        {/* Column 3: Actions - Order 3 on mobile, Order 3 on desktop */}
        <div className="order-3 flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
```

---

## Testing Instructions

### 1. Visual Testing
- Open browser DevTools
- Set viewport to mobile (375px width)
- Verify: Images appear at the top
- Verify: Info appears below images
- Verify: Actions appear below info

### 2. Responsive Testing
- Test at 575px (should show mobile order)
- Test at 576px (should show desktop 3-column layout)
- Test at 768px, 1024px (desktop layout)

### 3. Functional Testing
- All buttons still work
- Sticky positioning works on desktop
- No console errors
- Images load correctly

### 4. Real Device Testing
- Test on actual iPhone/Android
- Check touch interactions
- Verify scrolling behavior

---

## Potential Issues & Solutions

### Issue 1: Sticky Positioning on Mobile
**Problem**: Sticky elements might not work as expected on mobile
**Solution**: The `small:sticky` classes only apply on desktop, so mobile won't have sticky behavior (which is correct)

### Issue 2: Flexbox Order Conflicts
**Problem**: If other CSS uses order, conflicts might occur
**Solution**: Use more specific order values or add `!important` if needed (not recommended)

### Issue 3: Visual Gaps
**Problem**: Order change might create visual gaps
**Solution**: Ensure padding/margin is consistent across all order states

---

## Success Criteria

✅ Images appear first on mobile (< 576px)
✅ Info appears second on mobile
✅ Actions appear third on mobile
✅ Desktop layout unchanged (≥ 576px)
✅ No visual regressions
✅ All functionality works
✅ Performance unchanged

