# Shopping Cart API

A RESTful API for a shopping cart system where multiple users can purchase products from a shared inventory. The system supports product and cart management, as well as checkout functionality, with features like preventing overselling and maintaining accurate stock levels.

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Installation](#installation)


## Overview

This API is designed to manage a shared product inventory and allows multiple users to add products to their cart, remove items, and perform a checkout while maintaining accurate stock quantities. The system ensures that products are not oversold and provides efficient handling of concurrent cart updates.

## Technologies

- **Node.js**: JavaScript runtime used to build the API.
- **Express**: Web framework for Node.js to handle routing and middleware.
- **MongoDB**: NoSQL database used for storing product and cart data.
- **Redis**: Caching layer to optimize database performance and handle concurrency.
- **JWT**: For handling user authentication (if applicable).
- **dotenv**: To manage environment variables securely.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/shopping-cart-api.git
   cd shopping-cart-api
