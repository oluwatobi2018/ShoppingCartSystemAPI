// src/config/roles.js

// Define roles as an Enum-like object
const Roles = {
    ADMIN: 'admin',  // Admin users with full access
    USER: 'user',    // Regular users with limited access
    SELLER: 'seller', // Seller role for managing products or orders
    GUEST: 'guest',  // Guest users with the least access
  };
  
  // Define permissions for each role
  const Permissions = {
    [Roles.ADMIN]: [
      'CREATE_PRODUCT',
      'UPDATE_PRODUCT',
      'DELETE_PRODUCT',
      'VIEW_ORDERS',
      'MANAGE_USERS',
      'VIEW_PRODUCTS',
      'UPDATE_PROFILE',
      'DELETE_USER',
    ],
    [Roles.USER]: [
      'VIEW_PRODUCTS',
      'ADD_TO_CART',
      'VIEW_CART',
      'UPDATE_PROFILE',
      'CHECKOUT',
    ],
    [Roles.SELLER]: [
      'VIEW_PRODUCTS',
      'CREATE_PRODUCT',
      'UPDATE_PRODUCT',
      'DELETE_PRODUCT',
      'VIEW_ORDERS',
      'UPDATE_PROFILE',
    ],
    [Roles.GUEST]: [
      'VIEW_PRODUCTS',
    ],
  };
  
  // Helper function to check if a user has permission
  const hasPermission = (role, permission) => {
    if (Permissions[role]) {
      return Permissions[role].includes(permission);
    }
    return false;
  };
  
  // Export roles and permissions
  module.exports = {
    Roles,
    Permissions,
    hasPermission,
  };
  