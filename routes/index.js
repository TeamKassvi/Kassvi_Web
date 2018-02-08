const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const emotionController = require('../controllers/emotionController');
// const reviewController = require('../controllers/reviewController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', siteController.getHomepage);
// router.get('/', catchErrors(storeController.getStores));
// router.get('/stores', catchErrors(storeController.getStores));
// router.get('/stores/page/:page', catchErrors(storeController.getStores));
// router.get('/add', authController.isLoggedIn, storeController.addStore);
//
// router.post('/add',
//   storeController.upload,
//   catchErrors(storeController.resize),
//   catchErrors(storeController.createStore)
// );
//
// router.post('/add/:id',
//   storeController.upload,
//   catchErrors(storeController.resize),
//   catchErrors(storeController.updateStore)
// );
//
// router.get('/stores/:id/edit', catchErrors(storeController.editStore));
// router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));
//
// router.get('/tags', catchErrors(storeController.getStoresByTag));
// router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/signup', userController.registerForm);
router.get('/analyser', emotionController.getAnalyser);
router.post('/analyser/uploadFileSubmit',
 emotionController.uploadFile, 
 emotionController.uploadFileSubmit);
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
// router.get('/map', storeController.mapPage);
// router.get('/hearts', authController.isLoggedIn, catchErrors(storeController.getHearts));
// router.post('/reviews/:id',
//   authController.isLoggedIn,
//   catchErrors(reviewController.addReview)
// );
//
// router.get('/top', catchErrors(storeController.getTopStores));

/*
  API
*/

// router.get('/api/search', catchErrors(storeController.searchStores));
// router.get('/api/stores/near', catchErrors(storeController.mapStores));
// router.post('/api/stores/:id/heart', catchErrors(storeController.heartStore));

module.exports = router;
