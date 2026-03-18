const crypto = require("crypto");
const DashboardUser = require("../model/dashboardUserModel");

const hashPassword = (password, salt) =>
  crypto.scryptSync(password, salt, 64).toString("hex");

const createPasswordRecord = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = hashPassword(password, salt);

  return {
    salt,
    hash,
  };
};

const sanitizeUser = (user) => ({
  id: user._id,
  fullName: user.fullName,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const getDashboardAuthStatus = async (req, res) => {
  try {
    const count = await DashboardUser.countDocuments();

    return res.status(200).json({
      success: true,
      hasUsers: count > 0,
      count,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error checking dashboard auth status.",
      error: error.message,
    });
  }
};

const registerDashboardUser = async (req, res) => {
  try {
    const fullName = req.body?.fullName?.trim();
    const email = req.body?.email?.trim().toLowerCase();
    const password = req.body?.password?.trim();

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const existingUser = await DashboardUser.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "This dashboard email is already registered.",
      });
    }

    const { salt, hash } = createPasswordRecord(password);

    const user = await DashboardUser.create({
      fullName,
      email,
      passwordHash: hash,
      passwordSalt: salt,
    });

    return res.status(201).json({
      success: true,
      message: "Dashboard account created successfully.",
      data: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating dashboard account.",
      error: error.message,
    });
  }
};

const loginDashboardUser = async (req, res) => {
  try {
    const email = req.body?.email?.trim().toLowerCase();
    const password = req.body?.password?.trim();

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await DashboardUser.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const attemptedHash = hashPassword(password, user.passwordSalt);

    if (attemptedHash !== user.passwordHash) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Dashboard login successful.",
      data: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error logging into dashboard.",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardAuthStatus,
  registerDashboardUser,
  loginDashboardUser,
};
