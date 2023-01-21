import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { CartDocument } from "./cart.model";
import { UserDocument } from "./user.model";

export interface OrderDocument extends mongoose.Document {
    orderId: String;
    user: UserDocument["_id"];
    cart: CartDocument["_id"];
    totalPrice: Number;
    city: String;
    street: String;
    dateShipping: Date;
    cardNum: String;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true,
            default: () => nanoid(10),
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
        totalPrice: { type: Number, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
        dateShipping: { type: Date, required: true },
        cardNum: { type: String, required: true },
    },
    { timestamps: true }
);

const Order = mongoose.model<OrderDocument>("Order", OrderSchema);

export default Order;
