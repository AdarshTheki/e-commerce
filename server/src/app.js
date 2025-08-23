import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import passport from 'passport';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import { Server } from 'socket.io';

import { initializeSocketIO } from './config/socket.js';
import { logger, morganMiddleware } from './middlewares/logger.middleware.js';
import { env } from './config/constant.js';
import './config/passport.js';

// Import All Routing Files
import userRoute from './routes/user.route.js';
import productRoute from './routes/product.route.js';
import commentRoute from './routes/comment.route.js';
import categoryRoute from './routes/category.route.js';
import brandRoute from './routes/brand.route.js';
import cartRoute from './routes/cart.route.js';
import addressRoute from './routes/address.route.js';
import openaiRoute from './routes/openai.route.js';
import dashboardRoute from './routes/dashboard.route.js';
import messageRoute from './routes/message.route.js';
import chatRoute from './routes/chat.route.js';
import cloudinaryRoute from './routes/cloudinary.route.js';
import reviewRoute from './routes/review.route.js';
import orderRoute from './routes/order.route.js';
import { stripeWebhook } from './controllers/order.controller.js';

const app = express();

const CORS = env.cors?.split(',');

app.post(
  '/api/v1/order/stripe-webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

app.use(cors({ origin: CORS, credentials: true }));

app.use(express.json({ limit: '16kb' }));

app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use(express.static('public'));

app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // max 100 requests per windowMs
});

app.use(limiter);

app.use(morganMiddleware);

app.use(passport.initialize());

Object.keys(env).forEach((key) => {
  if (!env[key]) {
    logger.error(`${key} : environment variable not found!`);
  }
});

app.use(
  session({
    secret: process.env.SECRET_TOKEN,
    saveUninitialized: true,
    resave: true,
  })
);

app.set('trust proxy', 1);

// Connect and Serve the Socket.Io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: CORS,
    credentials: true,
  },
});

// Instance in App for Global Access
app.set('io', io);

initializeSocketIO(io);

// Used All Route URLS
app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/order', orderRoute);
app.use('/api/v1/comment', commentRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/brand', brandRoute);
app.use('/api/v1/cart', cartRoute);
app.use('/api/v1/address', addressRoute);
app.use('/api/v1/openai', openaiRoute);
app.use('/api/v1/dashboard', dashboardRoute);
app.use('/api/v1/chats', chatRoute);
app.use('/api/v1/messages', messageRoute);
app.use('/api/v1/cloudinary', cloudinaryRoute);
app.use('/api/v1/review', reviewRoute);

// check API Health is valid endpoints
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: true,
    statusCode: 200,
    message: 'Server is healthy 🚀',
    timestamp: new Date().toISOString(),
  });
});

// check API is valid endpoints
app.use((req, res) => {
  res.status(405).json({
    statusCode: 405,
    path: req.url,
    method: req.method,
    message: 'API Endpoint Not Found',
    success: false,
  });
});

// global error handler middleware
app.use((err, req, res, next) => {
  const code = err?.statusCode ?? err?.status ?? 505;
  res.status(code).json({
    statusCode: code,
    path: req.url,
    method: req.method,
    message: err?.message || 'Internal server error!',
    success: false,
  });
});

export default server;
