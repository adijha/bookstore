const express = require("express");
const router = express.Router();

// Controllers path
const userControllers = require("../controllers/userControllers");

// Validator path
const userSchemaVal = require("../validator/userSchemaVal");
const loginSchemaVal = require("../validator/userLoginVal");

// Middleware path
const validate = require("../middleware/validateMiddleware");



// home page
router.route("/").get(userControllers.home);

// register page
router
    .route("/register").
    post(validate(userSchemaVal), userControllers.register);

// login page
router.route("/login").post(validate(loginSchemaVal), userControllers.login);

// get Course data
router.route("/course").get(userControllers.CourseData);


module.exports = router;
