# products

What does this table represent?

- Product catalog with price, cost, category and inventory-related information.

When is a record created?

- When a new SKU/product is added to the catalog.

What is its role in analyses?

- Foundation for SKU-level sales, margin, turnover and replenishment analyses.

Fields:

- `supplier_ids` (LONGTEXT) — List or metadata of supplier IDs for the product.
- `id` (INT, PK, AUTO_INCREMENT) — Unique product identifier.
- `product_code` (VARCHAR(25)) — SKU or product code.
- `product_name` (VARCHAR(50)) — Product name.
- `description` (LONGTEXT) — Product description.
- `standard_cost` (DECIMAL) — Standard cost for the product.
- `list_price` (DECIMAL) — Sales price.
- `reorder_level`, `target_level` (INT) — Replenishment thresholds.
- `quantity_per_unit` (VARCHAR(50)) — Packaging/quantity description.
- `discontinued` (TINYINT) — Flag if product is discontinued.
- `minimum_reorder_quantity` (INT) — Minimum order quantity.
- `category` (VARCHAR(50)) — Product category.
- `attachments` (LONGBLOB) — Product-related binary attachments.

Relationships:

- Referenced by: `order_details.product_id`, `purchase_order_details.product_id`, `inventory_transactions.product_id`.

Notes:

- Use `order_details` for SKU-level sales and margin calculations; do not aggregate `products` alone for revenue.
- Product supplier links are stored as `supplier_ids` (not normalized) — be cautious when deriving supplier-product mappings.
