import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import groupRoutes from './routes/groupRoutes.js';

dotenv.config();

const app = express();

// MIDDLEWARES
app.use(cors({
  origin: 'http://localhost:5173',  //  Update to your frontend URL in production
  credentials: true
}));
app.use(express.json());

// DATABASE
connectDB();

// ROUTES
app.get('/', (req, res) => res.send(' Server is running'));
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/group', groupRoutes);

// SERVER & SOCKET.IO
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',  //  Your frontend URL
    methods: ['GET', 'POST']
  }
});

// SOCKET.IO LOGIC
io.on('connection', (socket) => {
  console.log(' User connected:', socket.id);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(` User ${socket.id} joined room ${roomId}`);
  });

  socket.on('sendMessage', ({ roomId, message }) => {
    io.to(roomId).emit('receiveMessage', message);
    console.log(` Message to room ${roomId}:`, message);
  });

  socket.on('disconnect', () => {
    console.log(' User disconnected:', socket.id);
  });
});

// START SERVER
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));


