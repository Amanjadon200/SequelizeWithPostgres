const bcrypt = require("bcrypt");
const zlib = require("zlib");
const { sequelize } = require("../index.js");
const { DataTypes } = require("sequelize");
const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 6],
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
module.exports = { User };
// Base64 encoding is a form of encoding, not encryption. 
// It's designed to represent binary data in a text format,
//  and it is easily decodable. The purpose of Base64 encoding
//   is not to provide secrecy or security but rather to ensure
//    that binary data can be safely transmitted and stored as text.