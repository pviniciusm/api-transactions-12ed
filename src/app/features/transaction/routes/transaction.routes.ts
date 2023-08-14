import { Request, Response, Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { UserMiddleware } from "../../user/validators/user.middleware";
import { TransactionMiddleware } from "../validators/transaction.middleware";
import { UserRepository } from "../../user/repositories/user.repository";
import { TransactionRepository } from "../repositories/transaction.repository";
import { createTransactionController } from "../util/transaction.factory";

export const transactionRoutes = () => {
    const app = Router({
        mergeParams: true,
    });

    const controller = createTransactionController();

    app.get("/", [UserMiddleware.validateUserExists], (req: Request, res: Response) => controller.list(req, res));
    app.get("/:transactionId", (req: Request, res: Response) => controller.get(req, res));
    app.post("/", [TransactionMiddleware.validateFieldsCreate], controller.create);
    app.delete("/:transactionId", controller.delete);
    app.put("/:transactionId", controller.update);

    return app;
};
