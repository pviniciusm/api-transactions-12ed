import { transactionsList } from "../data/transactions";
import { Database } from "../database/config/database.connection";
import { TransactionEntity } from "../database/entities/transaction.entity";
import { Transaction, TransactionType } from "../models/transaction.model";
import { User } from "../models/user.model";
import { UserRepository } from "./user.repository";

interface ListTransactionsParams {
    userId: string;
    type?: TransactionType;
}

export class TransactionRepository {
    private repository = Database.connection.getRepository(TransactionEntity);

    public async create(transaction: Transaction) {
        const transactionEntity = this.repository.create({
            id: transaction.id,
            type: transaction.type,
            title: transaction.title,
            idUser: transaction.user.id,
            value: transaction.value,
        });

        // // Active Record
        // await transactionEntity.save();

        // Data Mapper
        await this.repository.save(transactionEntity);
    }

    public async list(params: ListTransactionsParams) {
        const result = await this.repository.find({
            where: {
                idUser: params.userId,
                type: params.type,
            },
            relations: {
                user: true,
            },
        });

        // const result = await this.repository.findBy({
        //     idUser: params.userId,
        //     type: params.type,
        // });

        return result.map((row) => this.mapRowToModel(row));
    }

    public async get(id: string) {
        const result = await this.repository.findOneBy({
            id,
        });

        if (!result) {
            return undefined;
        }

        return this.mapRowToModel(result);
    }

    public getIndex(id: string) {
        return transactionsList.findIndex((transaction) => transaction.id === id);
    }

    public async delete(id: string) {
        const result = await this.repository.delete({
            id,
        });

        return result.affected ?? 0;
    }

    public async update(transaction: Transaction) {
        await this.repository.update(
            {
                id: transaction.id,
            },
            {
                type: transaction.type,
                value: transaction.value,
            }
        );
    }

    public async updateWithSave(transaction: Transaction) {
        const entity = await this.repository.findOneBy({
            id: transaction.id,
        });

        if (!entity) {
            return undefined;
        }

        entity.type = transaction.type;
        entity.value = transaction.value;

        this.repository.save(entity);
    }

    private mapRowToModel(row: TransactionEntity) {
        const user = UserRepository.mapRowToModel(row.user);

        return Transaction.create(row, user);
    }
}
