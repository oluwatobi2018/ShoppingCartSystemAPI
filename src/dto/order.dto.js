// Format a single item in the order
const formatOrderItem = (item) => ({
    productId: item.productId._id || item.productId,
    name: item.productId.name || '',
    price: item.productId.price || 0,
    quantity: item.quantity,
    total: item.quantity * (item.productId.price || 0),
  });
  
  // Format the full order
  const formatOrder = (order) => {
    const items = order.items.map(formatOrderItem);
    const totalAmount = items.reduce((sum, item) => sum + item.total, 0);
  
    return {
      orderId: order._id,
      userId: order.userId,
      items,
      totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  };
  
  module.exports = {
    formatOrderItem,
    formatOrder,
  };
  