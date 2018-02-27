const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const emotionController = require('../controllers/emotionController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', siteController.getHomepage);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/signup', userController.registerForm);
router.get('/analyser', emotionController.getAnalyser);
router.post('/analyser/uploadFileSubmit',
   emotionController.uploadFile,
   emotionController.uploadFileSubmit);
// router.get('/recordandconvert', emotionController.getrecordandconvert);
router.post('/recordFileConvert',
  emotionController.uploadFile,
  emotionController.recordFileConvert);

// router.post('/analyser/uploadFileSubmit', emotionController.uploadFileSubmit);

// 1. Validate the registration data
// 2. register the user
// 3. we need to log them in
router.post('/signup',
  userController.validateRegister,
  userController.register,
  authController.login
);








router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update)
);

module.exports = router;
