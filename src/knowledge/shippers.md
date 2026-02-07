# shippers

What does this table represent?

- Stores carriers/shipping contacts responsible for order deliveries.

When is a record created?

- When a new logistics partner or carrier is registered.

What is its role in analyses?

- Used to measure delivery performance, shipping cost and SLA by carrier.

Fields:

- `id` (INT, PK, AUTO_INCREMENT) — Unique shipper identifier.
- `company` (VARCHAR(50)) — Carrier company name.
- `last_name`, `first_name` (VARCHAR(50)) — Primary contact name.
- `email_address`, `business_phone`, `mobile_phone`, `fax_number` — Contact info.
- `address`, `city`, `state_province`, `zip_postal_code`, `country_region` — Contact address.
- `web_page` (LONGTEXT), `notes` (LONGTEXT), `attachments` (LONGBLOB) — Additional info.

Relationships:

- Referenced by: `orders.shipper_id`.

Notes:

- Use for delivery performance and cost analysis by carrier; do not aggregate shippers alone for monetary metrics without joining to `orders`.
