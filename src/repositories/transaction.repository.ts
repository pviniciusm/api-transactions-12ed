import { transactionsList } from "../data/transactions";
import { Database } from "../database/database.connection";
import { Transaction, TransactionType } from "../models/transaction.model";
import { UserRepository } from "./user.repository";

interface ListTransactionsParams {
    userId: string;
    type?: TransactionType;
}

export class TransactionRepository {
    private connection = Database.connection;

    public async create(transaction: Transaction) {
        let query = `insert into transactions.transaction `;
        query += `(id, title, value, type, id_user) `;
        query += `values`;
        query += `('${transaction.id}', '${transaction.title}', ${transaction.value}, '${transaction.type}', '${transaction.user.id}')`;

        console.log(query);

        await this.connection.query(query);
    }

    public async list(params: ListTransactionsParams) {
        console.log(params);

        let query = "select * from transactions.transaction ";
        query += `where id_user = '${params.userId}' `;

        if (params.type) {
            query += `and type = '${params.type}'`;
        }

        const result = await this.connection.query(query);
        return result.rows.map((row) => this.mapRowToModel(row));
    }

    public get(id: string) {
        return transactionsList.find((transaction) => transaction.id === id);
    }

    public getIndex(id: string) {
        return transactionsList.findIndex((transaction) => transaction.id === id);
    }

    public async delete(id: string) {
        const result = await this.connection.query(`delete from transactions.transaction where id = '${id}'`);
        console.log(result);

        return result.rowCount;
    }

    private mapRowToModel(row: any) {
        console.log(row);

        const user = UserRepository.mapRowToModel(row);

        return Transaction.create(row, user);
    }
}
