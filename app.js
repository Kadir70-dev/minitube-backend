const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const redis = require('redis');
const startConsumer = require('./utils/kafka');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/video');

dotenv.config();


const app = express();
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Mongo connected'));

app.use(cors());
app.use(express.json());
app.get('/api', (req, res) => res.send('API is running...'));
app.use('/uploads', express.static('uploads'));
const redisClient = redis.createClient({ url: process.env.REDIS_URL });
redisClient.connect();


// Kafka setup
startConsumer();
// const producer = kafka.producer();
// producer.connect();
// app.locals.redis = redisClient;
// app.locals.kafka = producer;
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
module.exports = app;


// ✅ Only start server if app.js is run directly
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
