const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const emailController = require('../controller/emailController');
const authController = require('../controller/authController');
const registerController = require('../controller/Register/registerController');
const addressController = require('../controller/Address/addressController');
const pixController = require('../controller/Donations/pixController');
const accountController = require('../controller/Donations/accountController');
router.get("/", function (req, res) {
    res.json({ message: 'server is running!' });
});

//Email
router.get('/sendConfirmEmail', authMiddleware, emailController.sendConfirmEmail);
router.get('/confirmEmail', authMiddleware, emailController.confirmEmail);

//Auth
router.post('/register', authController.register);
router.post('/authenticate', authController.authenticate);

//Register User/Association
router.post('/registerPerson', registerController.registerPerson);
router.post('/registerAssociation', registerController.registerAssociation);
module.exports = router;

//Donations
router.post('/registerPixDonation', pixController.registerPix);
router.get('/returnPixDonation/:id', pixController.getPixKeys);
router.post('/registerAccountDonation', accountController.registerAccount);
router.get('/returnAccountDonation/:id', accountController.getAccounts);

//Address
router.post('/registerAddress', addressController.registerAddress);
router.get('/getAddressByIdAndType/:id/:type', addressController.getAddressByIdAndType);