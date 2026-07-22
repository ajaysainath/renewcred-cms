const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  createStandard,
  updateStandard,
  deleteStandard,
  getAllStandards,
  getStandardBySlug,
  addVersion,
  addSection,
  updateSection,
  deleteSection,
  getVersion,
  getDashboardStats,
} = require("../controllers/standards.controller");

router.get("/dashboard/stats", getDashboardStats);

router.get("/:slug", getStandardBySlug);

router.get("/:slug/version/:versionId", getVersion);

router.put("/:id", authMiddleware, updateStandard);

router.delete("/:id", authMiddleware, deleteStandard);

router.post("/:slug/version", authMiddleware, addVersion);

router.post(
  "/:slug/version/:versionId/section",
  authMiddleware,
  addSection
);

router.put(
  "/:slug/version/:versionId/section/:sectionId",
  authMiddleware,
  updateSection
);

router.delete(
  "/:slug/version/:versionId/section/:sectionId",
  authMiddleware,
  deleteSection
);

router.get("/", getAllStandards);

router.post("/", authMiddleware, createStandard);

module.exports = router;