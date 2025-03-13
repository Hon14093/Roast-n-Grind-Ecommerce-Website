import express from 'express';
import dotenv from 'dotenv';
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

// middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); 
app.use('/api/products', productRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes)
app.use('/image/', imageUpload);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
})