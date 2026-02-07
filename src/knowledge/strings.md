# strings

What does this table represent?

- Stores reusable texts/strings (can be used for i18n or dynamic content).

When is a record created?

- When adding a new string or text key to the system.

What is its role in analyses?

- Supports internationalization and centralizes text used in reports and interfaces.

Fields:

- `string_id` (INT, PK, AUTO_INCREMENT) — Unique identifier for the string.
- `string_data` (VARCHAR(255)) — The actual text content or key.

Notes:

- Stores textual keys and translations for UI and reports; not intended for numeric aggregations.
- Use to centralize messages and support i18n; avoid deriving metrics from this table.
