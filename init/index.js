const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing");
const MongoURI = "mongodb://127.0.0.1:27017/AirBnB";
main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MongoURI);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => {
      return { ...obj, owner: "6a08d4137117b2de74aaf263" }; // Replace with actual user ID
    });
    await Listing.insertMany(initData.data);
    console.log("Database initialized with sample data.");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};

initDB();
