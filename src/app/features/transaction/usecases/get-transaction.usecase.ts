import { Result } from "../../../shared/contracts/result.contract";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.adapter";
import { UserRepository } from "../../user/repositories/user.repository";
import { TransactionRepository } from "../repositories/transaction.repository";

interface GetTransactionParams {
    userId: string;
    transactionId: string;
}

export class GetTransactionUsecase {
    public async execute(params: GetTransactionParams): Promise<Result> {
        const cacheRepository = new CacheRepository();
        const cachedTransaction = await cacheRepository.get(`transaction-${params.transactionId}`);

        if (cachedTransaction) {
            return Return.success("Transaction successfully obtained", cachedTransaction);
        }

        const user = new UserRepository().get(params.userId);
        if (!user) {
            return Return.notFound("User");
        }

        const transactionRepository = new TransactionRepository();
        const transaction = await transactionRepository.get(params.transactionId);
        if (!transaction) {
            return Return.notFound("Transaction");
        }

        await cacheRepository.setEx(`transaction-${params.transactionId}`, transaction, 3600);

        return Return.success("Transaction successfully obtained", transaction);
    }
}
