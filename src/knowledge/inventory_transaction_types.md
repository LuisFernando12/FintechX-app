# inventory_transaction_types

What does this table represent?

- Lists inventory movement types (e.g., receipt, shipment, adjustment).

When is a record created?

- When a new inventory transaction type is defined in the system.

What is its role in analyses?

- Enables categorization of stock movements for turnover, loss and reconciliation reports.

Fields:

- `id` (TINYINT, PK) — Identifier for the transaction type.
- `type_name` (VARCHAR(50)) — Descriptive name of the transaction type.

Relationships:

- Referenced by: `inventory_transactions.transaction_type`.

Notes:

- Use to group inventory movements (receipts, shipments, adjustments) when analyzing stock flows.
- Not appropriate for revenue or customer-level analysis.
