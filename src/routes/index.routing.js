const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const emailController = require('../controller/emailController');
const authController = require('../controller/authController');
const personController = require('../controller/personController');
router.get("/", function (req, res) {
    res.json({ message: 'server is running!' });
});

//Email
router.get('/sendConfirmEmail', authMiddleware, emailController.sendConfirmEmail);
router.get('/confirmEmail', authMiddleware, emailController.confirmEmail);



//Auth
router.post('/register', authController.register);
router.post('/authenticate', authController.authenticate)

//Register
router.post('/registerPerson', personController.registerPerson)
module.exports = router;