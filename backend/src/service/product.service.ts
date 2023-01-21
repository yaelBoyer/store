import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
} from "mongoose";
import Category from "../model/category.model";
import Product, { ProductDocument } from "../model/product.model";

export function createProduct(input: DocumentDefinition<ProductDocument>) {
    return Product.create(input);
}

export function findProduct(
    query: FilterQuery<ProductDocument>,
    options: QueryOptions = { lean: true }
) {
    return Product.findOne(query, {}, options);
}

export function findAndUpdate(
    query: FilterQuery<ProductDocument>,
    update: UpdateQuery<ProductDocument>,
    options: QueryOptions
) {
    return Product.findOneAndUpdate(query, update, options);
}

export function deleteProduct(query: FilterQuery<ProductDocument>) {
    return Product.deleteOne(query);
}

export function getAllProducts(
    query: FilterQuery<ProductDocument>,
    options: QueryOptions = { lean: true }
) {
    return Product.find(query, {}, options).sort({ 'createdAt': -1 }).populate({ path: 'category', model: Category, select: 'name' });
}

export function CountProduct(): any {
    return Product.countDocuments();
}
