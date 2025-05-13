// kafkaConsumer.js
const { Kafka } = require('kafkajs');

const kafkaBroker = 'kafka:9093';

const kafka = new Kafka({ clientId: 'minitube-consumer', brokers: ['localhost:9092'] });

const consumer = kafka.consumer({ groupId: 'video-group' });

const startConsumer = async () => {
  await consumer.connect();
  console.log('[Kafka] Consumer connected');
  await consumer.subscribe({ topic: 'video-uploaded', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const videoData = JSON.parse(message.value.toString());
      console.log('[Kafka] Video uploaded:', videoData.title);
      // Additional processing logic here (e.g., analytics)
    },
    
  });
};

module.exports = startConsumer;
