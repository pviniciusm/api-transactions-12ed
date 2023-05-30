import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";

export const transactionRoutes = () => {
    const app = Router({
        mergeParams: true,
    });

    app.get("/", new TransactionController().list);
    app.post("/", new TransactionController().create);

    return app;
};
