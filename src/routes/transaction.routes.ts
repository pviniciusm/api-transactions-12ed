import { Request, Response, Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { UserMiddleware } from "../middlewares/user.middleware";
import { TransactionMiddleware } from "../middlewares/transaction.middleware";

export const transactionRoutes = () => {
    const app = Router({
        mergeParams: true,
    });

    const controller = new TransactionController();

    app.get("/", [UserMiddleware.validateUserExists], (req: Request, res: Response) => controller.list(req, res));
    app.post("/", [TransactionMiddleware.validateFieldsCreate], controller.create);
    app.delete("/:transactionId", controller.delete);
    app.put("/:transactionId", controller.update);

    return app;
};
