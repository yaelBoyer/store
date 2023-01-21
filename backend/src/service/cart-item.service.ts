import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CartItem, { CartItemDocument } from "../model/cartItem.model";

export function createCartItem(input: DocumentDefinition<CartItemDocument>) {
    return CartItem.create(input);
}

export function findCartItem(
    query: FilterQuery<CartItemDocument>,
    options: QueryOptions = { lean: true }
) {
    return CartItem.findOne(query, {}, options);
}

export function findAndUpdateCartItem(
    query: FilterQuery<CartItemDocument>,
    update: UpdateQuery<CartItemDocument>,
    options: QueryOptions
) {
    return CartItem.findOneAndUpdate(query, update, options);
}

export function deleteCartItem(query: FilterQuery<CartItemDocument>) {
    return CartItem.deleteOne(query);
}

export function deleteManyCartItem(query: FilterQuery<CartItemDocument>) {
    return CartItem.deleteMany(query);
}
