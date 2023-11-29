import { Op } from "sequelize";
import Student from "./student.model";
import { sequelize } from "../../index";
//A Model represents a table in the database. Instances of this class represent a database row.
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
export { createStudent, fetchStudent };
