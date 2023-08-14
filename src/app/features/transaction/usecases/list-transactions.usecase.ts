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
    constructor(private cacheRepository: CacheRepository, private transactionRepository: TransactionRepository) {}

    public async execute(params: ListTransactionsParams): Promise<Result> {
        // 1 - verifica se está em cache
        const cachedTransactions = await this.cacheRepository.get(`transactions-${params.userId}`);

        // 2 - se está, retorna o que estiver em cache
        if (cachedTransactions) {
            return Return.success("Transactions successfully listed", cachedTransactions);
        }

        let transactions = await this.transactionRepository.list({
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
        await this.cacheRepository.setEx(`transactions-${params.userId}`, result, 3600);
        // TTL => Time To Live (ou seja, tempo de expiração)

        return Return.success("Transactions successfully listed", result);
    }

    private sumTransactionsValues(transactions: Transaction[], type: TransactionType): number {
        return transactions.filter((t) => t.type === type).reduce((soma, transaction) => soma + transaction.value, 0);
    }
}
