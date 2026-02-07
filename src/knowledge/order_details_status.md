# order_details_status

What does this table represent?

- Types of statuses applicable to order lines (allocated, pending, cancelled).

When is a record created?

- When defining a new line status or when a line changes state.

What is its role in analyses?

- Enables measurement of allocation rates, backorders and fulfillment efficiency per SKU.

Fields:

- `id` (INT, PK) — Status identifier.
- `status_name` (VARCHAR(50)) — Status label.

Relationships:

- Referenced by: `order_details.status_id`.

Notes:

- Use to filter or group order lines by status (e.g., allocated, cancelled).
- This table should not be used for direct numeric aggregations.
