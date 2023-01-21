import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
} from "mongoose";
import path from "path";
import Cart, { CartDocument } from "../model/cart.model";
import CartItem from "../model/cartItem.model";
import Product from "../model/product.model";

export function getCart(
    query: FilterQuery<CartDocument>,
    options: QueryOptions = { lean: true }
) {
    return Cart.findOne(query, {}, options).sort('createdAt').populate({ path: 'cartItems', model: CartItem,
    populate: { path: 'product' ,model: Product } })
}

export function createCart(input: DocumentDefinition<CartDocument>) {
    return Cart.create(input);
}

export function findAndUpdate(
    query: FilterQuery<CartDocument>,
    update: UpdateQuery<CartDocument>,
    options: QueryOptions
) {
    return Cart.findOneAndUpdate(query, update, options);
}


