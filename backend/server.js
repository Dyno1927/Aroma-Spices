import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { connectDB } from './config/dbConfig.js';
import { errorHandler } from './middleware/errorHandlerMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

const app = express();
/* Uncomment the lines below when testing */
// import dotenv from 'dotenv';
// dotenv.config();
connectDB();

// Middleware FIRST
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://aromaspicies.com',
      'https://www.aromaspicies.com',
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', orderRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler LAST
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
