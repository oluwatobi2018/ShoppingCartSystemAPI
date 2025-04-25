// src/config/corsOptions.js

const allowedOrigins = [
    'http://localhost:3000',  // Local development frontend URL
    'https://your-frontend-domain.com',  // Replace with your actual production frontend URL
    // Add any other domains that should be allowed here
  ];
  
  const corsOptions = {
    origin: (origin, callback) => {
      // Allow requests from any origin if the origin is not set (i.e., server-side requests)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error('Not allowed by CORS')); // Reject the request for other origins
      }
    },
    methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization',  // Allowed headers in requests
    exposedHeaders: 'Authorization',  // Headers that are allowed to be exposed to the browser
    credentials: true,  // Allow cookies to be sent with requests
    maxAge: 3600,  // Cache pre-flight request for 1 hour (3600 seconds)
  };
  
  module.exports = corsOptions;
  