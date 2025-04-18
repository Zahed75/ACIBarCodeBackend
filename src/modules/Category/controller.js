const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../../utility/common');
const categoryService = require('./service');

const createCategoryHandler = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const category = await categoryService.createCategory(name);
    res.status(200).json({
        message: "Category created successfully",
        category
    });
});

const getAllCategoriesHandler = asyncHandler(async (req, res) => {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({
        success: true,
        data: categories
    });
});

const deleteCategoryHandler = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await categoryService.deleteCategory(id);
    res.status(200).json({
        success: true,
        data: result
    });
});

router.post('/create', createCategoryHandler);
router.get('/getAll', getAllCategoriesHandler);
router.delete('/delete/:id', deleteCategoryHandler);

module.exports = router;