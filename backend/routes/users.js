const express = require('express');
const router = express.Router();
const Sign = require("../controller/SignLoginController");
const { fetchAndSaveProducts, getRequestCount, AdminUpdateProduct, MemberUpdateProduct, getReviewedProduct, AdminUpdateReviewProduct, deleteProduct } = require('../controller/ProductController');
const { getUserTypeData, getUserStatusData, updateuserstatus } = require('../controller/UserController');


router.post('/api/auth/login', Sign.loginUser);

router.post('/api/auth/signup', Sign.signupUser);

router.get('/fetch-and-save-products', fetchAndSaveProducts);

router.post('/updateproduct', AdminUpdateProduct);

router.post('/updatereviewproduct', AdminUpdateReviewProduct);

router.post('/memberupdateproduct', MemberUpdateProduct);

router.get('/api/getuserdata', getUserTypeData)

router.get('/api/reviewedproduct', getReviewedProduct)

router.get('/api/requestcount', getRequestCount)

router.get('/api/userdata', getUserStatusData)

router.post('/api/updateuserstatus', updateuserstatus)

router.delete('/deleteproduct', deleteProduct)

module.exports = router;