import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';


const app = express();

// ✅ DB connect
connectDB();

// ✅ CORS FIX (best setup)
const allowedOrigins = [
  'http://localhost:5173', // local frontend
  'https://blog-auth-frontend.vercel.app' // deployed frontend (baad me use hoga)
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (Postman etc)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS not allowed'));
    }
  },
  credentials: true
}));

// ✅ middleware
app.use(express.json());
app.use(cookieParser());

// ✅ routes
app.use('/api/auth', authRoutes);

// ✅ test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ❌ IMPORTANT: Vercel me listen nahi hota
// app.listen(...) REMOVE

// ✅ EXPORT (Vercel ke liye)
export default app;
