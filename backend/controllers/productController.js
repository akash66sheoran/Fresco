const Product = require("../models/productModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary").v2;

// Create new product
exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    const file = req.files.image

    const result = await cloudinary.uploader.upload(
        file.tempFilePath,
        {
            folder: "products",
        }
    );

    const { name, description, price, category } = req.body;

    const product = await Product.create({
        name,
        description,
        price,
        category,
        image: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    res.status(201).json({
        success: true,
        product,
    });
});

// get all products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Product.find(), req.query).search();

    let products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: products.length,
        products,
    });
});

// Get all products (Admin)  =>   /admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// Get single product details
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

// delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    // Deleting image associated with the product
    await cloudinary.uploader.destroy(product.image.public_id)

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product is deleted",
    });
});
