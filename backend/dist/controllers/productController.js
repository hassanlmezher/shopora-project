import Product from "../models/Product.js";
import Store from "../models/Store.js";
export const createProduct = async (req, res) => {
    try {
        const { store, name, subtitle = "", price, images, description = "", category } = req.body;
        if (!store || !name || typeof price !== "number" || !images?.length || !category) {
            return res.status(400).json({ message: "Missing required product fields." });
        }
        const storeExists = await Store.exists({ _id: store });
        if (!storeExists) {
            return res.status(404).json({ message: "Store not found for this product." });
        }
        const product = await Product.create({
            store,
            name: name.trim(),
            subtitle: subtitle.trim(),
            price,
            images,
            description: description.trim(),
            category: category.trim(),
        });
        return res.status(201).json(product.toJSON());
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to create product";
        return res.status(500).json({ message });
    }
};
export const getProducts = async (_req, res) => {
    try {
        const products = await Product.find().populate("store");
        return res.json(products.map((product) => product.toJSON()));
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to fetch products";
        return res.status(500).json({ message });
    }
};
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("store");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.json(product.toJSON());
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to fetch product";
        return res.status(500).json({ message });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.json({ message: "Product deleted" });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to delete product";
        return res.status(500).json({ message });
    }
};
