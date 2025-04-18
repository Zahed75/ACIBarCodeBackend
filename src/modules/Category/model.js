const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create default Uncategorized category if it doesn't exist
categorySchema.statics.initializeDefaultCategory = async function() {
  const defaultCat = await this.findOne({ name: "Uncategorized" });
  if (!defaultCat) {
    await this.create({ name: "Uncategorized" });
  }
};

module.exports = mongoose.model('Category', categorySchema);