const express = require('express')
const router = express.Router()

// Controllers path
const userControllers = require('../controllers/userControllers')
const booksControllers = require('../controllers/booksController')

// Validator path
const userSchemaVal = require('../validator/userSchemaVal')
const loginSchemaVal = require('../validator/userLoginVal')

// Middleware path
const validate = require('../middleware/validateMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

// home page
router.route('/books').get(booksControllers.getAllBooks)
router.route('/cart/add').post(authMiddleware, booksControllers.addToCart)
router.route('/my-books').get(authMiddleware, userControllers.getMyBooks)

router.route('/cart').get(authMiddleware, booksControllers.getCartItems)

router
	.route('/cart/remove/:itemId')
	.delete(authMiddleware, booksControllers.removeFromCart)
router.route('/purchase').post(authMiddleware, booksControllers.purchase)

// register page
router
	.route('/register')
	.post(validate(userSchemaVal), userControllers.register)

// login page
router.route('/login').post(validate(loginSchemaVal), userControllers.login)

module.exports = router
