const express = require('express');
const router = express.Router();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Docu API",
            description: "API Documentation for use",
            contact: {
                name: "Bruno Amat",
                url: "https://www.linkedin.com/in/mebruno/"
            },
            servers: ["http://localhost:3000"]
        },
    },
    apis: ["./js/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = router;