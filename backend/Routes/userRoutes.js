const express = require("express");
const { registerUser, loginUser, fetchUserDetails, editUserDetails, deleteUser } = require("../Controllers/userController");
const { authenticate } = require("../Middleware/authMiddleware");

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', fetchUserDetails);
router.put('/:id', authenticate, editUserDetails);
router.delete('/:id', authenticate, deleteUser);

module.exports = router;