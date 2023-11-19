const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("test", "postgres", "local@123", {
  host: "localhost",
  dialect: "postgres",
});
const makeConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
makeConnection();
module.exports = { sequelize };
