const { User } = require("./user");
const userCreate = async (user) => {
  try {
    const data = await User.create(user);
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

module.exports = { userCreate, userInsertedMultiple };
