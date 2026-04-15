const transporter = require('../configs/mailer');

exports.sendProductEmail = async (product) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "abioyeadedapo0@gmail.com",
        subject: "Inventory Manager API",
        text: `New Product Created:
        Product ${product.name} has been created successfully` 
    });
};
