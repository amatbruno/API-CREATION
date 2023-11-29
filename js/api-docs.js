"use strict";

const express = require('express');
const app = express();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


//Swagger documentation
const swaggerOptions = {
    swaggerDefinition:{
        info:{
            version: "1.0.0",
            title: "Docu API",
            description: "API Documentation for use",
            contact: {
                name: "Bruno Amat",
                url: "https://www.linkedin.com/in/mebruno/"
            },
            servers: ["http://localhost:3000"]
        }
    },
    //API to document
    apis: ["./js/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = app;