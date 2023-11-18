const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("test", "postgres", "local@123", {
  host: "localhost",
  dialect: "postgres",
});
const makeConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
makeConnection();
const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    age: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);
