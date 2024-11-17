// src/config/db.js
const mongoose = require('mongoose');

const uri_local = process.env.DB_URL_LOCAL;
const uri_cloud = process.env.DB_URL_CLOUD;
 console.log({uri_local})
async function connectDB() {
  try {
    await mongoose.connect(uri_local);
    console.log("You successfully connected to MongoDB with Mongoose!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

module.exports = { connectDB };
