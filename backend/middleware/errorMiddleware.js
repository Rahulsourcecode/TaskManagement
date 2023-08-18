const errorMiddleware = (err, req, res, next) => {
    console.error('An error occurred:', err);

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorMiddleware;
