const { Request, User } = require('../models');
const createRequest = async (req, res) => {
    const user = res.locals.user;
    try {
        const request = await user.createRequest({
            ...req.body,
        });
        res.status(201).json(request);
        const conn = await require('../config/rabbit.js').initialize();
        const channel = await conn.createChannel();
            const queue = 'requests';
            await channel.assertQueue(queue, {
                durable: false,
            });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(request)));
            console.log('Request sent to RabbitMQ');

    } catch (error) {
        console.log(error);
        res.status(500).send('Error creating request');
    }
}

const getRequestById = async (req, res) => {
    const { requestId } = req.params;
    try {
        const request = await Request.findOne({
            where: { id: requestId },
        });
        if (!request) return res.status(404).json({reason: 'Request not found'});
        res.status(200).json(request);
    }
    catch(e) {
        res.status(500).json({reason: 'Database error'});
    }
}

const getAllRequestsByUser = async (req, res) => {
    const user = res.locals.user;
    const request = await user.getRequest({
    });
    res.status(200).json(request);
}

module.exports = { createRequest, getRequestById, getAllRequestsByUser };
