"use strict";

const data = require("../data/userCourse.json");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    data.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    return queryInterface.bulkInsert("UserCourses", data);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("UserCourses", null, {});
  },
};
