const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/authController');


router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
