module.exports = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            const error = new Error("Not authorized");
            error.statusCode = 403;
            return next(error);
        }
        next ();
    };
};