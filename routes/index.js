const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

router.use(function (req, res, next) {
  let isAdmin;
  let isUser;

  let { role } = req.session;

  role === "admin" ? (isAdmin = true) : (isAdmin = false);
  role === "user" ? (isUser = true) : (isUser = false);
  req.session.isAdmin = isAdmin;
  req.session.isUser = isUser;
  // console.log(isAdmin, isUser);
  next();
});

router.get("/", Controller.home);
router.get("/home", Controller.home);

router.get("/register", Controller.register);
router.post("/register", Controller.renderSaveRegister);

router.get("/login", Controller.login);
router.post("/login", Controller.checkLogin);

router.get("/profile", Controller.profile);
router.post("/profile", Controller.updateProfile);

router.get("/profile/create", Controller.createProfile);
router.post("/profile/create", Controller.saveCreateProfile);

router.get("/logout", Controller.logout);

router.get("/course/all", Controller.seeAllCourse);

router.get("/course/user/:id", Controller.userCourse);

router.get("/course/detail/:id", Controller.seeDetail);

router.get("/course/add/:id", Controller.addCourse);
router.post("/course/add/:id", Controller.saveAddCourse);

router.get("/course/edit/:id", Controller.editCourse);
router.post("/course/edit/:id", Controller.renderEditCourse);

router.get("/course/delete/:id", Controller.deleteCourse);

router.get("/course/admin/add", Controller.addNewCourse);
router.post("/course/admin/add", Controller.renderAddNewCourse);

router.get("/category/admin/add", Controller.addNewCategory);
router.post("/category/admin/add", Controller.renderAddNewCategory);


router.get("/category/admin/edit", Controller.editCategory);
router.post("/category/admin/edit", Controller.renderEditCategory);

// router.get("/seeAllCourse", Controller.seeAllCourse);
// router.get("/seeAllCourse/detail/:id", Controller.seeAllCourse);

router.get("/allCategories", Controller.seeAllCourse);
router.get("/allCategories/edit", Controller.seeAllCourse);
router.get("/allCategories/add", Controller.seeAllCourse);






// router.get("/seeAllCourse/admin", Controller.home);
// router.get("/seeAllCourse/user", Controller.home);

router.get("/contactUs", Controller.contactUs);

module.exports = router;
