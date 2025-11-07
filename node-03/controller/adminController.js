import Order from "../model/orderModel.js";
import Product from "../model/productModel.js";
import User from "../model/userModel.js";

export const deleteUser = async (req, res) => {
  try {
    const isAdmin = req.user;
    const userIdToDelete = req.params.id;

    const userToDelete = await User.findById(userIdToDelete);
    if (!userToDelete) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (isAdmin._id.toString() === userIdToDelete && isAdmin.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin cannot delete itself",
      });
    }

    if (userToDelete.role === "user") {
      await Order.deleteMany({ user: userToDelete._id });
    }

    if (userToDelete.role === "seller") {
      // Find all seller products
      const sellerProducts = await Product.find({ createdBy: userToDelete._id });
      const productIds = sellerProducts.map((p) => p._id);

      // Delete seller’s products
      await Product.deleteMany({ createdBy: userToDelete._id });

      // Cancel all orders containing those products
      await Order.updateMany(
        { "items.product": { $in: productIds } },
        { $set: { status: "cancelled" } }
      );
    }
    await User.findByIdAndDelete(userIdToDelete);

    res.json({
      success: true,
      message: `${userToDelete.role} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
