const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../../utility/common');
const productService = require('./service');

const addProductByBarcodeHandler = asyncHandler(async (req, res) => {
    const { barcode } = req.params;
    const product = await productService.addProductByBarcode(barcode);
    res.status(200).json({
        message: "Product added successfully",
        product
    });
});

const getAllProductsHandler = asyncHandler(async (req, res) => {
    const { category } = req.query;
    const products = await productService.getAllProducts(category);
    res.status(200).json({
        success: true,
        data: products
    });
});

const updateProductCategoryHandler = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { category } = req.body;
    const product = await productService.updateProductCategory(id, category);
    res.status(200).json({
        message: "Product category updated successfully",
        product
    });
});

router.post('/barcode/:barcode', addProductByBarcodeHandler);
router.get('/getAllProducts', getAllProductsHandler);
router.patch('/:id/category', updateProductCategoryHandler);

module.exports = router;