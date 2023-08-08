import { Transaction, TransactionType } from "../../../models/transaction.model";
import { Result } from "../../../shared/contracts/result.contract";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.adapter";
import { TransactionRepository } from "../repositories/transaction.repository";

interface ListTransactionsParams {
    userId: string;
    type?: TransactionType;
}

export class ListTransactionsUsecase {
    public async execute(params: ListTransactionsParams): Promise<Result> {
        // 1 - verifica se está em cache
        const cacheRepository = new CacheRepository();
        const cachedTransactions = await cacheRepository.get(`transactions-${params.userId}`);

        // 2 - se está, retorna o que estiver em cache
        if (cachedTransactions) {
            return Return.success("Transactions successfully listed", cachedTransactions);
        }

        let transactions = await new TransactionRepository().list({
            userId: params.userId,
            type: params.type,
        });

        let income = this.sumTransactionsValues(transactions, TransactionType.Income);
        let outcome = this.sumTransactionsValues(transactions, TransactionType.Outcome);

        const result = {
            transactions: transactions.map((transaction) => transaction.toJson()),
            balance: {
                income,
                outcome,
                total: income - outcome,
            },
        };

        // 3 - se não está, salva em cache
        await cacheRepository.set(`transactions-${params.userId}`, result);

        return Return.success("Transactions successfully listed", result);
    }

    private sumTransactionsValues(transactions: Transaction[], type: TransactionType): number {
        return transactions.filter((t) => t.type === type).reduce((soma, transaction) => soma + transaction.value, 0);
    }
}
