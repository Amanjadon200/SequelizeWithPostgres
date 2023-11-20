const { Op } = require("sequelize");
const { User } = require("./user");
const { sequelize } = require("..");
const userCreate = async (user) => {
  try {
    const data = await User.create(user);
    // const data = await User.create(user, { fields: ["firstName"] });  this fields we can use to restict our sequleize only add those fields mentioned in array of fields
    return { message: "user is added to database", data };
  } catch (error) {
    throw { message: error.errors[0].message };
  }
  //   await data.decrement({ age: 22 });
};
const userInsertedMultiple = async (user) => {
  try {
    const data = await User.bulkCreate(user, { validate: true });
    return { message: "users are added to database", data, statusCode: "200" };
  } catch (error) {
    throw {
      message: error.errors[0].message,
      statusCode: "400",
    };
  }
};
const getAllUsersDetails = async () => {
  try {
    const data = await User.findAll({
      attributes: [
        ["firstName", "fName"],
        ["age", "AGE"],
      ],
    });
    return { message: "Users Fetched", data, statusCode: "200" };
  } catch (error) {
    throw {
      message: "users is not fetched",
      statusCode: "400",
    };
  }
};
const getUser = async () => {
  try {
    // const data = await User.findAll({
    //   attributes: [[sequelize.fn("SUM", sequelize.col("age")), "netAge"]],
    // });
    // const data = await User.findAll({
    //   order:[["age","ASC"]]
    // });
    const data = await User.findAll({
      attributes: [
        "firstName",
        [sequelize.fn("SUM", sequelize.col("age")), "NetAge"],
      ],
      group: "firstName",
    });
    return { message: "Users Fetched", data, statusCode: "200" };
  } catch (error) {
    throw {
      message: "users is not fetched",
      statusCode: "400",
    };
  }
};

module.exports = {
  userCreate,
  userInsertedMultiple,
  getAllUsersDetails,
  getUser,
};
