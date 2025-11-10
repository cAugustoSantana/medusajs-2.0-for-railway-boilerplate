# Plan to Remove Route Guards and Redirects

## Overview
This plan outlines the steps to remove all route guarding and redirect logic from the Medusa storefront application, making all routes publicly accessible without authentication checks or automatic redirects.

---

## 1. Middleware (`storefront/src/middleware.ts`)

### 1.1 Remove Coming Soon Mode Blocking
**Location:** Lines 113-168
**Action:** Remove the entire `COMING_SOON_MODE` block that redirects users to `/coming-soon` page
- Remove lines 113-116 (COMING_SOON_MODE check)
- Remove lines 133-168 (coming soon redirect logic)
- Remove `isAllowedPath` function (lines 87-104) if only used for coming-soon mode

### 1.2 Remove Home Page Redirect to Coming-Soon
**Location:** Lines 179-183
**Action:** Remove the redirect that sends home page (`/${countryCode}`) to coming-soon
- Remove the conditional check and redirect (lines 179-183)

### 1.3 Simplify Country Code Handling
**Location:** Lines 170-203
**Action:** Keep country code detection but remove redirects
- Keep country code detection logic (lines 170-178)
- Remove redirect logic when country code is missing (lines 194-203)
- Allow requests to proceed without forcing country code in URL

### 1.4 Remove Cart ID Redirect
**Location:** Lines 205-210
**Action:** Remove automatic redirect to checkout address step when cart_id is in params
- Remove cart_id cookie setting and redirect (lines 205-210)

### 1.5 Remove Onboarding Cookie Setting
**Location:** Lines 212-215
**Action:** Remove automatic onboarding cookie setting
- Remove onboarding cookie logic (lines 212-215)

**Result:** Middleware should only handle country code detection for region mapping, without any redirects or blocking.

---

## 2. Home Page (`storefront/src/app/[countryCode]/(main)/page.tsx`)

### 2.1 Remove Coming-Soon Redirect
**Location:** Line 25
**Action:** Remove the redirect and restore the original home page content
- Remove `redirect(\`/${countryCode}/coming-soon\`)` (line 25)
- Uncomment and restore the original home page code (lines 27-56)
- Remove unused `redirect` import if no longer needed

**Result:** Home page displays normally without redirecting to coming-soon.

---

## 3. Account Layout Guard (`storefront/src/app/[countryCode]/(main)/account/layout.tsx`)

### 3.1 Remove Conditional Authentication Check
**Location:** Lines 11, 15
**Action:** Remove customer check and always show dashboard (or remove conditional rendering)
- Remove `getCustomer()` call or make it optional
- Remove conditional rendering `{customer ? dashboard : login}`
- Decide: Always show dashboard, always show login, or show both

**Result:** Account pages are accessible without authentication checks.

---

## 4. Account Dashboard Pages

### 4.1 Dashboard Overview (`storefront/src/app/[countryCode]/(main)/account/@dashboard/page.tsx`)
**Location:** Lines 14, 17-19
**Action:** Remove customer requirement
- Remove `notFound()` call when customer is missing (lines 17-19)
- Make customer optional and handle null case in component
- Remove or make optional the `getCustomer()` call

### 4.2 Profile Page (`storefront/src/app/[countryCode]/(main)/account/@dashboard/profile/page.tsx`)
**Location:** Lines 19, 22-24
**Action:** Remove customer requirement
- Remove `notFound()` call when customer is missing (lines 22-24)
- Make customer optional and handle null case in component
- Update component to handle missing customer gracefully

### 4.3 Addresses Page (`storefront/src/app/[countryCode]/(main)/account/@dashboard/addresses/page.tsx`)
**Location:** Lines 21, 24-26
**Action:** Remove customer requirement
- Remove `notFound()` call when customer is missing (lines 24-26)
- Make customer optional and handle null case in component
- Update AddressBook component to handle missing customer

**Result:** All account pages are accessible without authentication, showing appropriate UI for unauthenticated users.

---

## 5. Data Function Redirects

### 5.1 Customer Signout (`storefront/src/lib/data/customer.ts`)
**Location:** Line 88
**Action:** Remove redirect after signout
- Remove `redirect(\`/${countryCode}/account\`)` (line 88)
- Keep signout logic (auth logout, token removal, revalidation)
- Return success status instead of redirecting

### 5.2 Cart Checkout Steps (`storefront/src/lib/data/cart.ts`)
**Location:** Lines 347-349, 370, 397
**Action:** Remove checkout step redirects
- **Line 347-349:** Remove redirect after address step completion
- **Line 370:** Remove redirect after order placement (or make it optional)
- **Line 397:** Remove redirect after region update
- Return success status or updated data instead of redirecting

### 5.3 Onboarding Reset (`storefront/src/lib/data/onboarding.ts`)
**Location:** Line 7
**Action:** Remove redirect after onboarding reset
- Remove `redirect(\`http://localhost:7001/a/orders/${orderId}\`)` (line 7)
- Keep cookie clearing logic
- Return success status instead of redirecting

**Result:** All server actions return data/status instead of redirecting, allowing client-side navigation control.

---

## 6. Additional Considerations

### 6.1 Environment Variables
- Remove or ignore `NEXT_PUBLIC_COMING_SOON_MODE` environment variable
- Document that coming-soon mode is no longer enforced

### 6.2 Client-Side Navigation
- Update any client-side code that relies on automatic redirects
- Ensure navigation is handled explicitly in components where needed

### 6.3 Error Handling
- Update error handling to not rely on redirects
- Ensure proper error states are shown in UI

### 6.4 Testing
- Test all routes are accessible without authentication
- Verify no unexpected redirects occur
- Test account pages with and without customer data
- Test checkout flow without automatic step redirects

---

## Implementation Order

1. **Start with middleware** - Simplest and affects all routes
2. **Update home page** - Remove coming-soon redirect
3. **Update account layout** - Remove authentication guard
4. **Update account pages** - Remove `notFound()` calls
5. **Update data functions** - Remove redirects from server actions
6. **Test thoroughly** - Verify all changes work as expected

---

## Files to Modify

1. `storefront/src/middleware.ts` - Major simplification
2. `storefront/src/app/[countryCode]/(main)/page.tsx` - Remove redirect
3. `storefront/src/app/[countryCode]/(main)/account/layout.tsx` - Remove guard
4. `storefront/src/app/[countryCode]/(main)/account/@dashboard/page.tsx` - Remove guard
5. `storefront/src/app/[countryCode]/(main)/account/@dashboard/profile/page.tsx` - Remove guard
6. `storefront/src/app/[countryCode]/(main)/account/@dashboard/addresses/page.tsx` - Remove guard
7. `storefront/src/lib/data/customer.ts` - Remove redirect
8. `storefront/src/lib/data/cart.ts` - Remove redirects
9. `storefront/src/lib/data/onboarding.ts` - Remove redirect

---

## Notes

- Some redirects may be intentional for UX (e.g., after order placement). Consider making these optional or client-side controlled.
- Account pages may need UI updates to handle unauthenticated states gracefully.
- Checkout flow may need client-side step management if automatic redirects are removed.
- Consider adding optional client-side redirects where they improve UX, but make them explicit and controllable.

