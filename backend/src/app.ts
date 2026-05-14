import express from 'express';
import cors from 'cors';
import session from 'express-session';
import config from './config/config';
import { genUUID } from './utils/security.utils';
import MongoStore from 'connect-mongo';
import { Databases, DB_URI } from './constants/db.constants';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import transactionRoutes from './routes/transactionRoutes';
import incomeRoutes from './routes/incomeRoutes';
import categoryRoutes from './routes/categoryRoutes';
import calendarRoutes from './routes/calendarRoutes';
import budgetRoutes from './routes/budgetRoutes';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: config.secret_key.split(' ')[0]!,
  genid: genUUID,
  // name: 'sid',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: DB_URI,
    dbName: Databases.EXPENSES_DATA
  }),
  cookie: {
    maxAge: 7 * 24 * 3600 * 1000,  // days * hours * seconds * milliseconds
    priority: 'high',
    secure: false,
    httpOnly: true,
    sameSite: false
  }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use('/api/transactions', transactionRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/budget', budgetRoutes);

app.use('/api/calendar', calendarRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;