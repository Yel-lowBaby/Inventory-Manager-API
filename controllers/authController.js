const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
             const error = new Error(`
                Password must be strong and include:
                - Minimum of 8 characters 
                - At least one uppercase letter (A - Z) 
                - At least one lowercase letter (a - z)
                - At least one number (0 - 9) 
                - At least one special character (@$!%*?&)
                `);
            error.statusCode = 400;
            return next(error);        
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 400;
            return next(error); 
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        })

        await user.save();            
        
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });

    } catch(error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            const error = new Error("Invalid email or password");
            error.statusCode = 400;
            return next(error);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
             const error = new Error("Invalid email or password");
            error.statusCode = 400;
            return next(error);
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2h"}
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            id: user._id,
            role: user.role,
            token
        })

    } catch(error) {
        next(error);
    }
};