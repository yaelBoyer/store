import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { CategoryDocument } from "./category.model";

export interface ProductDocument extends mongoose.Document {
    productId:string;
    category: CategoryDocument["_id"];
    name: string;
    price:number;
    description:string;
    imageUrl:string;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            unique: true,
            default: () => nanoid(10),
        },
        name: { type: String, required: true },
        description: { type: String },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        price: { type: Number, required: true },
        imageUrl: { type: String },
    },
    { timestamps: true }
);

const Product = mongoose.model<ProductDocument& mongoose.Document>("Product", ProductSchema);

export default Product;
