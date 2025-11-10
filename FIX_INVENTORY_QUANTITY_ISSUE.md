# Fix: Inventory Quantity Returning 0

## Problem
The `inventory_quantity` field is returning `0` in the store API even though there's stock showing in the Medusa admin.

## Root Cause
In Medusa 2.0, inventory is **location-based and scoped by sales channel**. The inventory quantity shown in the store API depends on:
1. Inventory existing at a stock location
2. That stock location being **linked to the sales channel**
3. The publishable API key having that sales channel in its scope

## Solution Steps

### Step 1: Verify Stock Location is Linked to Sales Channel

The stock location must be linked to the sales channel that your storefront uses. Check this in the Medusa Admin:

1. Go to **Settings → Locations & Shipping**
2. Find your stock location (e.g., "European Warehouse")
3. Click on the location to view its details
4. In the location details page, look for the **Sales Channels** section
5. Check if your sales channel (e.g., "Default Sales Channel") is listed
6. If not linked, you can link them:
   - In the location details page, there should be an option to manage sales channels
   - Add your sales channel to the location

### Step 2: Verify Publishable API Key Scope

1. Go to **Settings → Publishable API Keys**
2. Find the API key you're using in your storefront (`NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`)
3. Check which sales channels are in its scope
4. Make sure the sales channel linked to your stock location is included

### Step 3: Verify Inventory is at the Correct Location

1. Go to **Products → [Your Product] → Variants**
2. Click on the variant
3. Check the **Inventory** section
4. Verify that:
   - Inventory exists at a stock location
   - That stock location is linked to your sales channel

### Step 4: Check via API (Optional)

You can verify the link programmatically. The inventory should show up if:
- Stock location is linked to sales channel
- Publishable API key includes that sales channel

## Quick Fix via Admin API

You can also link a stock location to a sales channel using the Admin API:

```bash
POST /admin/stock-locations/{stock_location_id}/sales-channels
Content-Type: application/json

{
  "add": ["YOUR_SALES_CHANNEL_ID"]
}
```

Or programmatically in a script:

```typescript
import { Modules } from "@medusajs/framework/utils"

// Link stock location to sales channel
await link.create({
  [Modules.SALES_CHANNEL]: {
    sales_channel_id: "YOUR_SALES_CHANNEL_ID",
  },
  [Modules.STOCK_LOCATION]: {
    stock_location_id: "YOUR_STOCK_LOCATION_ID",
  },
})
```

## Verification

After linking:
1. Restart your Medusa backend
2. Clear Next.js cache (if using)
3. Query the product again - `inventory_quantity` should now show the correct value

## Common Issues

1. **Stock location not linked to sales channel**: Most common issue
2. **Publishable API key doesn't include sales channel**: Check API key scope
3. **Inventory at wrong location**: Inventory exists but at a location not linked to sales channel
4. **Cache issues**: Clear Next.js cache and restart backend

## Your Current Setup

Based on your seed script, you should have:
- A stock location: "European Warehouse"
- A sales channel: "Default Sales Channel"
- They should be linked via `linkSalesChannelsToStockLocationWorkflow`

If you created inventory manually in the admin, make sure:
1. The inventory is at a stock location
2. That stock location is linked to your sales channel
3. Your publishable API key includes that sales channel

