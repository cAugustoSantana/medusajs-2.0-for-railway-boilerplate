# How to View Product API Data

## Method 1: Server Console (Already Added)
When you visit a product page, the product data will be logged in your Next.js dev server terminal. Look for:
```
=== PRODUCT API DATA ===
{...product data...}
=======================
```

## Method 2: Browser Network Tab
1. Open your browser DevTools (F12)
2. Go to the **Network** tab
3. Filter by "Fetch/XHR" or search for "products"
4. Visit a product page (e.g., `/us/products/some-product-handle`)
5. Find the request to `/store/products` or similar
6. Click on it and view the **Response** tab to see the JSON data

## Method 3: Direct API Call

### Using curl:
```bash
curl -X GET "http://localhost:9000/store/products?handle=YOUR_PRODUCT_HANDLE&region_id=YOUR_REGION_ID" \
  -H "x-publishable-api-key: YOUR_PUBLISHABLE_KEY"
```

### Using browser:
Navigate directly to:
```
http://localhost:9000/store/products?handle=YOUR_PRODUCT_HANDLE&region_id=YOUR_REGION_ID
```
(Add the `x-publishable-api-key` header if needed)

### Using JavaScript fetch:
```javascript
fetch('http://localhost:9000/store/products?handle=YOUR_PRODUCT_HANDLE&region_id=YOUR_REGION_ID', {
  headers: {
    'x-publishable-api-key': 'YOUR_PUBLISHABLE_KEY'
  }
})
.then(res => res.json())
.then(data => console.log(data))
```

## Method 4: Add Temporary Debug Component

You can also add a temporary debug section to the product page to see the data in the browser:

```tsx
// Add this temporarily to the product page
{process.env.NODE_ENV === "development" && (
  <details className="mt-4 p-4 bg-gray-100">
    <summary className="cursor-pointer font-bold">Debug: Product API Data</summary>
    <pre className="mt-2 text-xs overflow-auto">
      {JSON.stringify(pricedProduct, null, 2)}
    </pre>
  </details>
)}
```

## Finding Your Region ID

To get the region ID, you can:
1. Check your Medusa admin panel
2. Call the regions API: `http://localhost:9000/store/regions`
3. Check the server console when the page loads (region data is also logged)

## API Endpoint Details

The product API endpoint is:
- **URL**: `/store/products`
- **Method**: GET
- **Query Parameters**:
  - `handle`: Product handle (slug)
  - `region_id`: Region ID
  - `fields`: Fields to include (e.g., `*variants.calculated_price,+variants.inventory_quantity`)
- **Headers**:
  - `x-publishable-api-key`: Your publishable API key

## Example Response Structure

The API returns a product object with:
- `id`: Product ID
- `title`: Product title
- `handle`: Product handle/slug
- `description`: Product description
- `thumbnail`: Product thumbnail URL
- `images`: Array of product images
- `variants`: Array of product variants with pricing
- `options`: Product options
- `tags`: Product tags
- `collection_id`: Collection ID
- And more...

