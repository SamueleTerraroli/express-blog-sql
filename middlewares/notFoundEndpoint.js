module.exports = (req, res, next) => {
    res.status(404).json({
        message: 'Endpoint non trovato',
        status: 404,
        error: 'Not Found',
    });
};
