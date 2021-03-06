const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const emailController = require('../controller/emailController');
const authController = require('../controller/authController');
const registerController = require('../controller/Register/registerController');
const addressController = require('../controller/Address/addressController');
const postController = require('../controller/posts/postController');
const pixController = require('../controller/Donations/pixController');
const accountController = require('../controller/Donations/accountController');
const favoriteAssociationController = require('../controller/favoriteAssociationController');
router.get("/", function(req, res) {
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
router.post('/removeRegister/:id/:type', authController.removeRegister);

//Register User/Association
router.post('/registerPerson', registerController.registerPerson);
router.post('/registerAssociation', registerController.registerAssociation);
router.get('/findAssociationByState/:state', registerController.findAssociationByState);
router.get('/findUserById/:id', registerController.findUserById);
router.get('/findAssociationById/:id', registerController.findAssociationById);
router.put('/updateAssociation', registerController.updateAccountAssociation);
router.put('/updatePerson', registerController.updateAccountPerson);

//Donations
router.post('/registerPixDonation', authMiddleware, pixController.registerPix);
router.get('/returnPixDonation/:id', authMiddleware, pixController.getPixKeys);
router.put('/updatePixDonation', authMiddleware, pixController.updatePixKeys);
router.post('/registerAccountDonation', authMiddleware, accountController.registerAccount);
router.get('/returnAccountDonation/:id', authMiddleware, accountController.getAccounts);
router.get('/returnAccountDonationById/:id', authMiddleware, accountController.getAccountById);
router.put('/updateAccountDonation', authMiddleware, accountController.updateAccount);
router.delete('/removeAccount', authMiddleware, accountController.removeAccount);


//Address
router.post('/registerAddress', addressController.registerAddress);
router.get('/getAddressByIdAndType/:id/:type', authMiddleware, addressController.getAddressByIdAndType);
router.get('/removeAddress/:id/:type', authMiddleware, addressController.removeAddress);
router.put('/updateAdderss', authMiddleware, addressController.updateUserAddress);


//Postagem 
router.post('/createPost', authMiddleware, postController.createPost);
router.get('/posts', authMiddleware, postController.listPost);
router.get('/listPostByAssociation/:id', authMiddleware, postController.listPostByAssociation);
router.get('/listPostById/:id', authMiddleware, postController.listPostById);
router.post('/favoriteAssociation', authMiddleware, favoriteAssociationController.favoriteAssociations);
router.delete('/desfavoriteAssociation/:id_association', favoriteAssociationController.desfavoriteAssociation);
router.get('/returnFavoriteAssociations/:id_user', authMiddleware, favoriteAssociationController.returnFavoriteAssociations);
router.post('/removePost', authMiddleware, postController.removePost);


module.exports = router;