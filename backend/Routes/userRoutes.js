const express = require("express");
const { registerUser, loginUser, fetchUserDetails } = require("../Controllers/userController");

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', fetchUserDetails);

module.exports(router);