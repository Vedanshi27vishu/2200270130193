const Log = require('../Middleware/log');

exports.home = async (req, res, next) => {
    const { stack, level, package: pkg, message } = req.body;

    if (!stack || !level || !pkg || !message) {
        return res.status(400).send("Please provide stack, level, package, and message in body");
    }

    try {
        await Log(stack, level, pkg, message);
        res.send("Log request processed");
    } catch (err) {
        next(err); 
    }
};
