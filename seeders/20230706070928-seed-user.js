"use strict";
const data = require("../data/user.json");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    data.forEach((el) => {
      el.password = bcrypt.hashSync(el.password, salt);
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    return queryInterface.bulkInsert("Users", data);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
