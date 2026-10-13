const express = require('express');
const productRoutes = require('./routes/product_route');

const app = express(); 
app.use(express.json());

app.use('/products', productRoutes);

// Undefined routes
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found.'
    });
});


module.exports = app;