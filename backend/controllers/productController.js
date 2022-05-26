const Product = require('../models/productModel')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')

// Create new product
exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})

// get all products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const apiFeatures = new APIFeatures(Product.find(), req.query).search()

    let products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: products.length,
        products
    })

})

// Get single product details
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }


    res.status(200).json({
        success: true,
        product
    })

})

// update product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.param.id)

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    product = await Product.findByIdAndUpdate(req.param.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })
})

// delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.param.id)

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    await product.deleteOne()

    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })

})