const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const emailController = require('../controller/emailController');

router.get("/", function (req, res) {
    res.json({ message: 'server is running!' });
});


router.get('/confirmEmail',authMiddleware, emailController.sendConfirmEmail);

module.exports = router;