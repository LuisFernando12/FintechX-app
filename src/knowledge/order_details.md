# order_details

What does this table represent?

- Items (lines) of each order with product, quantity, price and discount details.

When is a record created?

- When adding an item to an order at checkout or during order editing.

What is its role in analyses?

- Essential for SKU-level metrics, discount impact, revenue per item and margin analysis.

Fields:

- `id` (INT, PK, AUTO_INCREMENT) — Line identifier.
- `order_id` (INT) — References `orders.id`.
- `product_id` (INT) — References `products.id`.
- `quantity` (DECIMAL) — Ordered quantity.
- `unit_price` (DECIMAL) — Price per unit at time of order.
- `discount` (DOUBLE) — Discount applied to the line.
- `status_id` (INT) — References `order_details_status.id`.
- `date_allocated` (DATETIME) — Allocation timestamp for inventory.
- `purchase_order_id` (INT) — Link to related PO if applicable.
- `inventory_id` (INT) — Link to inventory transaction if applicable.

Relationships:

- References: `orders.id` (`order_id`), `products.id` (`product_id`), `order_details_status.id` (`status_id`).
- Optional links: `purchase_orders.id` via `purchase_order_id`, `inventory_transactions.id` via `inventory_id` when corresponding receipts or allocations exist.

Notes:

- This table is the correct source for SKU-level revenue and quantity aggregation; do not aggregate `orders` for SKU metrics without joining to this table.
- Use `status_id` to filter lines (e.g., exclude cancelled lines) before aggregating.
