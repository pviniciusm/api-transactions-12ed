import { Request, Response } from "express";
import { HttpResponse } from "../util/http-response.adapter";
import { usersList } from "../data/users";
import { transactionsList } from "../data/transactions";
import { Transaction, TransactionType } from "../models/transaction.model";

export class TransactionController {
    public create(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { title, type, value } = req.body;

            if (!title) {
                return HttpResponse.fieldNotProvided(res, "Title");
            }

            if (!type) {
                return HttpResponse.fieldNotProvided(res, "type");
            }

            const allowedTypes = Object.values(TransactionType);

            if (!allowedTypes.includes(type)) {
                return HttpResponse.invalid(res, "Type");
            }

            if (!value) {
                return HttpResponse.fieldNotProvided(res, "value");
            }

            const user = usersList.find((user) => user.id === userId);
            if (!user) {
                return HttpResponse.notFound(res, "User");
            }

            const transaction = new Transaction(title, value, type, user);
            transactionsList.push(transaction);

            return HttpResponse.created(
                res,
                "Transaction successfully created",
                transaction
            );
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }

    public list(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { type } = req.query;

            const user = usersList.find((user) => user.id === userId);
            if (!user) {
                return HttpResponse.notFound(res, "User");
            }

            let transactions = transactionsList.filter(
                (transaction) =>
                    transaction.user.id === userId &&
                    (!type || transaction.type === type)
            );

            let income = transactions
                .filter((t) => t.type === TransactionType.Income)
                .reduce((soma, transaction) => soma + transaction.value, 0);

            let outcome = transactions
                .filter((t) => t.type === TransactionType.Outcome)
                .reduce((soma, transaction) => soma + transaction.value, 0);

            return HttpResponse.success(
                res,
                "Transactions successfully listed",
                {
                    transactions,
                    balance: {
                        income,
                        outcome,
                        total: income - outcome,
                    },
                }
            );
        } catch (error: any) {
            return HttpResponse.genericError(res, error);
        }
    }
}
