import { Request, Response } from "express";
import { HttpResponse } from "../../../shared/util/http-response.adapter";
import { Transaction, TransactionType } from "../../../models/transaction.model";
import { UserRepository } from "../../user/repositories/user.repository";
import { TransactionRepository } from "../repositories/transaction.repository";
import { UpdateTransactionUsecase } from "../usecases/update-transaction.usecase";
import { ListTransactionsUsecase } from "../usecases/list-transactions.usecase";

/**
 * teste
 */
export class TransactionController {
    public async create(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { title, type, value } = req.body;

            const user = await new UserRepository().get(userId);
            if (!user) {
                return HttpResponse.notFound(res, "User");
            }

            const transaction = new Transaction(title, value, type, user);
            await new TransactionRepository().create(transaction);

            return HttpResponse.created(res, "Transaction successfully created", transaction);
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }

    public async list(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { type } = req.query;

            const result = await new ListTransactionsUsecase().execute({
                userId,
                type: type as TransactionType,
            });

            return res.status(result.code).send(result);
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }

    public async get(req: Request, res: Response) {
        try {
            const { userId, transactionId } = req.params;

            const user = new UserRepository().get(userId);
            if (!user) {
                return HttpResponse.notFound(res, "User");
            }

            const transactionRepository = new TransactionRepository();
            const transaction = await transactionRepository.get(transactionId);
            if (!transaction) {
                return HttpResponse.notFound(res, "Transaction");
            }

            return HttpResponse.success(res, "Transaction successfully obtained", transaction.toJson());
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { userId, transactionId } = req.params;

            const user = await new UserRepository().get(userId);
            if (!user) {
                return HttpResponse.notFound(res, "User");
            }

            const transactionRepository = new TransactionRepository();
            const deletedTransactions = await transactionRepository.delete(transactionId);

            if (deletedTransactions == 0) {
                return HttpResponse.notFound(res, "Transaction");
            }

            const transactions = await transactionRepository.list({
                userId,
            });

            return HttpResponse.success(
                res,
                "Transaction successfully deleted",
                transactions.map((transaction) => transaction.toJson())
            );
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { userId, transactionId } = req.params;
            const { type, value } = req.body;

            const result = await new UpdateTransactionUsecase().execute({
                type: type as TransactionType,
                value,
                userId,
                transactionId,
            });

            return res.status(result.code).send(result);
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }
}
