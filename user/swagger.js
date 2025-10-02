const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Express API",
      version: "1.0.0",
      description: "API documentation for Express app",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
    },
  },
  servers: [
    {
      url: "http://localhost:3000/api/users",
      description: "API Gateway (frontend should use this)",
    },
    {
      url: "http://localhost:3001",
      description: "Direct service (for local testing)",
    },
  ],

  apis: ["./routes/*.js", "./docs/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
