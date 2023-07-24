import { Request, Response } from "express";
import { HttpResponse } from "../util/http-response.adapter";
import { Transaction, TransactionType } from "../app/models/transaction.model";
import { UserRepository } from "../repositories/user.repository";
import { TransactionRepository } from "../repositories/transaction.repository";

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

            let transactions = await new TransactionRepository().list({
                userId: userId,
                type: type as TransactionType,
            });

            let income = this.sumTransactionsValues(transactions, TransactionType.Income);
            let outcome = this.sumTransactionsValues(transactions, TransactionType.Outcome);

            return HttpResponse.success(res, "Transactions successfully listed", {
                transactions: transactions.map((transaction) => transaction.toJson()),
                balance: {
                    income,
                    outcome,
                    total: income - outcome,
                },
            });
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

            const user = new UserRepository().get(userId);
            if (!user) {
                return HttpResponse.notFound(res, "User");
            }

            const transactionRepository = new TransactionRepository();
            const transaction = await transactionRepository.get(transactionId);
            if (!transaction) {
                return HttpResponse.notFound(res, "Transaction");
            }

            if (type) {
                transaction.type = type as TransactionType;
            }

            if (value) {
                transaction.value = value;
            }

            await transactionRepository.update(transaction);

            const transactions = await transactionRepository.list({
                userId,
            });

            return HttpResponse.success(
                res,
                "Transaction successfully updated",
                transactions.map((transaction) => transaction.toJson())
            );
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }

    private sumTransactionsValues(transactions: Transaction[], type: TransactionType): number {
        return transactions.filter((t) => t.type === type).reduce((soma, transaction) => soma + transaction.value, 0);
    }
}
