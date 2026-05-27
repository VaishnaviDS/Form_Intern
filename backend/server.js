import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './config/db.js';
import authRoutes from './routes/user.js'
import adminRoutes from './routes/admin.js'
import formRoutes from './routes/form.js'

dotenv.config();
connectDB()
const app = express();
app.use(
  cors({
    origin: "https://form-intern-nine.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use('/api/auth',authRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/form',formRoutes)

app.get('/', (req, res) => {
  res.send('Server running');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
