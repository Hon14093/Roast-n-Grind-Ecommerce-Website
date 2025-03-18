import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import imageUpload from './controllers/imageUpload.js';

import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import addressRoutes from './routes/addressRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from "./routes/orderRoutes.js"
import imageUpload from './controllers/imageUpload.js'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Middleware giả lập xác thực
app.use((req, res, next) => {
  req.user = { account_id: '550e8400-e29b-41d4-a716-446655440000' }; // UUID từ seed.js
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/cart', cartRoutes);

app.use('/api/payment', paymentRoutes);

app.use('/api/order', orderRoutes)

app.use('/image/', imageUpload);

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});