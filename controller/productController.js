const Product = require("../models/productModel");
const { getPostData } = require("../utils");

// @desc Gets all products
// @route GET api/products/
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}
// @desc Gets all product
// @route GET api/products/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "product not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc Create a product
// @route POST api/products/
async function createProduct(req, res) {
  try {
    var body = "";

    body = await getPostData(req);
    const { name, description, price } = JSON.parse(body);

    const product = {
      name,
      description,
      price,
    };
    const newProduct = await Product.create(product);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

// @desc Update a product
// @route PUT api/products/:id
async function updateProduct(req, res, id) {
  try {
    const searchProduct = await Product.findById(id);
    if (!searchProduct) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "product not found" }));
    } else {
      const body = await getPostData(req);
      const { name, description, price } = JSON.parse(body);
      console.log(name, description, price);
      const product = {
        name: name || searchProduct.name,
        description: description || searchProduct.description,
        price: price || searchProduct.price,
      };
      const updatedProduct = await Product.update(id, product);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updatedProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc Delete a product
// @route PUT api/products/:id
async function deleteProduct(req, res, id) {
  try {
    const searchProduct = await Product.findById(id);
    if (!searchProduct) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "product not found" }));
    } else {
      const message = await Product.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(message));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
