module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Errore interno del server',
        status: 500,
        error: err.message,
    });
};
