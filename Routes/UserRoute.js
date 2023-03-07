const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/User.Controller');
const authenticate = require('../middleware/authenticate');

router.get('/about', authenticate, UserController.aboutAUser);
router.get('/logout', authenticate, UserController.logoutUser);

module.exports = router;
