import Product from "../model/productModel.js";

export const getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    console.log("product");
    return res.json({ success: true, product });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    // only seller and admin update krega
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    if (
      req.user.role !== "admin" &&
      product.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized for updating product",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json({
      success: false,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock } = req.body;

    await Product.create({
      name,
      description,
      price,
      category,
      brand,
      stock,
      createdBy: req.user._id,
    });
    return res.status(201).json({
      success: true,
      message: "Product create successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    return res.json(product);
  } catch (error) {
    console.log("jhskjdhsd");
    res.status(500).json({ success: false, message: error });
  }
};

// only seller and admin can delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ succes: false, message: "Product not found" });
    }

    if (
      req.user.role !== "admin" &&
      product.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized for updating product",
      });
    }

    const deleteProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deleteProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
