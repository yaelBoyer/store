import { Cart } from "./cart";
import { User } from "./user";

export class Order {
    orderId: string;
    user: User;
    cart: Cart;
    totalPrice: number;
    city: string;
    street: string;
    dateShipping: Date;
    cardNum: string;
    createdAt: Date;
    updatedAt: Date;
}