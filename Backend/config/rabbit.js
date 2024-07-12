const amqp = require('amqplib');
let connection = null;

async function initialize() {
    if (connection) {
        return connection;
    }
    connection = await amqp.connect('amqp://localhost');
    return connection;
}

module.exports = {
    initialize
};