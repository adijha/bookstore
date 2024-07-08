const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }
});



userSchema.pre("save", async function (next) {
    //console.log(this);  //show  all data of this user before save it to db
    const user = this;

    if (!user.isModified("password")) { // if password is not modified
        return next();
    }

    //else
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);
        user.password = hashPassword;
    } catch (error) {
        next(error)
    }
})


//? Compare the password
//[compare : login password and register password]
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}


// JWT Logic
//* return means : after run this methods return to authControllers.js and assign to token.
//? Instance method
//* payload means : write what your the user identities
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d"  // 30days
            }
        );

    } catch (error) {
        console.log(error);
    }
}


// define the model or the collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;