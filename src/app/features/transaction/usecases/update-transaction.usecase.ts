import { TransactionType } from "../../../models/transaction.model";
import { Result } from "../../../shared/contracts/result.contract";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.adapter";
import { UserRepository } from "../../user/repositories/user.repository";
import { TransactionRepository } from "../repositories/transaction.repository";

interface UpdateTransactionParams {
    userId: string;
    transactionId: string;
    type?: TransactionType;
    value?: number;
}

/**
 * adsadsa
 */
export class UpdateTransactionUsecase {
    /**
     * Executa o usecase de atualização de uma transação e registra no banco de dados.
     * @param params ID do user e da transação + valores a serem alterados.
     * @returns lista de transações atualizada.
     * @deprecated usar o Usecase Update2Usecase
     * @async este código é assíncrono
     * @author Paulo Cardoso
     * @example [{}]
     */
    public async execute(params: UpdateTransactionParams): Promise<Result> {
        const user = new UserRepository().get(params.userId);
        if (!user) {
            return Return.notFound("User");
        }

        // Busca a transação no BD
        const transactionRepository = new TransactionRepository();
        const transaction = await transactionRepository.get(params.transactionId);
        if (!transaction) {
            return Return.notFound("Transaction");
        }

        // Apenas atualiza os dados se forem informados nos params
        if (params.type) {
            transaction.type = params.type;
        }

        if (params.value) {
            transaction.value = params.value;
        }

        await transactionRepository.update(transaction);
        await new CacheRepository().delete(`transactions-${params.userId}`);
        await new CacheRepository().delete(`transaction-${params.transactionId}`);

        const transactions = await transactionRepository.list({
            userId: params.userId,
        });

        return Return.success(
            "Transaction successfully updated",
            transactions.map((transaction) => transaction.toJson())
        );
    }
}
