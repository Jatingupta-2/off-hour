# OFFHOUR — Product Requirements Document

**Version:** 1.0  
**Date:** 24 October 2026  
**Status:** Ready for design and prototype development  
**Tagline:** Wear your own time.

## 1. Product overview

OFFHOUR is an India-focused clothing brand for Gen Z, combining premium minimal design with streetwear.

Version 1 will deliver a polished, responsive e-commerce website where customers can discover products, select variants, sign in, and complete a purchase using Razorpay test payments.

The website will sell OFFHOUR’s own products across four categories:

- Hoodies
- Oversized tees
- Linen shirts
- Co-ord sets

## 2. Goals

- Establish a distinctive, premium brand experience.
- Make browsing and purchasing comfortable on mobile.
- Demonstrate the complete journey from product discovery to order confirmation.
- Support Google sign-in and email/password authentication.
- Validate checkout using Razorpay sandbox payments.
- Create a foundation for a future live store and admin section.

**Version 1 is a prototype.** Payments will run in test mode, and delivery, tracking, and return processing will use demonstration or manually managed data.

## 3. Target audience

Gen Z customers in India who want expressive, versatile clothing with understated branding and contemporary fits.

Their primary needs are:

- Clear product photography and fit information.
- Easy size and color selection.
- Transparent prices, delivery charges, and return terms.
- Fast, intuitive mobile shopping.
- A consistent experience across browsing, login, and checkout.

## 4. Scope

| Included in version 1 | Deferred |
|---|---|
| Responsive storefront | Native Android and iPhone apps |
| Homepage and category browsing | Custom admin dashboard |
| Search, filters, and sorting | Multi-brand marketplace |
| Product detail pages | Live payment processing |
| Persistent shopping bag | Automated warehouse and shipping integrations |
| Google and email/password login | Instagram sign-in |
| Login-required checkout | Reviews and ratings |
| Razorpay test payments | Loyalty and referral programs |
| Account, addresses, and order history | Advanced recommendations |
| Prototype cancellation and return requests | Automated reverse logistics |
| Grey, white, and dark themes | International selling and multiple currencies |

## 5. Brand and design requirements

The visual identity should feel premium, restrained, and contemporary.

- Grey is the default theme.
- Users can switch between grey, white, and dark themes.
- Theme preferences persist across visits on the same browser.
- Typography, spacing, photography, and layout establish the brand identity.
- Homepage motion is subtle and supports the shopping experience.
- Motion respects reduced-motion preferences.
- Navigation and primary purchase actions are easy to use on mobile.
- Forms have readable labels, clear errors, and visible focus states.
- All themes maintain accessible text and control contrast.

## 6. Information architecture

Primary pages:

1. Homepage
2. Shop all
3. Category listing
4. Search results
5. Product detail
6. Shopping bag
7. Login, registration, email verification, and password reset
8. Checkout
9. Order confirmation
10. Account and saved addresses
11. Order history and order details
12. Return or exchange request
13. About OFFHOUR
14. Contact and FAQs
15. Shipping, returns, privacy, and terms pages

## 7. Core customer journeys

### 7.1 Discover and purchase

Homepage → collection or category → product detail → select size and color → add to bag → sign in → checkout → test payment → confirmation.

### 7.2 Resume checkout after login

Bag → checkout → authentication → return to checkout with bag contents preserved.

### 7.3 Recover from a payment interruption

Checkout → failed or cancelled payment → clear status message → retry without losing the address or creating a duplicate order.

### 7.4 Manage an order

Sign in → order history → order details → inspect status → request cancellation, return, or exchange when eligible.

## 8. Functional requirements

### 8.1 Homepage

- Display the OFFHOUR name, tagline, and primary shopping action.
- Include a hero section with subtle motion.
- Provide links to all four categories.
- Feature new arrivals, selected products, and a collection story.
- Include a short brand introduction.
- Provide access to search, account, bag, theme selection, and support pages.

### 8.2 Product listing and search

- Support shop-all and category-specific views.
- Search by product name.
- Filter by category, size, color, price, and availability.
- Sort by featured, newest, price low to high, and price high to low.
- Show active filters and allow individual removal or clearing all.
- Display product image, name, INR price, and available colors.
- Identify sold-out products clearly.
- Provide helpful loading, empty, and error states.

