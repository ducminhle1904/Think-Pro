import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    cpu: {
      type: String,
      required: true,
    },
    display: {
      type: String,
      required: true,
    },
    ram: {
      type: String,
      required: true,
    },
    card: {
      type: String,
      required: true,
    },
    storage: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    os: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    mainImage: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sale: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models.product || mongoose.model("product", productSchema);
export default Dataset;
