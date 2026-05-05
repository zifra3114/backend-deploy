import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';

const app = express();

// DB connect
connectDB();

// Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'https://blog-auth-frontend.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ❌ REMOVE app.listen
// ✅ EXPORT for Vercel
export default app;
