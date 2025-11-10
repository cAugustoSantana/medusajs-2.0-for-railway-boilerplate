# Product API Data Structure Reference

Based on the API response you shared, here's how to access the product data in your code:

## Top-Level Product Fields

```typescript
// Basic product info
product.id                    // "prod_01K9J2ARJ1Z51CRB2NTJV1EJWT"
product.title                 // "Test"
product.subtitle              // ""
product.description           // ""
product.handle                // "test"
product.thumbnail            // null or image URL
product.is_giftcard          // false
product.discountable         // true

// Physical attributes
product.weight               // null or number
product.length               // null or number
product.height               // null or number
product.width                // null or number
product.material             // null or string
product.origin_country        // null or string
product.hs_code              // null or string
product.mid_code             // null or string

// Relationships
product.collection_id        // "pcol_01K8X841KCP19F0JK0ZNB4JY5E"
product.type_id              // null or string

// Arrays
product.images               // [] - array of image objects
product.options              // [] - array of option objects
product.variants             // [] - array of variant objects
product.tags                 // [] - array of tag objects

// Timestamps
product.created_at           // "2025-11-08T15:46:02.947Z"
product.updated_at           // "2025-11-08T15:46:02.947Z"
```

## Collection Object

```typescript
product.collection.id         // "pcol_01K8X841KCP19F0JK0ZNB4JY5E"
product.collection.title      // "Cobain"
product.collection.handle     // "cobain"
product.collection.metadata   // null or object
product.collection.created_at // "2025-10-31T13:43:11.209Z"
product.collection.updated_at // "2025-10-31T13:43:11.209Z"
product.collection.deleted_at // null or date
```

## Options Array

```typescript
product.options[0].id          // "opt_01K9J2ARJ2FYY7EBQ1BXVVRS9D"
product.options[0].title       // "Default option"
product.options[0].product_id  // "prod_01K9J2ARJ1Z51CRB2NTJV1EJWT"
product.options[0].values      // Array of option values

// Option Values
product.options[0].values[0].id        // "optval_01K9J2ARJ1YG1RF36XVHN86VGS"
product.options[0].values[0].value    // "Default option value"
product.options[0].values[0].option_id // "opt_01K9J2ARJ2FYY7EBQ1BXVVRS9D"
```

## Variants Array (Most Important for Pricing)

```typescript
// Basic variant info
product.variants[0].id                // "variant_01K9J2ARM3GDGPDFJ2TTCTAHJ2"
product.variants[0].title             // "Default variant"
product.variants[0].sku               // "cbn-666"
product.variants[0].barcode           // null or string
product.variants[0].ean               // null or string
product.variants[0].upc               // null or string
product.variants[0].allow_backorder   // false
product.variants[0].manage_inventory  // true
product.variants[0].variant_rank      // 0
product.variants[0].product_id        // "prod_01K9J2ARJ1Z51CRB2NTJV1EJWT"
product.variants[0].inventory_quantity // 0

// Variant options (which option values this variant uses)
product.variants[0].options[0].id     // "optval_01K9J2ARJ1YG1RF36XVHN86VGS"
product.variants[0].options[0].value // "Default option value"
```

## Pricing Information (calculated_price)

This is the most important field for displaying prices:

```typescript
// Calculated price object
product.variants[0].calculated_price.id                              // "pset_01K9J2ARNXE1H3AV7VFVY6PCB8"
product.variants[0].calculated_price.currency_code                 // "usd"
product.variants[0].calculated_price.calculated_amount                // 40
product.variants[0].calculated_price.original_amount                  // 40
product.variants[0].calculated_price.is_calculated_price_price_list   // true
product.variants[0].calculated_price.is_calculated_price_tax_inclusive // false

// Raw amounts (for precise calculations)
product.variants[0].calculated_price.raw_calculated_amount.value      // "40"
product.variants[0].calculated_price.raw_calculated_amount.precision // 20
product.variants[0].calculated_price.raw_original_amount.value      // "40"
product.variants[0].calculated_price.raw_original_amount.precision   // 20

// Price details
product.variants[0].calculated_price.calculated_price.id              // "price_01K9J38KWZ08VF1SE4E1C3W064"
product.variants[0].calculated_price.calculated_price.price_list_id  // "plist_01K9J38KX1EMAYHCRN7XDPETPJ"
product.variants[0].calculated_price.calculated_price.price_list_type // "override"
```

## How It's Used in the Codebase

### 1. Product Info Component
```typescript
// storefront/src/modules/products/templates/product-info/index.tsx
product.collection.title    // Displayed as collection link
product.title               // Main product title
product.description         // Product description
```

### 2. Product Tabs Component
```typescript
// storefront/src/modules/products/components/product-tabs/index.tsx
product.material            // Material info
product.origin_country      // Country of origin
product.type?.value         // Product type
product.weight              // Weight in grams
product.length             // Dimensions
product.width
product.height
```

### 3. Image Gallery
```typescript
// storefront/src/modules/products/templates/index.tsx
product.images              // Array passed to ImageGallery
product.thumbnail           // Used for thumbnails/previews
```

### 4. Pricing
```typescript
// storefront/src/lib/util/get-product-price.ts
// This utility extracts pricing from variants
product.variants[].calculated_price.calculated_amount
product.variants[].calculated_price.currency_code
```

### 5. Product Actions (Add to Cart)
```typescript
// storefront/src/modules/products/components/product-actions/index.tsx
product.variants[].id       // Used for adding to cart
product.variants[].inventory_quantity // Check stock
```

## Example: Accessing Price in Your Code

```typescript
// Get the first variant's price
const variant = product.variants[0]
const price = variant.calculated_price.calculated_amount  // 40
const currency = variant.calculated_price.currency_code   // "usd"

// Format as currency
const formattedPrice = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: currency.toUpperCase()
}).format(price / 100)  // "$0.40" (if price is in cents) or "$40.00" (if in dollars)

// Check inventory
const inStock = variant.inventory_quantity > 0  // false (0 inventory)
```

## Example: Accessing All Variants with Prices

```typescript
product.variants.map(variant => ({
  id: variant.id,
  title: variant.title,
  sku: variant.sku,
  price: variant.calculated_price.calculated_amount,
  currency: variant.calculated_price.currency_code,
  inStock: variant.inventory_quantity > 0,
  options: variant.options.map(opt => opt.value)
}))
```

## Notes

- **Price amounts**: The `calculated_amount` and `original_amount` values depend on your currency configuration. They might be in cents (divide by 100) or in the base unit.
- **Inventory**: `inventory_quantity` of 0 means out of stock if `manage_inventory` is true.
- **Images**: Empty array means no images are set. Check `thumbnail` as fallback.
- **Options/Variants**: Products can have multiple options (size, color, etc.) and variants (combinations of those options).

