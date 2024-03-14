// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {

    await mongoose.connect('mongodb://127.0.0.1:27017/Plypicker', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });


    console.log('Connected to the local database');

  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
};

module.exports = connectDB;