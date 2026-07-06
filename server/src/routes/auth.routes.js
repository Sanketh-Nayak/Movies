const express = require('express');
const { register, login, getMe } = require('../controllers/auth.controller');
const protect = require('../middleware/auth.middleware');
const { registerValidation, loginValidation } = require('../utils/validators');

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);

module.exports = router;
