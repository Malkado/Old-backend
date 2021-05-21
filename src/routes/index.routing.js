const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const emailController = require('../controller/emailController');
const authController = require('../controller/authController');
const registerController = require('../controller/registerController');
const addressController = require('../controller/addressController');
const postController = require('../controller/posts/postController');
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

//Register
router.post('/registerPerson', registerController.registerPerson);
router.post('/registerAssociation', registerController.registerAssociation);
router.post('/registerAddress', addressController.registerAddress);


//Postagem 
router.post('/createPost',authMiddleware, postController.createPost);
router.post('/posts',authMiddleware, postController.listPost);


module.exports = router;
