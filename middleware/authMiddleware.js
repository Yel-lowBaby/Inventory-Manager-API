const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.header('Authorization');

    if (!token) {
        const error = new Error("No token supplied, access denied");
        error.statusCode = 401;
        return next(error);
    }
    try {
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

     } catch(error) {
        next(error);
    }
};
