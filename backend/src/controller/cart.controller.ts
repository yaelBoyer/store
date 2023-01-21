import { getCategories } from "../service/category.service";
import { get } from "lodash";
import { Request, Response } from "express";
import { createCart, findAndUpdate, getCart } from "../service/cart.service";
import { createCartItem, deleteCartItem, deleteManyCartItem, findAndUpdateCartItem, findCartItem } from "../service/cart-item.service";

export async function getUserCartOpenHandler(req: Request, res: Response) {
    const userId = get(req, "user.user");
    const cart = await getCart({ ordered: false, user: userId });
    return res.send(cart);
}

export async function createUserCartHandler(req: Request, res: Response) {
    const userId = get(req, "user.user");
    const body = req.body;
    const cart = await createCart({ ...body, user: userId });
    if (!cart) {
        return res.sendStatus(404);
    }
    return res.send(cart);
}

export async function addCartItemToCart(req: Request, res: Response) {
    const userId = get(req, "user.user");
    const cartId = get(req, "params.cartId");
    const body = req.body;

    const cart = await getCart({ _id: cartId });
    if (!cart) {
        return res.sendStatus(404);
    }

    if (String(cart.user) !== userId) {
        return res.sendStatus(401);
    }
    const cartItem = await createCartItem({ ...body });
    if (!cartItem) {
        return res.sendStatus(404);
    }
    const updateCart = await findAndUpdate({ _id: cartId }, { $push: { cartItems: cartItem._id } }, { new: true });
    if (!updateCart) {
        return res.sendStatus(404);
    }

    return res.send(cartItem);
}

export async function updateCartItemHandler(req: Request, res: Response) {
    const cartItemId = get(req, "params.cartItemId");
    var update = req.body;

    const cartItem = await findCartItem({ _id: cartItemId });

    if (!cartItem) {
        return res.sendStatus(404);
    }
    const updatedCartItem = await findAndUpdateCartItem({ _id: cartItemId }, update, { new: true });

    return res.send(updatedCartItem);
}

export async function deleteCartItemHandler(req: Request, res: Response) {
    const userId = get(req, "user.user");
    const cartId = get(req, "params.cartId");

    const cart = await getCart({ _id: cartId });
    if (!cart) {
        return res.sendStatus(404);
    }

    if (String(cart.user) !== userId) {
        return res.sendStatus(401);
    }

    await deleteCartItem({ _id: req.body._id });
    const updateCart = await findAndUpdate({ _id: cartId }, { $pull: { cartItems: req.body._id } }, { new: true });
    if (!updateCart) {
        return res.sendStatus(404);
    }

    return res.send(updateCart);
}

export async function deleteAllCartItemHandler(req: Request, res: Response) {
    const userId = get(req, "user.user");
    const cartId = get(req, "params.cartId");

    const cart = await getCart({ _id: cartId });
    if (!cart) {
        return res.sendStatus(404);
    }

    if (String(cart.user) !== userId) {
        return res.sendStatus(401);
    }

    cart.cartItems.forEach(async i => {
        await deleteCartItem({ _id: i._id });
    });

    cart.cartItems = [];
    const updateCart = await findAndUpdate({ _id: cartId }, cart, { new: true });
    if (!updateCart) {
        return res.sendStatus(404);
    }

    return res.send(updateCart);
}