Filters must work together, and sorting must apply to the filtered results.

### 8.3 Product detail page

Each product must provide:

- Image gallery with zoom.
- Name, description, and price in INR.
- Fabric composition and care instructions.
- Fit description, size guide, and model sizing where available.
- Size and color options.
- Availability for the selected combination.
- Quantity selection within available stock.
- Delivery estimate based on an Indian postcode.
- Shipping and returns information.
- Add-to-bag action.
- Related products.

Customers must select required options before adding an item. Unavailable variants cannot be purchased.

**Co-ord sets:** One size selection applies to both the top and bottom. Separate sizing is not supported.

Postcode estimates may use demonstration rules in the prototype and must be identified accordingly.

### 8.4 Shopping bag

- Allow adding products without signing in.
- Show product image, name, color, size, quantity, and price.
- Allow quantity changes and removal.
- Persist contents across visits on the same browser.
- Preserve contents through authentication.
- Show subtotal, discount, shipping, and total.
- Support a sample promotional code with validation.
- Recheck availability and pricing before payment.
- Explain unavailable products or price changes before purchase.

Shipping charges must be visible before the customer pays.

### 8.5 Authentication

Support:

- Google sign-in.
- Registration using email and password.
- Email verification.
- Email/password login.
- Password reset.
- Logout.

Authentication errors must be understandable. Sessions must persist securely, and customers must return to their intended purchase flow after signing in.

Checkout requires a signed-in account. Browsing and bag management do not.

### 8.6 Account and addresses

- View and edit basic profile information.
- Add, edit, and remove delivery addresses.
- Select a default address.
- View order history.
- Open order details.

Address fields include recipient name, phone number, address lines, city, state, and postcode. Country is fixed to India in version 1.

### 8.7 Checkout

- Require authentication.
- Allow selecting a saved address or adding a new one.
- Validate required address fields, Indian postcode format, and phone format.
- Present products, variants, quantities, discounts, shipping, and final total.
- Prevent payment when required information is missing.
- Revalidate the bag before initiating payment.
- Keep entered information available after payment failure or cancellation.
- Clearly label the payment experience as test mode.

Currency is INR throughout the shopping journey.

### 8.8 Razorpay integration

- Use Razorpay test credentials.
- Create payment orders through a secure server-side integration.
- Keep payment secrets out of browser code.
- Verify payment authenticity on the server.
- Confirm payment status before marking an order paid.
- Handle success, failure, cancellation, and uncertain payment status.
- Prevent repeated callbacks or retries from creating duplicate paid orders.

A browser success message alone must not be treated as proof of payment.

### 8.9 Orders

- Create an order with a unique reference.
- Store purchased product details, variants, quantities, prices, and delivery address.
- Show a confirmation page following verified test payment.
- Display orders in the customer’s account.
- Track payment status separately from fulfillment status.

Prototype fulfillment states:

- Placed
- Processing
- Shipped
- Delivered
- Cancelled
- Returned

Payment states include pending, paid, failed, and refunded.

Historical order details must remain accurate if catalog information changes later.

### 8.10 Cancellation, returns, and exchanges

Use the agreed seven-day policy for the prototype:

- Return or exchange requests are accepted within seven days after delivery.
- Items must be unworn, unwashed, and retain their tags.
- Size exchanges depend on replacement stock.
- Approved refunds go to the original payment method after inspection.
- Wrong, damaged, or defective items receive free return handling.
- Any preference-based return pickup fee must be disclosed before submission.

Customers must be able to:

- Request cancellation before dispatch.
- Select eligible order items for return or exchange.
- Choose a reason and add comments.
- Optionally attach photos for damaged or incorrect items.
- See confirmation and request status.

The prototype records requests and demonstrates status changes. It does not automatically arrange pickups or issue refunds.

Final production policy wording, fees, and operational handling remain launch decisions.

### 8.11 Support and policy pages

Provide branded pages for:

- About OFFHOUR
- Contact
- FAQs
- Size guide
- Shipping information
- Returns and exchanges
- Privacy
- Terms

Prototype content must avoid presenting unconfirmed delivery promises or operational details as established services.

## 9. Data requirements

