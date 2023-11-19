const { User } = require("./user");
const userCreate = async (user) => {
  try {
    const data = await User.create(user);
    return "user is created";
  } catch (error) {
    console.log(error);
    return error;
  }
  //   await data.decrement({ age: 22 });
};
const userInsertedMultiple = async (user) => {
  const data = await User.bulkCreate(user);
  return "users are added to database";
};

module.exports = { userCreate, userInsertedMultiple };
