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
import { CountOrder, createOrder, findOrder, groupDateAndCount } from "../service/order.service";
import { findAndUpdate, getCart } from "../service/cart.service";

export async function createOrderHandler(req: Request, res: Response) {
    const userId = get(req, "user.user");
    const body = req.body;

    const order = await createOrder({ ...body, user: userId });

    const cart = await getCart({ _id: order.cart });
    if (!cart) {
        return res.sendStatus(404);
    }

    if (String(cart.user) !== userId) {
        return res.sendStatus(401);
    }

    cart.ordered = true;
    const updatedCart = await findAndUpdate({ _id: cart._id }, cart, { new: true });
    if (!updatedCart) {
        return res.sendStatus(404);
    }
    return res.send(order);
}

export async function getCountOrder(req: Request, res: Response) {
    const countOrder = await CountOrder();
    return res.send({ count: countOrder });

}

export async function getLastOrderHandler(req: Request, res: Response) {
    const userId = get(req, "user.user");
    const order = await findOrder({}, { lean: true, sort: { 'updatedAt': -1 } });
    if (!order) {
        return res.sendStatus(404);
    }
    return res.send(order);
}

export async function getAllCatchOrderHandler(req: Request, res: Response) {
    const userId = get(req, "user.user");
    const datesOrder = await groupDateAndCount();
    if (!datesOrder) {
        return res.sendStatus(404);
    }
    return res.send(datesOrder);
}