import { get } from "lodash";
import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
  createSession,
  createAccessToken,
  updateSession,
  findSessions,
} from "../service/session.service";
import { sign } from "../utils/jwt.utils";
import config from "config";
import { CountProduct, createProduct, findAndUpdate, findProduct, getAllProducts } from "../service/product.service";



export async function getCountProduct(req: Request, res: Response) {
  const countP = await CountProduct();
  return res.send({ count: countP });
}

export async function createProductHandler(req: Request, res: Response) {
  const body = { ...req.body, imageUrl: "uploads/" + req.file?.filename };
  const post = await createProduct({ ...body });
  return res.send(post);
}

export async function updatePoroductHandler(req: Request, res: Response) {
  const productId = get(req, "params.productId");
  var update = {};
  if (req.file)
    update = { ...req.body, imageUrl: "uploads/" + req.file?.filename };
  else update = req.body;

  const product = await findProduct({ product: productId });

  if (!product) {
    return res.sendStatus(404);
  }

  const updatedProduct = await findAndUpdate({ product: productId }, update, { new: true });

  return res.send(updatedProduct);
}

export async function getProductsHandler(req: Request, res: Response) {
  const products = await getAllProducts({});
  if (!products) {
    return res.sendStatus(404);
  }
  return res.send(products);
}

export async function getProductsByCategoryHandler(req: Request, res: Response) {
  const categoryId = get(req, "params.categoryId");
  const products = await getAllProducts({ "category": categoryId });
  if (!products) {
    return res.sendStatus(404);
  }
  return res.send(products);
}

export async function getProductsByNameHandler(req: Request, res: Response) {
  const name = get(req, "params.name");
  const products = await getAllProducts({ "name": name });
  if (!products) {
    return res.sendStatus(404);
  }
  return res.send(products);
}
