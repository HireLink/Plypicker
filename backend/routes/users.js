const express = require('express');
const router = express.Router();
const Sign = require("../controller/SignLoginController");
const { fetchAndSaveProducts, AdminUpdateProduct,MemberUpdateProduct, getReviewedProduct } = require('../controller/ProductController');
const { getUserData } = require('../controller/UserController');

router.post('/api/auth/login', Sign.loginUser);

router.post('/api/auth/signup', Sign.signupUser);

router.get('/fetch-and-save-products', fetchAndSaveProducts);

router.post('/updateproduct', AdminUpdateProduct);

router.post('/memberupdateproduct', MemberUpdateProduct);

router.get('/api/getuserdata', getUserData)

router.get('/api/reviewedproduct', getReviewedProduct)


module.exports = router;