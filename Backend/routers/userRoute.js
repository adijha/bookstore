const express = require("express");
const router = express.Router();

// Controllers path
const userControllers = require("../controllers/userControllers");
const booksControllers = require("../controllers/booksController");

// Validator path
const userSchemaVal = require("../validator/userSchemaVal");
const loginSchemaVal = require("../validator/userLoginVal");

// Middleware path
const validate = require("../middleware/validateMiddleware");
const authMiddleware = require("../middleware/authMiddleware");




// home page
router.route("/books").get(booksControllers.getAllBooks);
router.route("/cart/add").post(authMiddleware, booksControllers.addToCart);



// register page
router
    .route("/register").
    post(validate(userSchemaVal), userControllers.register);

// login page
router.route("/login").post(validate(loginSchemaVal), userControllers.login);

// get Course data
router.route("/course").get(userControllers.CourseData);


module.exports = router;
