import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
})