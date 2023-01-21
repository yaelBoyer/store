import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { findUser } from "../service/user.service";
import { Role } from "../model/user.model";

const requiresAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user:any = get(req, "user");

    if (!user) {
        return res.sendStatus(403);
    }
    const userRole = await findUser({ _id: user.user });

    if (userRole?.role != Role.ADMIN)
        return res.sendStatus(403);
    return next();
};

export default requiresAdmin;
