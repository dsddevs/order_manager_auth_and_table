const app = require('./app');
const db = require('./db');
const crypto = require('crypto');
require('dotenv').config();

function generateId() {
    return crypto.randomBytes(8).toString('hex');
}

app.get('/', (req, res) => {
    res.send("Welcome to the Order Management API");
});

// GET /orders
app.get('/orders', async (req, res) => {
    try {
        const orders = await db.Order.findAll();
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Error fetching orders"});
    }
});

// GET /orders/:id
app.get('/orders/:id', async (req, res) => {
    try {
        const order = await db.Order.findByPk(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({message: "Order not found"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Error fetching order"});
    }
});

// POST /orders
app.post('/orders', async (req, res) => {
    try {
        const orderData = {
            id: generateId(),
            ...req.body
        };
        const newOrder = await db.Order.create(orderData);
        res.status(201).json(newOrder);
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({message: "Error creating order", error: err.message});
    }
});

// PATCH /orders/:id
app.patch('/orders/:id', async (req, res) => {
    try {
        const order = await db.Order.findByPk(req.params.id);
        if (order) {
            await order.update(req.body);
            res.json(order);
        } else {
            res.status(404).json({message: "Order not found"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Error updating order"});
    }
});

// DELETE /orders/:id
app.delete('/orders/:id', async (req, res) => {
    try {
        const order = await db.Order.findByPk(req.params.id);
        if (order) {
            await order.destroy();
            res.json({success: true, id: req.params.id});
        } else {
            res.status(404).json({message: "Order not found"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Error deleting order"});
    }
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});