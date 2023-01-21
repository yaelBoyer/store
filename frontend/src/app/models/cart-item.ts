import { Product } from "./product";

export class CartItem {
    _id: string;
    cartItemId: string;
    product: Product;
    count: number;
    totalPrice: number;
}