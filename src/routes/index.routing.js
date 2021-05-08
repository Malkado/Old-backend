const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const emailController = require('../controller/emailController');
const authController = require('../controller/authController');
const registerController = require('../controller/registerController');
const addressController = require('../controller/addressController');
router.get("/", function (req, res) {
    res.json({ message: 'server is running!' });
});

//Email
router.get('/sendConfirmEmail', authMiddleware, emailController.sendConfirmEmail);
router.get('/confirmEmail', authMiddleware, emailController.confirmEmail);

//Auth
router.post('/register', authController.register);
router.post('/authenticate', authController.authenticate);

//Register
router.post('/registerPerson', registerController.registerPerson);
router.post('/registerAssociation', registerController.registerAssociation);
router.post('/registerAddress', addressController.registerAddress);
module.exports = router;