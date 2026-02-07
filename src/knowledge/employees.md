# employees

What does this table represent?

- Contains employees/internal users with contact information and job role.

When is a record created?

- When a new employee is hired or registered in the system.

What is its role in analyses?

- Used for assignment of responsibilities, sales/employee performance metrics and audit trails.

Fields:

- `id` (INT, PK, AUTO_INCREMENT) — Unique employee identifier.
- `company` (VARCHAR(50)) — Employer or related company name.
- `last_name`, `first_name` (VARCHAR(50)) — Employee name.
- `email_address` (VARCHAR(50)) — Work email.
- `job_title` (VARCHAR(50)) — Role or title.
- `business_phone`, `home_phone`, `mobile_phone`, `fax_number` (VARCHAR) — Contact numbers.
- `address`, `city`, `state_province`, `zip_postal_code`, `country_region` — Contact/address fields.
- `web_page` (LONGTEXT) — Personal or company page (optional).
- `notes` (LONGTEXT) — HR notes.
- `attachments` (LONGBLOB) — Documents like contracts or IDs.

Relationships:

- Referenced by: `orders.employee_id`, `purchase_orders.created_by|approved_by|submitted_by`, `employee_privileges.employee_id`.

Notes:

- Use employees to attribute actions and for performance metrics; do not use as a source of monetary aggregations.
- For headcount and turnover analysis, join with event or hiring tables where available.
