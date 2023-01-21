import config from "config";
import { Request, Response } from "express";
import { get, omit } from "lodash";
import { createAccessToken, createSession } from "../service/session.service";
import { createUser, findUser } from "../service/user.service";
import { sign } from "../utils/jwt.utils";
// import log from "../logger";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    // Create a session
    const session: any = await createSession(user._id, req.get("user-agent") || "");

    // create access token
    const accessToken = createAccessToken({
      user,
      session,
    });

    // create refresh token
    const refreshToken = sign(session, {
      expiresIn: config.get("refreshTokenTtl"),
    });

    // send refresh & access token back
    return res.send({ accessToken, refreshToken });
  } catch (e: any) {
    // log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function GetUserHandler(req: Request, res: Response) {
  try {
    const userId = get(req, "user.user");
    const user = await findUser({ _id: userId });
    return res.send(omit(user, "password"));

  } catch (e: any) {
    // log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function CheckEmailUniquHandler(req: Request, res: Response) {
  try {
    const user = await findUser({ email: req.body.email });
    return res.send({ status: user != null ? false : true });

  } catch (e: any) {
    // log.error(e);
    return res.status(409).send(e.message);
  }
}
