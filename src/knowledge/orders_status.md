# orders_status

What does this table represent?

- Lists possible statuses for an order (e.g., pending, shipped, cancelled).

When is a record created?

- When a new order status is defined or used for the first time.

What is its role in analyses?

- Crucial for order lifecycle metrics: conversion rates, processing times and outstanding orders.

Fields:

- `id` (TINYINT, PK) — Status identifier.
- `status_name` (VARCHAR(50)) — Human-readable status label.

Relationships:

- Referenced by: `orders.status_id`.

Notes:

- Use for order lifecycle analyses and grouping; do not perform numeric aggregations on lookup rows.
