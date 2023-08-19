const errorMiddleware = (err, req, res, next) => {
    console.error('An error occurred:', err);

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log(err.message)
    return res.status(400).json({ error: 'Internal Server Error' });
};

module.exports = errorMiddleware;
