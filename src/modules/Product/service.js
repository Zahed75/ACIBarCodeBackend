const Product = require('../Product/model');

const { BadRequest, NotFound } = require('../../utility/errors');
const axios = require('axios');
const mongoose = require('mongoose');



const addProductByBarcode = async (barcode) => {
    try {
        const existingProduct = await Product.findOne({ barcode });
        if (existingProduct) {
            throw new BadRequest('Product with this barcode already exists');
        }

        const apiURL = `https://products-test-aci.onrender.com/product/${barcode}`;
        const { data } = await axios.get(apiURL);

        if (!data || !data.product) {
            throw new NotFound('Product not found in external API');
        }

        const newProduct = await Product.create({
            barcode: barcode,
            name: data.product.description || `Product ${barcode}`,
            category: "Uncategorized",
            details: data.product
        });

        return newProduct;
    } catch (error) {
        console.error('Error in addProductByBarcode service:', error);
        throw new Error('Failed to add product: ' + error.message);
    }
};

// ... rest of your service file remains the same ...




const getAllProducts = async (category) => {
    try {
        const filter = category ? { category } : {};
        const products = await Product.find(filter).sort({ createdAt: -1 });
        return products;
    } catch (error) {
        console.error('Error in getAllProducts service:', error);
        throw new Error('Failed to fetch products');
    }
};

const updateProductCategory = async (productId, newCategory) => {
    try {
        const product = await Product.findByIdAndUpdate(
            productId,
            { category: newCategory },
            { new: true }
        );

        if (!product) {
            throw new NotFound('Product not found');
        }

        return product;
    } catch (error) {
        console.error('Error in updateProductCategory service:', error);
        throw new Error('Failed to update product category');
    }
};

module.exports = {
    addProductByBarcode,
    getAllProducts,
    updateProductCategory
};