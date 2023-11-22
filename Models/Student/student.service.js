const { Op } = require("sequelize");
const Student = require("./student.model.js");
const { sequelize } = require("../../index.js");
const createStudent = async (students) => {
  try {
    const data = await Student.bulkCreate(students, { validate: true });
    return { message: data, statusCode: 200 };
  } catch (error) {
    throw { message: "users are not created", statusCode: 400 };
  }
};
const fetchStudent = async () => {
  try {
    // const data = await Student.findAll({
    //   where: {
    //     [Op.or]: [
    //       { favorite_class: "Computer Science" },
    //       { subscribed_to_wittcode: true },
    //     ],
    //   },
    // });
    const data = await Student.findAll({
      attributes: [
        [sequelize.fn("Count", "school_year"), "num_students"],
        "school_year",
      ],
      group: "school_year",
    });
    return { message: data, statusCode: 200 };
  } catch (error) {
    throw { message: "users are not fetched", statusCode: 400 };
  }
};
module.exports = { createStudent, fetchStudent };
