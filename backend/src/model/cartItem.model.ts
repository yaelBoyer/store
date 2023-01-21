import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { ProductDocument } from "./product.model";

export interface CartItemDocument extends mongoose.Document {
    product: ProductDocument["_id"];
    count: Number;
    totalPrice: Number;
    createdAt: Date;
    updatedAt: Date;
}

const CartItemSchema = new mongoose.Schema(
    {
        cartItemId: {
            type: String,
            required: true,
            unique: true,
            default: () => nanoid(10),
        },
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        count: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
    },
    { timestamps: true }
);

const CartItem = mongoose.model<CartItemDocument>("CartItem", CartItemSchema);

export default CartItem;
