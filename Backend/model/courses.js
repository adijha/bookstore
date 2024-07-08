const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
});


const Course = new model("Storebook", courseSchema);

// *   Service : collection name
// First letter capital and singular form

module.exports = Course;