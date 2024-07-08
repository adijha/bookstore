const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const Course = require("../model/courses");

// Home Page Logic

const home = async (req, resp) => {
    try {
        resp.status(200).json("<h1>Hello World!</h1>");

    } catch (error) {
        console.log(error);
    }
}
// End : Home

// Register Page Logic
const register = async (req, resp) => {
    try {

        // destructuring
        const { name, email, password } = req.body;

        // if email already exits
        const userExist = await User.findOne({ email });


        // if
        if (userExist) {
            resp.status(400).json({ message: "User already exists" });
            return;
        }

        //else
        const userCreated = await User.create({ name, email, password });

        resp.status(201).json({
            msg: userCreated, // or msg; "register successfully"
        });

    } catch (error) {
        resp.status(400).json({ msg: error });
    }
}

// End  : Register 


// Login Logic

const login = async (req, resp) => {
    try {

        const { email, password } = req.body;

        // match login email and register email
        const userExist = await User.findOne({ email });
        // console.log(userExist) : if true, show all information of that data

        if (!userExist) {
            return resp.status(400).json({ message: "Invalid Credentials" });

        }

        // else 
        //* login password is passed
        const user = await userExist.comparePassword(password);

        if (user) {

            resp.status(200).json({
                msg: "Login successfully",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()
            });
        } else {
            resp.status(401).json({ message: "Invalid email or password" })
        }

    } catch (error) {
        resp.status(500).json(error);
        console.log(error);
    }
}
// End : Login Logic

// Course 


const CourseData = async (req, resp) => {
    try {
        const response = await Course.find();
        if (!response) {
            //Handle the case where no document was found
            resp.status(404).send({ msg: "No Course were found" });
        }

        resp.status(200).send(response);
    } catch (error) {
        console.log("Course Error: ", error);
    }
}






module.exports = { home, register, login, CourseData };