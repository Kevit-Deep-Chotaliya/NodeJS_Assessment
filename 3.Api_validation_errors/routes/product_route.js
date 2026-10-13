const express = require('express');
const Product = require('../models/product');

const app = express();
app.use(express.json());

const router = express.Router();

//Validate Products

function validateProductFields(body, options = {}) {
    const errors = [];
    const partial = options.partial === true;

    if (!partial || Object.hasOwn(body, "name")) {
        if (
            typeof body.name !== "string" ||
            !body.name.trim()
        ) {
            errors.push("Product name is required.");
        }
    }

    if (!partial || Object.hasOwn(body, "category")) {
        if (
            typeof body.category !== "string" ||
            !body.category.trim()
        ) {
            errors.push("Product category is required.");
        }
    }

    if (Object.hasOwn(body, "price") || !partial) {
        if (
            body.price === undefined ||
            body.price === null ||
            body.price === "" ||
            !Number.isFinite(Number(body.price)) ||
            Number(body.price) <= 0
        ) {
            errors.push("Price must be a positive number.");
        }
    }

    if (
        Object.hasOwn(body, "instock") &&
        typeof body.instock !== "boolean"
    ) {
        errors.push("instock must be true or false.");
    }

    const allowedFields = ["name", "category", "price", "instock"];

    if (Object.keys(body).some(field => !allowedFields.includes(field))) {
        errors.push("One or more fields are not allowed.");
    }

    if (partial && Object.keys(body).length === 0) {
        errors.push("Provide at least one field to update.");
    }

    return errors;
}


// Create product 

router.post(
    '/',
    async (req, res, next) => {
        try {
            const errors = validateProductFields(
                req.body || {}
            );

            if (errors.length) {
                return res.status(400).json({
                    message: 'Invalid product input.',
                    errors
                });
            }

            const product = await Product.create({
                name: req.body.name.trim(),
                category: req.body.category.trim(),
                price: req.body.price,

                instock: Object.hasOwn(
                    req.body,
                    'instock'
                )
                    ? req.body.instock
                    : true
            });

            return res.status(201).json({
                message: 'Product created successfully.',
                product
            });

        } catch (error) {
            {
                return res.status(400).json({
                    message: error.message
                });
            }
        }
    }
);


