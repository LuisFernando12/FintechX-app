# sales_reports

What does this table represent?

- Definitions of sales reports (grouping, filters and display title).

When is a record created?

- When creating a new report definition or business view.

What is its role in analyses?

- Facilitates standardized reports, dashboard automation and metric sharing.

Fields:

- `group_by` (VARCHAR(50), PK) — Key for grouping (e.g., by product, region).
- `display` (VARCHAR(50)) — Display label for the group.
- `title` (VARCHAR(50)) — Report title.
- `filter_row_source` (LONGTEXT) — Serialized filter definition.
- `default` (TINYINT) — Flag indicating default report/view.

Notes:

- Contains report definitions and filter serialization; not intended for transactional aggregations.
- Use this table to build standardized dashboards and saved views.
