import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import analyticsRoutes from './routes/analyticsRoutes.js'
import authRoutes from './routes/authRoutes.js'
import addressRoutes from './routes/addressRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import discountRoutes from './routes/discountRoutes.js'
import imageUpload from './controllers/imageUpload.js'
import orderRoutes from './routes/orderRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import productRoutes from './routes/productRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    req.user = { account_id: "550e8400-e29b-41d4-a716-446655440000" };
    next();
});

app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/discount', discountRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/review', reviewRoutes)
app.use('/image/', imageUpload);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});