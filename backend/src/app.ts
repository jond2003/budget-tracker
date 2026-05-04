import express from 'express';
import cors from 'cors';
import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Routes
// app.use('/api/items', itemRoutes);

// Global error handler (should be after routes)
// app.use(errorHandler);

export default app;