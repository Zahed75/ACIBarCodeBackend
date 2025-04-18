
const mongoose = require('mongoose');


if (mongoose.models.Product) {
    module.exports = mongoose.model('Product');
} else {
    const productSchema = new mongoose.Schema({
        barcode: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            default: "Uncategorized"
        },
        details: {
            type: Object
        }
    }, { timestamps: true });

    module.exports = mongoose.model('Product', productSchema);
}