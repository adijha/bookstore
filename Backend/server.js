require("dotenv").config();  // write when dotenv  is installed
const express = require("express");
const cors = require('cors');
const port = 9000;
const app = express();

const useRouter = require("./routers/userRoute")

const connectDB = require("./utils/db");
const errorMiddleware = require("./middleware/errorMiddleware");

// middleware
app.use(express.json());

// tackle cors

const corsOption = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
};

app.use(cors(corsOption));

// End: tackle cors

app.use("/api/v1/bookstore", useRouter);


app.use(errorMiddleware);

// If database connected successfully THEN run "app.listen"
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port: ${port}`);
    });
});