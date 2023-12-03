This file is just for information about technology


The purpose of validations is to provide a convenient way to enforce constraints at 
the application level before attempting to execute SQL queries. 
It allows Sequelize to catch potential issues early in the application code, providing
better feedback to developers and preventing unnecessary database queries that would 
violate constraints.


Even though you didn't explicitly install the validator library, Sequelize internally
handles the communication with validator when performing validations on model attributes.
The library is part of Sequelize's dependencies, and it is utilized seamlessly when you
define validation rules for your models.



Case sensitivity of postgres

The use of double quotes around identifiers, such as table and column names,
is specific to PostgreSQL and some other databases. PostgreSQL is case-sensitive
when it comes to identifiers, and if you create a table or column with a name 
that includes mixed-case or uppercase letters, you need to use double quotes 
to preserve the case sensitivity.

In your Sequelize model definition, you defined the column as "firstName."
When you're writing SQL queries directly, as in the case of the sequelize.query method,
you must use double quotes if your identifiers include uppercase or mixed-case letters.

So, "firstName" in double quotes is used to specify the exact case of the column name as defined in your Sequelize model. If your column name in the database is all lowercase (e.g., "firstname"), you can use it without double quotes.

Here's the corrected query for the scenario where the column name is all lowercase:

javascript
Copy code
const [results, metadata] = await sequelize.query(
  `UPDATE "Users" SET age = 24 WHERE firstName = 'aman'`,
  {
    type: sequelize.QueryTypes.UPDATE,
  }
);
This assumes that the actual column name in your PostgreSQL database is lowercase.
 If it's uppercase or mixed-case, then you should use the double quotes as in your original query:

javascript
Copy code
const [results, metadata] = await sequelize.query(
  `UPDATE "Users" SET age = 24 WHERE "firstName" = 'aman'`,
  {
    type: sequelize.QueryTypes.UPDATE,
  }
);
In summary, the use of double quotes around identifiers is a PostgreSQL-specific requirement 
for preserving case sensitivity.













