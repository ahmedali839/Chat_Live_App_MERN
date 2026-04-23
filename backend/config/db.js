const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongooseURI = process.env.MONGODB_URI || "";
    const conn = await mongoose.connect(mongooseURI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB sucessfully connected ${conn.connection}`);
  } catch (error) {
    console.error(`Your MongoDB connection Failed: ${error}`);
    process.exit(1);
  }
};
module.exports = connectDB;
