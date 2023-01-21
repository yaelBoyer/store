import { Express, Request, Response } from "express";
import {
  createPostHandler,
  updatePostHandler,
  getPostHandler,
  deletePostHandler,
} from "./controller/post.controller";
import { CheckEmailUniquHandler, createUserHandler, GetUserHandler } from "./controller/user.controller";
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { validateRequest, requiresUser } from "./middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";
import {
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
} from "./schema/post.schema";
import { createOrderHandler, getAllCatchOrderHandler, getCountOrder, getLastOrderHandler } from "./controller/order.controller";
import { createProductHandler, getCountProduct, getProductsByCategoryHandler, getProductsByNameHandler, getProductsHandler, updatePoroductHandler } from "./controller/product.controller";
import multer from "./middleware/multer";
import requiresAdmin from "./middleware/requiresAdmin";
import { createProductSchema, updateProductSchema } from "./schema/product.schema";
import { getCategoriesHandler } from "./controller/category.controller";
import { addCartItemToCart, createUserCartHandler, deleteAllCartItemHandler, deleteCartItemHandler, getUserCartOpenHandler, updateCartItemHandler } from "./controller/cart.controller";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // Login
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/users/details", requiresUser, GetUserHandler);

  app.post("/api/users/checkEmailUniqu", [], CheckEmailUniquHandler);
  // Get the user's sessions
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  // Logout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  // Create a post
  app.post(
    "/api/posts",
    [requiresUser, validateRequest(createPostSchema)],
    createPostHandler
  );

  // Update a post
  app.put(
    "/api/posts/:postId",
    [requiresUser, validateRequest(updatePostSchema)],
    updatePostHandler
  );

  // Get a post
  app.get("/api/posts/:postId", getPostHandler);

  // Delete a post
  app.delete(
    "/api/posts/:postId",
    [requiresUser, validateRequest(deletePostSchema)],
    deletePostHandler
  );

  app.get("/api/orders/count", [], getCountOrder);
  app.get("/api/orders/lastOrder", requiresUser, getLastOrderHandler);

  app.get("/api/products/count", [], getCountProduct);
  app.post("/api/products/create", [requiresAdmin, multer.single('image')], createProductHandler);
  app.put("/api/products/:productId", [requiresAdmin, multer.single('image')], updatePoroductHandler);
  app.get("/api/products", requiresUser, getProductsHandler);
  app.get("/api/products/byCategory/:categoryId", requiresUser, getProductsByCategoryHandler);
  app.get("/api/products/byName/:name", requiresUser, getProductsByNameHandler);

  app.get("/api/categories", requiresUser, getCategoriesHandler);

  app.get("/api/carts", requiresUser, getUserCartOpenHandler);
  app.post("/api/carts", requiresUser, createUserCartHandler);

  app.post("/api/cartItems/add/:cartId", requiresUser, addCartItemToCart);
  app.put("/api/cartItems/update/:cartItemId", requiresUser, updateCartItemHandler);
  app.put("/api/cartItems/delete/:cartId", requiresUser, deleteCartItemHandler);
  app.delete("/api/cartItems/deleteAll/:cartId", requiresUser, deleteAllCartItemHandler);

  app.get("/api/orders/getAllCatchOrders", requiresUser, getAllCatchOrderHandler);
  app.post("/api/orders/create", requiresUser, createOrderHandler);

}
