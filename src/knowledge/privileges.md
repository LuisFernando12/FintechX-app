# privileges

What does this table represent?

- Defines privileges or roles available in the system (permission names).

When is a record created?

- When a new privilege/role is added by security or operations teams.

What is its role in analyses?

- Helps in security and compliance analyses by identifying existing roles and how many users hold each permission.

Fields:

- `id` (INT, PK, AUTO_INCREMENT) — Unique privilege identifier.
- `privilege_name` (VARCHAR(50)) — Human-readable name of the privilege/role.

Relationships:

- Referenced by: `employee_privileges.privilege_id`.

Notes:

- Use for access audits and role counts; not suitable for numeric aggregations.
