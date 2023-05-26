const Product = require('../models/product');

exports.save = (req, res, next) => {
    const addedProd = new Product(null, req.body.name, req.body.price, req.body.stock).save();
    res.status(201).json(addedProd);
}

exports.getAll = (req, res, next) => {
    res.status(200).json(Product.getAll());
}

exports.deleteById = (req, res, next) => {
    res.json(Product.deleteById(req.params.productId));
}
exports.getById = (req, res, next) => {
    console.log(Product.getById(req.params.productId))
    res.json(Product.getById(req.params.productId));
 
}

exports.edit = (req, res) => {
    const editedProd = new Product(parseInt(req.params.productId, 10), req.body.name, req.body.stock, req.body.price).edit();
    res.json(editedProd);
}