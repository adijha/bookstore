const mongoose = require("mongoose");


//* URI : Uniform Resource Identifier
const URI = "mongodb://127.0.0.1:27017/mernBookStore";
//? database name : [mernBookStore]

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("database connection failed");
        process.exit(0);
        // if database is failed then, pyar se bahar (exit) nikal jayein
    }
}


module.exports = connectDB;