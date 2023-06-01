import { transactionsList } from "../data/transactions";
import { Transaction, TransactionType } from "../models/transaction.model";

interface ListTransactionsParams {
    userId: string;
    type?: TransactionType;
}

export class TransactionRepository {
    public create(transaction: Transaction) {
        transactionsList.push(transaction);
    }

    public list(params: ListTransactionsParams) {
        return transactionsList.filter(
            (transaction) =>
                transaction.user.id === params.userId &&
                (!params.type || transaction.type === params.type)
        );
    }
}
