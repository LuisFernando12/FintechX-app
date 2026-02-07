# purchase_orders

What does this table represent?

- Records purchase orders sent to suppliers with amounts, dates and status.

When is a record created?

- When generating a purchase order to restock inventory or procure services.

What is its role in analyses?

- Essential for spend control, cashflow planning and inventory planning.

Fields:

- `id` (INT, PK, AUTO_INCREMENT) — Unique PO identifier.
- `supplier_id` (INT) — References `suppliers.id`.
- `created_by` (INT) — References `employees.id` who created the PO.
- `submitted_date`, `creation_date` (DATETIME) — Timestamps for submission and creation.
- `status_id` (INT) — References `purchase_order_status.id`.
- `expected_date` (DATETIME) — Expected delivery date.
- `shipping_fee`, `taxes`, `payment_amount` (DECIMAL) — Financial amounts related to the PO.
- `payment_date` (DATETIME) — Payment timestamp.
- `payment_method` (VARCHAR(50)) — Payment method used.
- `notes` (LONGTEXT) — PO notes.
- `approved_by`, `approved_date`, `submitted_by` — Approval and submitter details.

Relationships:

- References: `suppliers.id` (`supplier_id`), `employees.id` (`created_by`, `approved_by`, `submitted_by`), `purchase_order_status.id` (`status_id`).
- Referenced by: `purchase_order_details.purchase_order_id`, `inventory_transactions.purchase_order_id`.

Notes:

- Use for procurement spend and lead-time analysis; do not use for revenue metrics.
- For received quantities, join with `purchase_order_details` and `inventory_transactions`.
