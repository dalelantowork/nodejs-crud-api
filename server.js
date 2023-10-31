const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./models/productModel");

// middleware
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: false })); // for x-www-form-urlencoded

//routes

app.get(`/`, (reques, response) => {
  response.send(`Hello NODE API`);
});

app.get(`/blog`, (request, response) => {
  response.send(`Hello Blog Hi`);
});

// get all
app.get(`/products`, async (request, response) => {
  try {
    const products = await Product.find({}); // {} means get all
    response.status(200).json(products);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// get by id
app.get(`/products/:id`, async (request, response) => {
  try {
    const { id } = request.params;
    const product = await Product.findById(id);
    response.status(200).json(product);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// save product
app.post(`/products`, async (request, response) => {
  try {
    const product = await Product.create(request.body);
    response.status(200).json(product);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// update product
app.put(`/products/:id`, async (request, response) => {
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
});

// delete product
app.delete(`/products/:id`, async (request, response) => {
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
});

// mongoose.set('strictQuery', false);
mongoose
  .connect(
    "mongodb+srv://dalelantowork:8XPE7M4Bj0krXlLk@nodejsapi.gepbfqw.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`connected to mongodb`);
    app.listen(3000, () => {
      console.log(`Node API app is running on port http://localhost:3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
