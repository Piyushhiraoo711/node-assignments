import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {},
    description: {},
    price: {},
    category: {},
    brand: {},
    stock: {},
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },

  { timestamps: true }
);

const Product = mongoose.model("Products", productSchema);
export default Product;
