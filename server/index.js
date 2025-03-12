import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js'
import addressRoutes from './routes/addressRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import imageUpload from './controllers/imageUpload.js'

dotenv.config();
const app = express();
const ordersRouter = require('./routes/orders');

// Middleware
app.use(express.json());
// app.use(bodyParser.json({ limit: "10mb" }));
// app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));


// Routes
app.use('/api/orders', ordersRouter);

app.use('/api/auth', authRoutes); 
// Routes
app.use('/api/orders', ordersRouter);
app.use('/api/auth', authRoutes); 
app.use('/api/products', productRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/cart', cartRoutes);
app.use('/image/', imageUpload);