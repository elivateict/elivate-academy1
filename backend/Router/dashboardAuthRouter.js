const express = require("express");
const {
  getDashboardAuthStatus,
  registerDashboardUser,
  loginDashboardUser,
} = require("../Controller/dashboardAuthController");

const router = express.Router();

router.get("/dashboard-auth/status", getDashboardAuthStatus);
router.post("/dashboard-auth/register", registerDashboardUser);
router.post("/dashboard-auth/login", loginDashboardUser);

module.exports = router;
