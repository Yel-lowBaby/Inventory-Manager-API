require('dotenv').config();

const express = require("express");
const app = express();

const connectDB = require('./configs/db');

connectDB();

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorMiddleware');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Inventory API running');
});

const PORT = process.env.PORT || 1004;

const startServer = async () => {
    try {
        await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

startServer();