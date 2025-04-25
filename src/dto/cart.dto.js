// Format a single cart item
const formatCartItem = (item) => ({
    productId: item.productId._id || item.productId,
    name: item.productId.name || '',
    price: item.productId.price || 0,
    quantity: item.quantity,
    total: item.quantity * (item.productId.price || 0),
  });
  
  // Format entire cart for a user
  const formatCart = (cart) => {
    const items = cart.items.map(formatCartItem);
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce((sum, item) => sum + item.total, 0);
  
    return {
      userId: cart.userId,
      items,
      totalQuantity,
      totalAmount,
      updatedAt: cart.updatedAt,
    };
  };
  
  module.exports = {
    formatCartItem,
    formatCart,
  };
  