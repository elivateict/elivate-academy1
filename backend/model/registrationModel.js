const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    whatsappNumber: {
      type: String,
      required: true,
      trim: true,
    },
    studyRiseAcademy: {
      type: Boolean,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    highestEducation: {
      type: String,
      enum: ["Primary school", "Secondary school", "Degree", "Master"],
      required: true,
    },
    mernStackExperience: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    hasLaptop: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;

