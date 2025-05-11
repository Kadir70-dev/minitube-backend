const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'minitube-app',
  brokers: ['kafka:9092']
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'video-group' });

// Immediately connect producer and consumer
(async () => {
  await producer.connect();
  await consumer.connect();
})();

module.exports = {
  kafka,
  producer,
  consumer
};
