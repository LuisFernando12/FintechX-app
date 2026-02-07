# inventory_transactions

What does this table represent?

- Records inventory movements (type, quantity, links to orders and POs).

When is a record created?

- Whenever a stock movement occurs: receipt, sale, adjustment, etc.

What is its role in analyses?

- Used to track stock levels, compute turnover and identify discrepancies.

Fields:

- `id` (INT, PK, AUTO_INCREMENT) — Unique transaction identifier.
- `transaction_type` (TINYINT) — References `inventory_transaction_types.id` (type of movement).
- `transaction_created_date` (DATETIME) — Creation timestamp.
- `transaction_modified_date` (DATETIME) — Last modification timestamp.
- `product_id` (INT) — References `products.id`.
- `quantity` (INT) — Quantity moved (positive/negative depending on type).
- `purchase_order_id` (INT) — Optional link to a PO.
- `customer_order_id` (INT) — Optional link to a customer order.
- `comments` (VARCHAR(255)) — Notes about the movement.

Relationships:

- References: `products.id` (`product_id`), `purchase_orders.id` (`purchase_order_id`), `orders.id` (`customer_order_id`), `inventory_transaction_types.id` (`transaction_type`).
- This table is referenced by `purchase_order_details.inventory_id` and `order_details.inventory_id` when movements are posted.

Notes:

- Use this table for stock-level and movement analyses; it is not suitable for revenue aggregations.
- When reconciling inventory with financials, join with `purchase_order_details` and `order_details` where appropriate.
