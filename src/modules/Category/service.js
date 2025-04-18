const Category = require('./model');
const Product = require('../product/model');
const { BadRequest, NotFound } = require('../../utility/errors');
const mongoose = require('mongoose');

const createCategory = async (name) => {
    try {
        if (!name) {
            throw new BadRequest('Category name is required');
        }

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            throw new BadRequest('Category already exists');
        }

        const newCategory = await Category.create({ name });
        return newCategory;
    } catch (error) {
        console.error('Error in createCategory service:', error);
        throw new Error('Failed to create category');
    }
};

const getAllCategories = async () => {
    try {
        const categories = await Category.find().sort({ name: 1 });

        const categoriesWithCounts = await Promise.all(
            categories.map(async (category) => {
                const productCount = await Product.countDocuments({ category: category.name });
                return {
                    ...category._doc,
                    productCount
                };
            })
        );

        return categoriesWithCounts;
    } catch (error) {
        console.error('Error in getAllCategories service:', error);
        throw new Error('Failed to fetch categories');
    }
};

const deleteCategory = async (categoryId) => {
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new NotFound('Category not found');
        }

        if (category.name === "Uncategorized") {
            throw new BadRequest('Cannot delete default Uncategorized category');
        }

        await Product.updateMany(
            { category: category.name },
            { $set: { category: "Uncategorized" } }
        );

        await Category.findByIdAndDelete(categoryId);
        return { message: 'Category deleted successfully' };
    } catch (error) {
        console.error('Error in deleteCategory service:', error);
        throw new Error('Failed to delete category');
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    deleteCategory
};