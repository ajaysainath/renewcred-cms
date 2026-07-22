const Standard = require("../models/Standard");

const createStandard = async (req, res) => {
  try {
    const { title, slug, shortDescription, published } = req.body;

    const existing = await Standard.findOne({ slug });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "A standard with this slug already exists",
      });
    }

    const standard = await Standard.create({
      title,
      slug,
      shortDescription,
      published,
      versions: [],
    });

    res.status(201).json({
      success: true,
      message: "Standard created successfully",
      data: standard,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const updateStandard = async (req, res) => {
  try {

    const { id } = req.params;

    const { title, slug, shortDescription, published } = req.body;

    const standard = await Standard.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        shortDescription,
        published,
      },
      {
        new: true,
      }
    );

    if (!standard) {
      return res.status(404).json({
        success: false,
        message: "Standard not found",
      });
    }

    res.status(200).json({
      success: true,
      data: standard,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
const deleteStandard = async (req, res) => {
  try {
    const { id } = req.params;

    const standard = await Standard.findByIdAndDelete(id);

    if (!standard) {
      return res.status(404).json({
        success: false,
        message: "Standard not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Standard deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getAllStandards = async (req, res) => {
  try {
    const standards = await Standard.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: standards.length,
      data: standards,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getStandardBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const standard = await Standard.findOne({ slug });

    if (!standard) {
      return res.status(404).json({
        success: false,
        message: "Standard not found",
      });
    }

    res.status(200).json({
      success: true,
      data: standard,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const addVersion = async (req, res) => {
  try {
    const { slug } = req.params;

    const { version, releaseDate } = req.body;

    const standard = await Standard.findOne({ slug });

    if (!standard) {
      return res.status(404).json({
        success: false,
        message: "Standard not found",
      });
    }

    standard.versions.push({
      version,
      releaseDate,
      sections: [],
    });

    await standard.save();

    res.status(201).json({
      success: true,
      message: "Version added successfully",
      data: standard,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const addSection = async (req, res) => {
  try {
    const { slug, versionId } = req.params;

    const { title, content, order } = req.body;

    const standard = await Standard.findOne({ slug });

    if (!standard) {
      return res.status(404).json({
        success: false,
        message: "Standard not found",
      });
    }

    const version = standard.versions.id(versionId);

    if (!version) {
      return res.status(404).json({
        success: false,
        message: "Version not found",
      });
    }

    version.sections.push({
      title,
      content,
      order,
    });

    await standard.save();

    res.status(201).json({
      success: true,
      message: "Section added successfully",
      data: standard,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getVersion = async (req, res) => {
  try {
    const { slug, versionId } = req.params;

    const standard = await Standard.findOne({ slug });

    if (!standard) {
      return res.status(404).json({
        success: false,
        message: "Standard not found",
      });
    }

    const version = standard.versions.id(versionId);

    if (!version) {
      return res.status(404).json({
        success: false,
        message: "Version not found",
      });
    }

    res.status(200).json({
      success: true,
      data: version,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getDashboardStats = async (req, res) => {
  try {

    const totalStandards = await Standard.countDocuments();

    const published = await Standard.countDocuments({
      published: true,
    });

    const drafts = await Standard.countDocuments({
      published: false,
    });

    const standards = await Standard.find();

    let versions = 0;

    standards.forEach((standard) => {
      versions += standard.versions.length;
    });

    res.status(200).json({
      success: true,
      data: {
        totalStandards,
        versions,
        published,
        drafts,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
const updateSection = async (req, res) => {
  try {
    const { slug, versionId, sectionId } = req.params;

    const { title, content, order } = req.body;

    const standard = await Standard.findOne({ slug });

    if (!standard) {
      return res.status(404).json({
        success: false,
        message: "Standard not found",
      });
    }

    const version = standard.versions.id(versionId);

    if (!version) {
      return res.status(404).json({
        success: false,
        message: "Version not found",
      });
    }

    const section = version.sections.id(sectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    section.title = title;
    section.content = content;
    section.order = order;

    await standard.save();

    res.json({
      success: true,
      message: "Section updated successfully",
      data: standard,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const deleteSection = async (req, res) => {
  try {
    const { slug, versionId, sectionId } = req.params;

    const standard = await Standard.findOne({ slug });

    if (!standard) {
      return res.status(404).json({
        success: false,
        message: "Standard not found",
      });
    }

    const version = standard.versions.id(versionId);

    if (!version) {
      return res.status(404).json({
        success: false,
        message: "Version not found",
      });
    }

    const section = version.sections.id(sectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    section.deleteOne();

    await standard.save();

    res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: standard,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
module.exports = {
  createStandard,
  getAllStandards,
  getStandardBySlug,
  addVersion,
  addSection,
  updateSection,
  getVersion,
  getDashboardStats,
  updateStandard,
  deleteStandard,
  deleteSection,
};