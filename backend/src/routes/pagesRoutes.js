const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const homeController = require("../controllers/pagesController");

// helper for request validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


// simple health check
router.get("/health", (req, res) => res.json({ status: "ok", timestamp: Date.now() }));
router.get("/index", asyncHandler(homeController.getIndex));
router.get("/services", asyncHandler(homeController.getServices));
router.get("/projects", asyncHandler(homeController.getProjects));
router.get("/who-we-are", asyncHandler(homeController.getWhoWeAre));
router.get("/clients", asyncHandler(homeController.getClients));
router.get("/contact", asyncHandler(homeController.getContact));
router.post(
  "/contact",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("message").notEmpty().withMessage("Message cannot be empty"),
  ],
  validate,
  asyncHandler(homeController.postContact)
);

module.exports = router;