| Entity | Core information |
|---|---|
| Product | Name, category, description, fabric, care, fit, images, price |
| Product variant | Product reference, SKU, color, size, stock |
| Customer | Name, email, authentication reference |
| Address | Recipient, phone, address, city, state, postcode |
| Bag | Items, variants, quantities |
| Order | Customer, item snapshots, totals, address, statuses |
| Payment | Order reference, provider references, amount, verification status |
| Return request | Order items, reason, evidence, requested resolution, status |
| Promotion | Code, discount rule, eligibility |

The sample catalog should represent all four categories and include products with multiple variants, unavailable sizes, and sold-out items.

## 10. Non-functional requirements

### Mobile and browser support

- Support mobile, tablet, and desktop layouts.
- Avoid horizontal overflow at supported screen sizes.
- Validate core journeys in current Chrome, Safari, Edge, and Firefox.

### Performance

- Optimize and responsively size product images.
- Lazy-load non-critical images.
- Keep homepage animation lightweight.
- Provide feedback during loading and submission.

### Accessibility

- Target WCAG 2.2 AA for core journeys.
- Support keyboard navigation and visible focus.
- Associate form errors with their fields.
- Provide useful alternative text for product images.
- Respect reduced-motion preferences.

### Security and privacy

- Enforce account ownership for orders and addresses.
- Validate sensitive actions on the server.
- Use secure authentication and session handling.
- Never store raw payment card information.
- Keep secrets outside source control and browser bundles.
- Avoid logging passwords, payment secrets, or unnecessary personal data.

### Discoverability

- Provide meaningful page titles and descriptions.
- Use descriptive product URLs.
- Include social-sharing metadata.
- Keep test deployments out of search indexing.

## 11. Prototype acceptance criteria

Version 1 is accepted when:

1. All four product categories can be browsed on mobile and desktop.
2. Search, filters, and sorting return consistent results.
3. Required size and color selections are enforced.
4. Co-ord sets use a single size selection.
5. Bag contents persist across refresh and authentication.
6. Google and email/password authentication work.
7. Email verification and password reset flows work.
8. Signed-out customers are prompted to authenticate before checkout.
9. Razorpay test payments cover success, failure, cancellation, and retry.
10. Orders are marked paid only after server verification.
11. Payment retries do not create duplicate paid orders.
12. Customers can view only their own account data and orders.
13. Grey, white, and dark themes work across the shopping journey.
14. Eligible demonstration orders support cancellation and return requests.
15. Loading, empty, validation, and error states are present.
16. Core pages work without overflow on mobile and support keyboard use.
17. Payment test mode and simulated fulfillment behavior are clearly identified.

## 12. Evaluation

Prototype evaluation will focus on:

- Whether users can find a product and select the correct variant.
- Whether sizing, prices, shipping, and return terms are understandable.
- Whether users can complete checkout without assistance.
- Whether payment failures can be recovered from successfully.
- Whether OFFHOUR’s visual identity feels consistent across devices and themes.

Analytics events may capture product views, add-to-bag actions, checkout starts, authentication completion, and payment outcomes. Numeric business targets will be defined after initial testing.

## 13. Dependencies and open decisions

These do not prevent initial design work:

| Item | Requirement |
|---|---|
| Brand assets | Final logo, typography, and photography |
| Catalog | Product names, descriptions, prices, measurements, and stock |
| Google authentication | OAuth configuration and approved domains |
| Email | Provider for verification and password reset |
| Razorpay | Test account and credentials |
| Shipping | Charges, free-shipping threshold, and postcode estimate rules |
| Returns | Preference-based pickup fee and final policy wording |
| Support | Customer-facing contact details |
| Hosting | Prototype hosting and data storage |
| Catalog maintenance | Developer-managed seed data for version 1; custom admin deferred |

## 14. Delivery milestones

1. **Design foundation:** Brand direction, themes, navigation, and mobile layouts.
2. **Storefront:** Homepage, catalog, search, filters, and product pages.
3. **Customer flows:** Bag, authentication, addresses, and account.
4. **Checkout:** Razorpay test integration, verification, and order confirmation.
5. **Post-purchase:** Order history, demonstration tracking, and return requests.
6. **Validation:** Responsive review, accessibility checks, and end-to-end payment testing.

The version 1 deliverable is a cohesive OFFHOUR shopping prototype ready for review and user testing. A production launch requires a separate readiness review covering live payments, inventory operations, shipping, support, and final policies.
