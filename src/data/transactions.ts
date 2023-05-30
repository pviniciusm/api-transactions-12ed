import { Transaction, TransactionType } from "../models/transaction.model";
import { usersList } from "./users";

export const transactionsList: Transaction[] = [
    new Transaction("Mercado", 500, TransactionType.Outcome, usersList[0]),
    new Transaction("Salario", 60000, TransactionType.Income, usersList[0]),
    new Transaction(
        "Compra do AP",
        80000,
        TransactionType.Outcome,
        usersList[0]
    ),
];
