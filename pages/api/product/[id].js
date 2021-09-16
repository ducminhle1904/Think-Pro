import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";
// import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
  }
};

const getProducts = async (req, res) => {
  try {
    const { id } = req.query;
    const product = await Products.findById(id);

    if (!product) return res.status(400).json({ err: "Product not found" });
    res.json({
      product,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
