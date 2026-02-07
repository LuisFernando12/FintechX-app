# suppliers

What does this table represent?

- Supplier information (contact, address, company details).

When is a record created?

- When registering a supplier for purchasing and negotiation.

What is its role in analyses?

- Used for supplier performance, lead time and acquisition cost analyses.

Fields:

- `id` (INT, PK, AUTO_INCREMENT) — Unique supplier identifier.
- `company` (VARCHAR(50)) — Supplier company name.
- `last_name`, `first_name` (VARCHAR(50)) — Primary contact name.
- `email_address` (VARCHAR(50)) — Supplier contact email.
- `business_phone`, `home_phone`, `mobile_phone`, `fax_number` — Contact numbers.
- `address`, `city`, `state_province`, `zip_postal_code`, `country_region` — Address fields.
- `web_page` (LONGTEXT) — Supplier website.
- `notes` (LONGTEXT) — Additional notes or terms.
- `attachments` (LONGBLOB) — Documents such as contracts or certificates.

Relationships:

- Referenced by: `purchase_orders.supplier_id`.

Notes:

- Use for supplier performance and spend reporting via joins with `purchase_orders` and `purchase_order_details`.
- Avoid using suppliers alone for monetary aggregations without joining to purchase tables.
