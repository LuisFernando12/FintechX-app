# invoices

What does this table represent?

- Records invoices issued for orders with amounts and payment dates.

When is a record created?

- When an invoice is issued for an order (usually after confirmation/shipment).

What is its role in analyses?

- Basis for accounts receivable, revenue recognition and delinquency analysis.

Fields:

- `id` (INT, PK, AUTO_INCREMENT) — Unique invoice identifier.
- `order_id` (INT) — References `orders.id`.
- `invoice_date` (DATETIME) — Invoice issuance date.
- `due_date` (DATETIME) — Payment due date.
- `tax` (DECIMAL) — Tax amount applied.
- `shipping` (DECIMAL) — Shipping charges.
- `amount_due` (DECIMAL) — Total amount due.

Relationships:

- References: `orders.id` (`order_id`).

Notes:

- Use invoices for revenue recognition and AR analysis; invoices represent billed amounts, which may differ from order totals.
- Do not use invoices alone for SKU-level analysis; join with `order_details` if needed.
