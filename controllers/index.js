const { Category, User, Profile, Course, UserCourse } = require("../models");
const bcrypt = require("bcryptjs");
const {Op} = require("sequelize")
const time = require("../helpers/time")
const pdfService = require('../service/pdf-service')

class Controller {
  static home(req, res) {
    let { isAdmin, isUser, userName, userId } = req.session;
    res.render("home", { userName, isAdmin, isUser, userId });
  }

  static login(req, res) {
    const { error } = req.query;
    res.render("login", { error });
  }

  static checkLogin(req, res) {
    let { userName, password } = req.body;
    User.findOne({ where: { userName } })
      .then((data) => {
        if (data) {
          const isPasswordValid = bcrypt.compareSync(password, data.password);
          if (isPasswordValid) {
            req.session.role = data.dataValues.role;
            req.session.userId = data.dataValues.id;
            req.session.userName = userName;
            return res.redirect("/");
          } else {
            req.session.role = null;
            req.session.userId = null;
            req.session.userName = null;
            const error = "Invalid password";
            return res.redirect(`/login?error=${error}`);
          }
        }
        req.session.role = null;
        req.session.userId = null;
        req.session.userName = null;
        const error = `${userName} hasn't registered, Please register first`;
        res.redirect(`/register?error=${error}`);
      })
      .catch((err) => {
        res.send(err.errors.map((el) => el.message));
      });
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) console.log(err);
      else res.redirect("/");
    });
  }

  static register(req, res) {
    const { error } = req.query;
    res.render("register", { error });
  }

  static renderSaveRegister(req, res) {
    let { userName, email, password } = req.body;
    User.create({ userName, email, password })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        let error = err.errors.map((el) => el.message);
        res.redirect(`/register?error=${error}`);
      });
  }

  static profile(req, res) {
    let gender = ["Male", "Female"];
    let { isAdmin, isUser, userId } = req.session;
    if (isAdmin || isUser) {
      Profile.findOne({ where: { userId } })
        .then((data) => {
          if (data) return res.render("profile", { data, gender });
          else return res.redirect("/profile/create");
        })
        .catch((err) => {
          res.send(err.errors.map((el) => el.message));
        });
    } else {
      const error = "Please Login First";
      return res.redirect(`/login?error=${error}`);
    }
  }

  static updateProfile(req, res) {
    let { userId } = req.session;
    let { firstName, lastName, gender } = req.body;
  
    Profile.findOne({ 
      where: { userId } 
    })
      .then(profile => {
        if (profile) {
          profile.firstName = firstName;
          profile.lastName = lastName;
          profile.gender = gender;
  
          return profile.save();
        } else {
          throw new Error('Profil pengguna tidak ditemukan');
        }
      })
      .then(updatedProfile => {
        res.redirect("/home");
      })
      .catch(error => {
        res.send(error.message);
      });
  }

  static createProfile(req, res) {
    let gender = ["Male", "Female"];
    res.render("create_profile", { gender });
  }

  static saveCreateProfile(req, res) {
    let { userId } = req.session;
    let { firstName, lastName, gender } = req.body;
    Profile.create({ firstName, lastName, gender, userId })
      .then(() => {
        res.redirect("/home");
      })
      .catch((err) => {
        res.send(err.errors.map((el) => el.message));
      });
  }

  static seeAllCourse(req, res) {
    let { isAdmin, isUser } = req.session;
    let { search } = req.query;
    let categoryList;
    
    Category.categoryList({
      include: User
    })
      .then((data) => {
        categoryList = data;
        return Course.getCourseByCategory(search); 
      })
      .then((data) => {
        res.render("see-all-course", { isAdmin, isUser, data, categoryList });  
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
  
  static getCourseByCategory(search) {
    let filter = {};
    if (search) {
      filter = { category: { [Op.like]: `%${search}%` } };
    }
    return Course.findAll({ where: filter });
  }

  static userCourse(req, res) {
    let id = req.params.id;
  
    UserCourse.findAll({
      where: {
        userId: id
      },
      include: Course
    })
    .then((userc) => {
      if (!userc) {
        throw new Error('Data user course tidak ditemukan');
      }
      let courseid = userc.courseId;
      res.render("user_course", {userc,time})
      // console.log(userc)
    })
    .catch((err) => {
      console.error('Terjadi kesalahan:', err);
      res.status(500).send('Data course tidak ditemukan');
    });
  }


  static seeDetail(req, res) {
    let { isUser } = req.session;
    let id = req.params.id;
    let options = {
      where: { id },
      include: { model: Category, attributes: ["name"] },
    };
    Course.findOne(options)
      .then((data) => {
        res.render("see-detail", { data, isUser, time });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static addCourse(req, res) {
    let username;
    let id = req.params.id
    Course.findOne({
      include: User,
      where: {
        id
      }
    })
    .then((data) => {
      // res.send(data)
      res.render("addcustomercourse", {data})
    })
    .catch((err) => {
      res.send(err)
    })
  }

  static saveAddCourse(req,res){
    let userId;
    let CourseId
    let {courseId, userName} = req.body

    User.findOne({
      where: {
        userName
      }
    })
    .then((user) => {
      userId = user.id 
      return UserCourse.create({
        userId: userId,
        courseId: courseId
      })
    })
    .then((data) => {
      res.redirect("/home")
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
  }

  static editCourse(req, res) {
    res.send("edit course admin");
  }

  static renderEditCourse(req, res) {
    let id = req.params.id;
    console.log(req.params);
    res.send("edit course admin");
  }

  static deleteCourse(req, res) {
    let id = req.params.id;
    
    Course.destroy({
      where: {
        id
      }
    })
    .then(() => {
      res.redirect("/course/all")
    })
  }

  static addNewCourse(req, res) {
    Category.findAll()
    .then((data) => {
      res.render('add-new-course', {data})
    })
    .catch((err)=>{
      res.send(err.errors.map((el) => el.message))
    })
  }

  static renderAddNewCourse(req, res) {
    let {name, description, duration, pdfLink, categoryId} = req.body;

    Course.create({ name, description, duration, categoryId, pdfLink })
    .then(() => {
      res.redirect("/course/all");
    })
    .catch((err) => {
      console.log(err);
      res.send(err.errors.map((el) => el.message));
    })
  }

  static addNewCategory(req, res) {
    res.render("add_new_category", {})
  }

  static renderAddNewCategory(req, res) {
    res.send("add new category adminv");
  }

  static editCategory(req, res) {
    res.send("edit category admin");
  }

  static renderEditCategory(req, res) {
    res.send("edit category admin");
  }

//   static seeAllCourse(req,res){
//     Course.findAll()
//     .then(course => {
//     res.send(course)
//     })
//     .catch((err) => res.send(err))
// }

static allCategories(req,res){
  Category.findAll()
  .then(category => {
  res.render('categories')
  })
  .catch((err) => res.send(err))
}

static editCategories(req,res){
  res.render('edit_category')
}

static addCategories(req,res){
  res.render('add_new_category')
}


  static contactUs(req, res) {
    res.render("contact-us");
  }

  static pdfView (req, res, next) {
    const stream = res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment;filename=materi.pdf'
    });

    pdfService.buildPDF(
      (chunk) => stream.write(chunk),
      () => stream.end()
    )
  }

  
}

module.exports = Controller;
