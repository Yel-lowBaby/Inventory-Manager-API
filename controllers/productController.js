const cloudinary = require('../services/cloudinary');
const Product = require("../models/Product");
const { sendProductEmail } = require('../services/emailService');

exports.createProduct = async (req, res, next) => {
    try {
        const { name, description, price, quantity, category } = req.body;
        
        if (!name || !price || !quantity) {
            const error = new Error("Name, price and quantity are required");
            error.statusCode = 400;
            return next(error);
        }

        let imageUrl = null;

            const streamUpload = (fileBuffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: 'products' },
                        (error, result) => {
                            if (result) resolve(result);
                            else reject(error);
                        }
                    );
                stream.end(fileBuffer);
                });
            };

        if (req.file) {
            const result = await streamUpload(req.file.buffer);
            imageUrl = result.secure_url;
        }

        const product = new Product({
            name,
            description,
            price,
            quantity,
            category,
            image: imageUrl,
            createdBy: req.user.id
        });

        await product.save();

        await sendProductEmail(product);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });

     } catch(error) {
        next(error);
    }
};

exports.getProducts = async (req, res, next) => {
  try {
    let queryObj = {};

    // 🔍 SEARCH
    if (req.query.name) {
      queryObj.name = {
        $regex: req.query.name,
        $options: 'i'
      };
    }

    // 🎯 FILTER (PRICE)
    if (req.query['price[gte]']) {
      queryObj.price = queryObj.price || {};
      queryObj.price.$gte = Number(req.query['price[gte]']);
    }

    if (req.query['price[lte]']) {
      queryObj.price = queryObj.price || {};
      queryObj.price.$lte = Number(req.query['price[lte]']);
    }

    // 🧱 BUILD QUERY
    let query = Product.find(queryObj);

    // 🔃 SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 🎛 FIELD SELECTION
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }

    // 📄 PAGINATION (FIXED)
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // EXECUTE
    const products = await query;

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      results: products.length,
      data: products
    });

  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            return next(error);
        }

        if (product.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            const error = new Error("Not authorized");
            error.statusCode = 403;
            return next(error);
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );

        res.status(200).json({
            success: true,
            message: "Product updated",
            data: updatedProduct
        });

    } catch(error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            return next(error);
        }

        if (
            product.createdBy.toString() !== req.user.id && req.user.role !== 'admin'
        ) {
            const error = new Error("Not authorized");
            error.statusCode = 403;
            return next(error);
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

     } catch(error) {
        next(error);
    }
}