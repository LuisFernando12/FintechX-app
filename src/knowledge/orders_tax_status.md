# orders_tax_status

What does this table represent?

- Defines tax statuses applicable to orders (e.g., taxable, exempt).

When is a record created?

- When a new tax status label is added to the system.

What is its role in analyses?

- Important for tax reporting, net revenue calculations and fiscal compliance.

Fields:

- `id` (TINYINT, PK) — Identifier for the tax status.
- `tax_status_name` (VARCHAR(50)) — Tax status label.

Relationships:

- Referenced by: `orders.tax_status_id`.

Notes:

- Use to correctly classify tax treatments in revenue reports.
- Avoid using this table alone for numeric calculations.
