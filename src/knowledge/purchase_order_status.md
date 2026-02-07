# purchase_order_status

What does this table represent?

- Statuses applicable to purchase orders (e.g., draft, approved, received).

When is a record created?

- When a new PO status is defined or when POs are created with that status.

What is its role in analyses?

- Helps track purchase cycle, receipt lead times and procurement efficiency.

Fields:

- `id` (INT, PK) — Status identifier.
- `status` (VARCHAR(50)) — Status label.

Relationships:

- Referenced by: `purchase_orders.status_id`.

Notes:

- Use as a lookup for procurement lifecycle analytics (e.g., % approved vs draft).
- This table should not be used for direct numeric aggregations.
