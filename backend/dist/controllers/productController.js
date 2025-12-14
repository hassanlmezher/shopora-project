import Product from "../models/Product.js";
export const createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
};
export const getProducts = async (req, res) => {
    const products = await Product.find().populate("store");
    res.json(products);
};
export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id).populate("store");
    res.json(product);
};
export const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
};
