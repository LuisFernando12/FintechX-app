# orders

What does this table represent?

- Stores customer orders with dates, shipping, taxes and status information.

When is a record created?

- When an order is placed in the system (checkout completion or manual entry).

What is its role in analyses?

- Primary source for revenue, order volume, delivery times and cancellation rate metrics.

Fields:

- `id` (INT, PK, AUTO_INCREMENT) — Unique order identifier.
- `employee_id`, `customer_id`, `shipper_id` (INT) — References to employees, customers and shippers.
- `order_date`, `shipped_date`, `paid_date` (DATETIME) — Relevant timestamps.
- `ship_name`, `ship_address`, `ship_city`, `ship_state_province`, `ship_zip_postal_code`, `ship_country_region` — Shipping details.
- `shipping_fee`, `taxes`, `tax_rate`, `payment_amount` — Financial fields related to the order.
- `payment_type` (VARCHAR(50)) — Payment method.
- `notes` (LONGTEXT) — Order notes.
- `tax_status_id`, `status_id` — References to tax and status tables.

Relationships:

- References: `customers.id` (`customer_id`), `employees.id` (`employee_id`), `shippers.id` (`shipper_id`), `orders_tax_status.id` (`tax_status_id`), `orders_status.id` (`status_id`).
- Referenced by: `order_details.order_id` (order lines), `invoices.order_id` (invoices), `inventory_transactions.customer_order_id` (inventory movements linked to orders).

Notes:

- Prefer using `order_details` for SKU-level aggregations and `invoices` for revenue; avoid aggregating `orders` directly for revenue calculations unless joined to `order_details` or `invoices`.
- Status fields are small lookup references—use them for lifecycle analytics.
