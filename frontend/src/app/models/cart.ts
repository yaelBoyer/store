import { CartItem } from "./cart-item";

export class Cart {
    _id: string;
    cartId: string;
    userId: string;
    ordered: boolean;
    cartItems: CartItem[] = [];
    createdAt: Date;
    updatedAt: Date;
}