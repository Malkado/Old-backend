const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const emailController = require('../controller/emailController');
const authController = require('../controller/authController');
const registerController = require('../controller/registerController');
const addressController = require('../controller/Address/addressController');
const postController = require('../controller/posts/postController');
const pixController = require('../controller/Donations/pixController');
const accountController = require('../controller/Donations/accountController');
router.get("/", function (req, res) {
    res.json({ message: 'server is running!' });
});

//Email
router.get('/sendConfirmEmail', authMiddleware, emailController.sendConfirmEmail);
router.get('/confirmEmail', authMiddleware, emailController.confirmEmail);
//Forgot Password
router.get('/forgotPassword', authMiddleware, emailController.forgotPassword);
router.get('/confirmPassword', authMiddleware, emailController.confirmPassword);
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
// router.get('/getAddressByIdAndType/:id/:type', addressController.);
router.put('/updateAdderss', authMiddleware, addressController.updateUserAddress);


//Postagem 
router.post('/createPost', authMiddleware, postController.createPost);
router.post('/posts', authMiddleware, postController.listPost);
router.post('/removePost', authMiddleware, postController.removePost);


module.exports = router;
