const Registration = require("../model/registrationModel");

// POST - Create new registration
const createRegistration = async (req, res) => {
  try {
    const {
      fullName,
      email,
      whatsappNumber,
      studyRiseAcademy,
      gender,
      highestEducation,
      mernStackExperience,
      hasLaptop,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !whatsappNumber ||
      studyRiseAcademy === undefined ||
      !gender ||
      !highestEducation ||
      !mernStackExperience ||
      hasLaptop === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existing = await Registration.findOne({ email: email.toLowerCase() });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a registration with this email",
      });
    }

    const registration = new Registration({
      fullName,
      email: email.toLowerCase(),
      whatsappNumber,
      studyRiseAcademy,
      gender,
      highestEducation,
      mernStackExperience,
      hasLaptop,
    });

    const saved = await registration.save();

    res.status(201).json({
      success: true,
      message: "Registration submitted successfully",
      data: saved,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating registration",
      error: error.message,
    });
  }
};

// GET - Get all registrations with filters
const getAllRegistrations = async (req, res) => {
  try {
    const {
      search,
      gender,
      highestEducation,
      mernStackExperience,
      hasLaptop,
      studyRiseAcademy,
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { whatsappNumber: { $regex: search, $options: "i" } },
      ];
    }

    if (gender) {
      query.gender = gender;
    }

    if (highestEducation) {
      query.highestEducation = highestEducation;
    }

    if (mernStackExperience) {
      query.mernStackExperience = mernStackExperience;
    }

    if (hasLaptop === "true" || hasLaptop === "false") {
      query.hasLaptop = hasLaptop === "true";
    }

    if (studyRiseAcademy === "true" || studyRiseAcademy === "false") {
      query.studyRiseAcademy = studyRiseAcademy === "true";
    }

    const registrations = await Registration.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching registrations",
      error: error.message,
    });
  }
};

// GET - Single registration
const getRegistrationById = async (req, res) => {
  try {
    const { id } = req.params;
    const registration = await Registration.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching registration",
      error: error.message,
    });
  }
};

// DELETE - Registration
const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Registration.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Registration deleted successfully",
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting registration",
      error: error.message,
    });
  }
};

module.exports = {
  createRegistration,
  getAllRegistrations,
  getRegistrationById,
  deleteRegistration,
};

