const express = require("express");
const router = express.Router();
const {
  createRegistration,
  getAllRegistrations,
  getRegistrationById,
  deleteRegistration,
} = require("../Controller/registrationController");

// Public endpoint - create registration
router.post("/hackathon-registrations", createRegistration);

// Admin endpoints
router.get("/hackathon-registrations", getAllRegistrations);
router.get("/hackathon-registrations/:id", getRegistrationById);
router.delete("/hackathon-registrations/:id", deleteRegistration);

module.exports = router;

