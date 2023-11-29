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






