const express = require('express');
const connectDB = require('./connections/ConnectDB');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req,res) => {
    res.send('Hello, World!');
});

app.listen(5000);