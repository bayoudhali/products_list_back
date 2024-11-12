// src/swaggerConfig.ts

import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product API",
      version: "1.0.0",
      description: "API documentation for the Product management system",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The auto-generated id of the product",
            },
            name: {
              type: "string",
              description: "The name of the product",
            },
            description: {
              type: "string",
              description: "The description of the product",
            },
            category: {
              type: "string",
              description: "The category of the product",
            },
            createdBy: {
              type: "string",
              description: "User who created the product",
            },
            updatedBy: {
              type: "string",
              description: "User who last updated the product",
            },
          },
        },
        ProductInput: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            category: { type: "string" },
            createdBy: { type: "string" },
            updatedBy: { type: "string" },
          },
          required: ["name", "description", "category", "createdBy"],
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const specs = swaggerJsdoc(options);
export default specs;
