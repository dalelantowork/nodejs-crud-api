const Product = require("../models/productModel");

// get all
const getProducts = async (request, response) => {
  try {
    const products = await Product.find({}); // {} means get all
    response.status(200).json(products);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// get by id
const getProduct = async (request, response) => {
  try {
    const { id } = request.params;
    const product = await Product.findById(id);
    response.status(200).json(product);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// save product
const saveProduct = async (request, response) => {
  try {
    const product = await Product.create(request.body);
    response.status(200).json(product);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// update product
const updateProduct = async (request, response) => {
  try {
    const { id } = request.params;
    const product = await Product.findByIdAndUpdate(id, request.body);
    if (!product) {
      return response.status(404).json({ message: `product not found` });
    }
    const updatedProduct = await Product.findById(id);
    response.status(200).json(updatedProduct);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// delete product
const deleteProduct = async (request, response) => {
  try {
    const { id } = request.params;
    const product = await Product.findByIdAndDelete(id, request.body);
    if (!product) {
      return response.status(404).json({ message: `product not found` });
    }
    response.status(200).json(product);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
};
