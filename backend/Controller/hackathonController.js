const Hackathon = require("../model/hackathonModel");

// POST - Create new hackathon
const createHackathon = async (req, res) => {
  try {
    const { title, description, date, location, details, images } = req.body;

    if (!title || !description || !date || !location || !details) {
      return res.status(400).json({
        success: false,
        message: "title, description, date, location and details are required",
      });
    }

    let imagesArray = images;

    // Allow frontend to send images as array or as string with line breaks/commas
    if (typeof images === "string") {
      imagesArray = images
        .split(/[,\n]/)
        .map((v) => v.trim())
        .filter(Boolean);
    }

    const newHackathon = new Hackathon({
      title,
      description,
      date,
      location,
      details,
      images: imagesArray,
    });

    const savedHackathon = await newHackathon.save();

    res.status(201).json({
      success: true,
      message: "Hackathon created successfully",
      data: savedHackathon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating hackathon",
      error: error.message,
    });
  }
};

// GET - Get all hackathons
const getAllHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: hackathons.length,
      data: hackathons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching hackathons",
      error: error.message,
    });
  }
};

// GET - Get single hackathon by ID
const getHackathonById = async (req, res) => {
  try {
    const { id } = req.params;

    const hackathon = await Hackathon.findById(id);

    if (!hackathon) {
      return res.status(404).json({
        success: false,
        message: "Hackathon not found",
      });
    }

    res.status(200).json({
      success: true,
      data: hackathon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching hackathon",
      error: error.message,
    });
  }
};

// PUT - Update hackathon by ID
const updateHackathon = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (typeof updateData.images === "string") {
      updateData.images = updateData.images
        .split(/[,\n]/)
        .map((v) => v.trim())
        .filter(Boolean);
    }

    const updatedHackathon = await Hackathon.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedHackathon) {
      return res.status(404).json({
        success: false,
        message: "Hackathon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hackathon updated successfully",
      data: updatedHackathon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating hackathon",
      error: error.message,
    });
  }
};

// DELETE - Delete hackathon by ID
const deleteHackathon = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHackathon = await Hackathon.findByIdAndDelete(id);

    if (!deletedHackathon) {
      return res.status(404).json({
        success: false,
        message: "Hackathon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hackathon deleted successfully",
      data: deletedHackathon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting hackathon",
      error: error.message,
    });
  }
};

module.exports = {
  createHackathon,
  getAllHackathons,
  getHackathonById,
  updateHackathon,
  deleteHackathon,
};

