const express = require('express');
const app = express();
const ordersRouter = require('./routes/orders');

// Middleware
app.use(express.json());

// Routes
app.use('/api/orders', ordersRouter);

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});