const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
// const emailController = require('../controller/emailController');
const authController = require('../controller/authController');
router.get("/", function (req, res) {
    res.json({ message: 'server is running!' });
});

//Email
// router.get('/confirmEmail', authMiddleware, emailController.sendConfirmEmail);



//Auth
router.post('/register', authController.register);
router.post('/authenticate',authController.authenticate)
module.exports = router;