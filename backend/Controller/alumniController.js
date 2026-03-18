const fs = require("fs");
const path = require("path");
const Alumni = require("../model/alumniModel");

const uploadsRoot = path.join(__dirname, "..", "uploads");

const removeUploadedFile = (imagePath) => {
  if (!imagePath || !imagePath.startsWith("/uploads/")) {
    return;
  }

  const normalizedPath = imagePath.replace(/^\/+/, "");
  const absolutePath = path.join(__dirname, "..", normalizedPath);

  if (absolutePath.startsWith(uploadsRoot) && fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
};

const buildImagePath = (file) => {
  return file ? `/uploads/alumni/${file.filename}` : "";
};

const createAlumni = async (req, res) => {
  try {
    const { name, role, course } = req.body;

    if (!name || !role || !course) {
      if (req.file) {
        removeUploadedFile(buildImagePath(req.file));
      }

      return res.status(400).json({
        success: false,
        message: "name, role, and course are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const alumni = new Alumni({
      name,
      role,
      course,
      image: buildImagePath(req.file),
    });

    const savedAlumni = await alumni.save();

    res.status(201).json({
      success: true,
      message: "Alumni created successfully",
      data: savedAlumni,
    });
  } catch (error) {
    if (req.file) {
      removeUploadedFile(buildImagePath(req.file));
    }

    res.status(500).json({
      success: false,
      message: "Error creating alumni",
      error: error.message,
    });
  }
};

const getAllAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: alumni.length,
      data: alumni,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching alumni",
      error: error.message,
    });
  }
};

const getAlumniById = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: "Alumni not found",
      });
    }

    res.status(200).json({
      success: true,
      data: alumni,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching alumni",
      error: error.message,
    });
  }
};

const updateAlumni = async (req, res) => {
  try {
    const { name, role, course } = req.body;

    if (!name || !role || !course) {
      if (req.file) {
        removeUploadedFile(buildImagePath(req.file));
      }

      return res.status(400).json({
        success: false,
        message: "name, role, and course are required",
      });
    }

    const existingAlumni = await Alumni.findById(req.params.id);

    if (!existingAlumni) {
      if (req.file) {
        removeUploadedFile(buildImagePath(req.file));
      }

      return res.status(404).json({
        success: false,
        message: "Alumni not found",
      });
    }

    const previousImage = existingAlumni.image;
    const nextImagePath = req.file
      ? buildImagePath(req.file)
      : existingAlumni.image;

    existingAlumni.name = name;
    existingAlumni.role = role;
    existingAlumni.course = course;
    existingAlumni.image = nextImagePath;

    const updatedAlumni = await existingAlumni.save();

    if (req.file && previousImage !== nextImagePath) {
      removeUploadedFile(previousImage);
    }

    res.status(200).json({
      success: true,
      message: "Alumni updated successfully",
      data: updatedAlumni,
    });
  } catch (error) {
    if (req.file) {
      removeUploadedFile(buildImagePath(req.file));
    }

    res.status(500).json({
      success: false,
      message: "Error updating alumni",
      error: error.message,
    });
  }
};

const deleteAlumni = async (req, res) => {
  try {
    const deletedAlumni = await Alumni.findByIdAndDelete(req.params.id);

    if (!deletedAlumni) {
      return res.status(404).json({
        success: false,
        message: "Alumni not found",
      });
    }

    removeUploadedFile(deletedAlumni.image);

    res.status(200).json({
      success: true,
      message: "Alumni deleted successfully",
      data: deletedAlumni,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting alumni",
      error: error.message,
    });
  }
};

module.exports = {
  createAlumni,
  getAllAlumni,
  getAlumniById,
  updateAlumni,
  deleteAlumni,
};
