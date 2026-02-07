# employee_privileges

What does this table represent?

- Association between employees and privileges (many-to-many) indicating assigned permissions.

When is a record created?

- When granting or revoking a privilege for an employee.

What is its role in analyses?

- Essential for access audits, permission monitoring and incident investigations.

Fields:

- `employee_id` (INT) — References `employees.id`, identifies the employee.
- `privilege_id` (INT) — References `privileges.id`, identifies the privilege.
- Primary key is (`employee_id`, `privilege_id`).

Relationships:

- References: `employees.id` and `privileges.id`.

Notes:

- Use for permission audits and to determine which users have which privileges; do not use for monetary or transactional aggregations.
