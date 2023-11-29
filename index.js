import { Sequelize } from "sequelize";
const sequelize = new Sequelize("test", "postgres", "local@123", {
  host: "localhost",
  dialect: "postgres",
});
const makeConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  // const a = Buffer.from("aman is a good coder", "base64");
  // console.log(a) he data you provided <Buffer 6a 66 a7 8a c6 a0 a2 87 5c a1 d7 ab> is a
  //  hexadecimal representation of binary data, specifically a Buffer in Node.js.
};
makeConnection();
export { sequelize };
