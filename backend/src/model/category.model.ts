import mongoose from "mongoose";
import { nanoid } from "nanoid";

export interface CategoryDocument extends mongoose.Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
    },
    { timestamps: true }
);

const Category = mongoose.model<CategoryDocument & mongoose.Document>("Category", CategorySchema);

export default Category;
