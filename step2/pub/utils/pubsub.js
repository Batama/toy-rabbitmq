const amqp = require('amqplib');

let connection;
let channel;

async function init() {
  if (connection) return; // Prevent reinitialization

  connection = await amqp.connect('amqp://localhost');
  channel = await connection.createChannel();

  console.log("RabbitMQ Connected & Channel Created");
}

/**
 * Publishes a message to a queue.
 *
 * @param {string} message The message to send.
 * @param {string} queue The name of the queue to send the message to.
 *
 * @throws {Error} If the RabbitMQ channel is not initialized. Call init() first.
 */
async function publish(message, queue) {
  if (!channel) throw new Error("RabbitMQ channel is not initialized. Call init() first.");

  await channel.assertQueue(queue, { durable: true }); // Ensure queue exists before sending
  channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

  console.log(`Published to "${queue}": ${message}`);
}

async function close() {
  if (channel) {
    await channel.close();
    console.log("RabbitMQ Channel Closed");
  }
  if (connection) {
    await connection.close();
    console.log("RabbitMQ Connection Closed");
  }
  channel = null;
  connection = null;
}

module.exports = {
  init,
  publish,
  close
};
