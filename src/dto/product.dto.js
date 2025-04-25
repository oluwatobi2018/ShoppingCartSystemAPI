// Format a single product item
const formatProduct = (product) => ({
    productId: product._id,
    name: product.name,
    price: product.price,
    stock: product.stock,
    description: product.description || '',
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  });
  
  // Format product list (if you return multiple products)
  const formatProductList = (products) => {
    return products.map(formatProduct);
  };
  
  module.exports = {
    formatProduct,
    formatProductList,
  };
  