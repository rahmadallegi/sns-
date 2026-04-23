const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const { verifyAuth } = require("../middleware/authMiddleware");
const adminAuthController = require("../controllers/adminAuthController");
const adminController = require("../controllers/adminController");
const adminContactController = require("../controllers/adminContactController");
const upload = require("../middleware/upload");

// ========== AUTH ROUTES (No auth required) ==========
router.post("/auth/register", asyncHandler(adminAuthController.register));
router.post("/auth/login", asyncHandler(adminAuthController.login));
router.get("/auth/verify", asyncHandler(adminAuthController.verifyToken));

// ========== PROTECTED ROUTES (Auth required) ==========

// About Cards
router.get("/about-cards", verifyAuth, asyncHandler(adminController.getAboutCards));
router.post("/about-cards", verifyAuth, asyncHandler(adminController.createAboutCard));
router.put("/about-cards/:id", verifyAuth, asyncHandler(adminController.updateAboutCard));
router.delete("/about-cards/:id", verifyAuth, asyncHandler(adminController.deleteAboutCard));

// Services
router.get("/services", verifyAuth, asyncHandler(adminController.getServices));
router.post("/services", verifyAuth, asyncHandler(adminController.createService));
router.put("/services/:id", verifyAuth, asyncHandler(adminController.updateService));
router.delete("/services/:id", verifyAuth, asyncHandler(adminController.deleteService));

// Service Features
router.post("/service-features", verifyAuth, asyncHandler(adminController.createServiceFeature));
router.delete("/service-features/:id", verifyAuth, asyncHandler(adminController.deleteServiceFeature));

// Projects
router.get("/projects", verifyAuth, asyncHandler(adminController.getProjects));
router.post("/projects", verifyAuth, asyncHandler(adminController.createProject));
router.put("/projects/:id", verifyAuth, asyncHandler(adminController.updateProject));
router.delete("/projects/:id", verifyAuth, asyncHandler(adminController.deleteProject));

// Clients
router.get("/clients", verifyAuth, asyncHandler(adminController.getClients));
router.post("/clients", verifyAuth, asyncHandler(adminController.createClient));
router.put("/clients/:id", verifyAuth, asyncHandler(adminController.updateClient));
router.delete("/clients/:id", verifyAuth, asyncHandler(adminController.deleteClient));
router.post(
  "/clients/upload-logo",
  verifyAuth,
  upload.single("logo"),
  asyncHandler(adminController.uploadClientLogo)
);

// Contact Info (Head Office)
router.get("/contact", verifyAuth, asyncHandler(adminController.getContact));
router.put("/contact", verifyAuth, asyncHandler(adminController.updateContact));


// Contact messages (form submissions)
router.get("/contact-messages", verifyAuth, asyncHandler(adminContactController.getContactMessages));
router.patch("/contact-messages/:id", verifyAuth, asyncHandler(adminContactController.updateContactMessageStatus));
router.delete("/contact-messages/:id", verifyAuth, asyncHandler(adminContactController.deleteContactMessage));

module.exports = router;
