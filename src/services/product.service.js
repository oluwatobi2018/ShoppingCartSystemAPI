const Product = require('../models/product.model');

// Get all products
const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error('Failed to fetch products: ' + error.message);
  }
};

// Get a single product by its ID
const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error('Failed to fetch product: ' + error.message);
  }
};

// Add a new product to the inventory
const addProduct = async (productData) => {
  try {
    const product = new Product(productData);
    await product.save();
    return product;
  } catch (error) {
    throw new Error('Failed to add product: ' + error.message);
  }
};

// Update product details
const updateProduct = async (productId, productData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
    if (!updatedProduct) {
      throw new Error('Product not found');
    }
    return updatedProduct;
  } catch (error) {
    throw new Error('Failed to update product: ' + error.message);
  }
};

// Update product stock (e.g., for checkout or inventory management)
const updateProductStock = async (productId, quantity) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    
    // Update stock and save the product
    if (product.stock < quantity) {
      throw new Error('Not enough stock available');
    }
    
    product.stock -= quantity;
    await product.save();
    
    return product;
  } catch (error) {
    throw new Error('Failed to update product stock: ' + error.message);
  }
};

// Restore stock (e.g., in case of checkout failure or inventory management)
const restoreProductStock = async (productId, quantity) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    
    // Restore stock and save the product
    product.stock += quantity;
    await product.save();
    
    return product;
  } catch (error) {
    throw new Error('Failed to restore product stock: ' + error.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  updateProductStock,
  restoreProductStock,
};
