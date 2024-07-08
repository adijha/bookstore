const User = require('../model/userSchema')
const jwt = require('jsonwebtoken')

const home = async (req, resp) => {
	try {
		resp.status(200).json('<h1>Hello World!</h1>')
	} catch (error) {
		console.log(error)
	}
}

const register = async (req, resp) => {
	try {
		const { name, email, password } = req.body

		const userExist = await User.findOne({ email })

		if (userExist) {
			resp.status(400).json({ message: 'User already exists' })
			return
		}

		const userCreated = await User.create({ name, email, password })

		resp.status(201).json({
			msg: userCreated,
		})
	} catch (error) {
		resp.status(400).json({ msg: error })
	}
}

const login = async (req, resp) => {
	try {
		const { email, password } = req.body

		const userExist = await User.findOne({ email })

		if (!userExist) {
			return resp.status(400).json({ message: 'Invalid Credentials' })
		}

		const isPasswordValid = await userExist.comparePassword(password)

		if (isPasswordValid) {
			const token = jwt.sign(
				{ id: userExist._id },
				process.env.JWT_SECRET_KEY,
				{ expiresIn: '1h' }
			)

			resp.status(200).json({
				message: 'Login successful',
				token: token,
				userId: userExist._id.toString(),
			})
		} else {
			resp.status(401).json({ message: 'Invalid email or password' })
		}
	} catch (error) {
		console.error('Login error:', error)
		resp.status(500).json({ message: 'Internal server error' })
	}
}

const getMyBooks = async (req, res) => {
	console.log('iiii')
	try {
		const userId = req.user.id

		const user = await User.findById(userId).populate('myBooks')

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		res.status(200).json(user.myBooks)
	} catch (error) {
		res.status(500).json({ message: "Error fetching user's books" })
	}
}

module.exports = { home, register, login, getMyBooks }
