import { sequelize } from "../../index";
import { DataTypes } from "sequelize";
const Student = sequelize.define(
  "student",
  {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 20],
      },
    },
    favorite_class: {
      type: DataTypes.STRING,
      defaultValue: "Computer Science",
    },
    school_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subscribed_to_wittcode: {
      type: DataTypes.BOOLEAN,
      default: true,
    },
  },
  {
    timestamps: false,
  }
);
export default Student;
