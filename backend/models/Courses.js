const mongoose = require("mongoose");

const Course = mongoose.Schema({
  courses: [
    {
      name: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("course", Course);
