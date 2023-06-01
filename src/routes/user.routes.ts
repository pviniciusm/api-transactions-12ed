import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { transactionRoutes } from "./transaction.routes";

export const appRoutes = () => {
    const app = Router();

    app.post("/", new UserController().create);
    app.get("/", new UserController().list);
    app.get("/:id", new UserController().get);

    app.post("/login", new UserController().login);

    app.use("/:userId/transactions", transactionRoutes());

    return app;
};
