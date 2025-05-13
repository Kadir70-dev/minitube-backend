const { createClient } = require('@redis/client');

const client = createClient({ url: process.env.REDIS_URL });

client.on('error', (err) => console.error('Redis error:', err));

client.connect()
  .then(() => {
    console.log('Redis connected');
  })
  .catch((err) => {
    console.error('Error connecting to Redis:', err);
  });
  

module.exports = client;
