# About

This step "serverizes" the publisher.
A utility is created to publish messages to the queue.
When a certain endpoint is hit (`localhost:3000/messages?message=test`), the message in the payload will be published.

Requirements:
- NodeJS express server (run `npx express-generator` for scaffolding)
- Correct initialization and termination of RabbitMQ
- An endpoint to publish messages
