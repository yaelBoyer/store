import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
} from "mongoose";
import Order, { OrderDocument } from "../model/order.model";

export function createOrder(input: DocumentDefinition<OrderDocument>) {
    return Order.create(input);
}

export function findOrder(
    query: FilterQuery<OrderDocument>,
    options: QueryOptions = { lean: true, sort: { 'updatedAt': -1 } }
) {
    return Order.findOne(query, {}, options);
}

export function groupDateAndCount() {
    return Order.aggregate([
        { "$group": { _id: "$dateShipping", count: { $sum: 1 } } },
        { "$match": { "count": { $gte: 3 } } }
    ]);
}

export function CountOrder() {
    return Order.countDocuments();
}

export function findAndUpdate(
    query: FilterQuery<OrderDocument>,
    update: UpdateQuery<OrderDocument>,
    options: QueryOptions
) {
    return Order.findOneAndUpdate(query, update, options);
}

export function deleteOrder(query: FilterQuery<OrderDocument>) {
    return Order.deleteOne(query);
}
