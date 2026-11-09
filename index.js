require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/students');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');

const app = express();

// Allows Express to read JSON request bodies
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5174' }));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');

        // Start server only after MongoDB connects
        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Authentication routes
app.use('/api/auth', authRoutes);

// Student routes
app.use('/students', studentRoutes);
app.use('/api/upload', uploadRoutes);