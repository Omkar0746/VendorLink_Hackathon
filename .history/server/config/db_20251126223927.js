const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("your-mongo-uri-here");
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
