const express = require('express');
const router = express.Router();



const userRoute = require('../modules/User/controller');
const productRoute = require('../modules/Product/controller');
const categoryRoute = require('../modules/Category/controller');

// Endpoints

router.use('/user', userRoute);
router.use('/products', productRoute);
router.use('/category', categoryRoute); // Category route doesn't need auth middleware

module.exports = router;
