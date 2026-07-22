const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  order: {
    type: Number,
    required: true,
  },
});

const VersionSchema = new mongoose.Schema({
  version: {
    type: String,
    required: true,
  },

  releaseDate: {
    type: Date,
    default: Date.now,
  },

  sections: [SectionSchema],
});

const StandardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
      required: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    published: {
      type: Boolean,
      default: true,
    },

    versions: [VersionSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Standard", StandardSchema);