import { getCategories } from "../service/category.service";
import { get } from "lodash";
import { Request, Response } from "express";

export async function getCategoriesHandler(req: Request, res: Response) {
    const categories = await getCategories({});
    if (!categories) {
        return res.sendStatus(404);
    }
    return res.send(categories);
}