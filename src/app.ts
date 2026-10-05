import express from 'express';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/auth.routes';
import medicosRoutes from './routes/medicos.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Serve os ficheiros estáticos da pasta public
app.use(express.static(path.join(__dirname, '../public')));

// Registra as APIs
app.use('/api', authRoutes);
app.use('/api', medicosRoutes);

export default app;