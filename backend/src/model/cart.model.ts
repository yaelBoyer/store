import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { boolean } from "yup";
import { CartItemDocument } from "./cartItem.model";
import { UserDocument } from "./user.model";

export interface CartDocument extends mongoose.Document {
    user: UserDocument["_id"];
    ordered: Boolean;
    createdAt: Date;
    updatedAt: Date;
    cartItems: CartItemDocument[];
}

const CartSchema = new mongoose.Schema(
    {
        cartId: {
            type: String,
            required: true,
            unique: true,
            default: () => nanoid(10),
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        ordered: { type: Boolean, default: false },
        cartItems: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "CartItem"
        }]
    },
    { timestamps: true }
);

const Cart = mongoose.model<CartDocument>("Cart", CartSchema);

export default Cart;
