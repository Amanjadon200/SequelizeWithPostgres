import bcrypt from "bcrypt";
import zlib from "zlib";
import { sequelize } from "../../index";
import { DataTypes } from "sequelize";
const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 6],
        // isIn: [["aman", "naman"]],
      },
      get() {
        const rawValue = this.getDataValue("firstName");
        return rawValue ? rawValue.toUpperCase() : null;
      },
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        // isInt: true, was not working  may be sequelize consider "12" as 12 internally type casting
        //  if possible then custom validator added
        isInteger(value) {
          // console.log(this,"_______________")
          if (typeof value !== "number") {
            throw "age must be an integer";
          }
        },
        isMature(value) {
          if (value < 18) {
            throw "not mature!";
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue("password", hash);
      },
    },
    about: {
      type: DataTypes.STRING,
      get() {
        const decompressedData = zlib
          .inflateSync(Buffer.from(this.getDataValue("about"), "base64"))
          .toString();
        return decompressedData;
      },
      set(value) {
        const compressedData = zlib.deflateSync(value).toString("base64");
        this.setDataValue("about", compressedData);
      },
    },
  },
  {
    timestamps: false,
  }
);
export default User;
// Base64 encoding is a form of encoding, not encryption.
// It's designed to represent binary data in a text format,
//  and it is easily decodable. The purpose of Base64 encoding
//   is not to provide secrecy or security but rather to ensure
//    that binary data can be safely transmitted and stored as text.

// When you use .toString('base64') on a binary data (such as a Buffer) in Node.js,
//  the length of the resulting Base64-encoded string is influenced by the size of the binary data.

// The formula to calculate the length of the Base64-encoded string is as follows:

// Base64 length = ⌈8 ×binary data length] /6
// Here's a brief explanation:

// Each character in the Base64-encoded string represents 6 bits of the original binary data.
// To find the length of the Base64-encoded string, you take the size of the binary data in
//  bits (8 bits per byte) and divide it by 6.
// The result is rounded up to the nearest whole number, as Base64 encoding always produces a
//  string length that is a multiple of 4.
// Keep in mind that this is an approximation because Base64 encoding doesn't handle incomplete
// chunks gracefully. If the binary data length is not a multiple of 3, padding characters ('=')
// are added to make it a multiple of 4.
