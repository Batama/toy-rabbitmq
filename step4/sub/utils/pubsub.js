const amqp = require('amqplib');

const config = require('../config/constants');
const db = require("../db/db")
let connection;
let channel;

async function init() {
  if (connection) return; // Prevent reinitialization

  connection = await amqp.connect('amqp://localhost');
  channel = await connection.createChannel();

  console.log("RabbitMQ Connected & Channel Created");

  await channel.assertQueue(config.messageQueue, { durable: true });
  console.log(`Waiting for messages in ${config.messageQueue}...`);
  channel.consume(
    config.messageQueue,
    (msg) => {
      console.log(`Received: ${msg.content.toString()}`);
      db.save(msg.content.toString())
      channel.ack(msg);
    },
    { noAck: false },
  );
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
  close
};
