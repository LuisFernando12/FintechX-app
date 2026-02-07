# customers

What does this table represent?

- Stores customer master data (individuals or companies), including contact information and address.
- Each record represents one unique customer.
- This table does not store transactional or financial data.

When is a record created?

- When a customer is registered in the system, either manually or when placing the first order.

What is its role in analyses?

- Acts as a dimension table for customer segmentation.
- Used to group and analyze sales data by customer or region through joins with orders and order_details.
- Revenue, churn, and retention metrics require joins with transactional tables.

Fields:

- `id` (INT, PK, AUTO_INCREMENT) — Unique customer identifier.
- `company` (VARCHAR(50)) — Company name (if applicable).
- `last_name`, `first_name` (VARCHAR(50)) — Contact name.
- `email_address` (VARCHAR(50)) — Email contact.
- `job_title` (VARCHAR(50)) — Job title of the contact.
- `business_phone`, `home_phone`, `mobile_phone`, `fax_number` — Contact numbers.
- `address` (LONGTEXT) — Full address (billing/shipping).
- `city`, `state_province`, `zip_postal_code`, `country_region` — Location fields for segmentation.
- `web_page` (LONGTEXT) — Website URL.
- `notes` (LONGTEXT) — Free-form notes about the customer.
- `attachments` (LONGBLOB) — Binary attachments (documents, photos).

Relationships:

- `orders.customer_id` — One customer can have many orders; orders reference customers.

Notes:

- This table should not be used for direct aggregations (e.g., sum of revenue). Join with `orders` and `order_details` for transactional metrics.
- Use for grouping/dimension joins and segmentation only.
