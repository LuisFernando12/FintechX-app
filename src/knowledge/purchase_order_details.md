# purchase_order_details

What does this table represent?

- Line items on purchase orders (product, quantity, unit cost).

When is a record created?

- When items are added to a purchase order.

What is its role in analyses?

- Enables analysis of cost per item, quantities received and PO vs receipt comparisons.

Fields:

- `id` (INT, PK, AUTO_INCREMENT) — Line identifier.
- `purchase_order_id` (INT) — References `purchase_orders.id`.
- `product_id` (INT) — References `products.id`.
- `quantity` (DECIMAL) — Ordered quantity on PO.
- `unit_cost` (DECIMAL) — Cost per unit on PO.
- `date_received` (DATETIME) — When items were received.
- `posted_to_inventory` (TINYINT) — Flag indicating if posted to inventory.
- `inventory_id` (INT) — Reference to inventory transaction if posted.

Relationships:

- References: `purchase_orders.id` (`purchase_order_id`), `products.id` (`product_id`), `inventory_transactions.id` (`inventory_id`).

Notes:

- Use this table for PO-level cost and receipt analysis; join with `purchase_orders` for supplier-level metrics.
- Do not use for sales/revenue aggregations.
