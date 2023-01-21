import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
  } from "mongoose";
import Category, { CategoryDocument } from "../model/category.model";

  export function getCategories(
    query: FilterQuery<CategoryDocument>,
    options: QueryOptions = { lean: true }
) {
    return Category.find(query, {}, options);
}