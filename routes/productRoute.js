const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get(`/`, getProducts);
router.get(`/:id`, getProduct);
router.post(`/`, saveProduct);
router.put(`/:id`, updateProduct);
router.delete(`/:id`, deleteProduct);

module.exports = router;
