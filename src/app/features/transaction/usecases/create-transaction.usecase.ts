import { Transaction, TransactionType } from "../../../models/transaction.model";
import { Result } from "../../../shared/contracts/result.contract";
import { UserRepositoryContract } from "../../../shared/contracts/user-repo.contract";
import { Return } from "../../../shared/util/return.adapter";
import { TransactionRepository } from "../repositories/transaction.repository";

interface CreateTransactionParams {
    userId: string;
    title: string;
    value: number;
    type: TransactionType;
}

export class CreateTransactionUsecase {
    // Padrão - Injeção de dependência
    // Padrão - Inversão de dependência
    constructor(private userRepository: UserRepositoryContract, private transactionRepository: TransactionRepository) {}

    public async execute(params: CreateTransactionParams): Promise<Result> {
        const user = await this.userRepository.get(params.userId);
        if (!user) {
            return Return.notFound("User");
        }

        const transaction = new Transaction(params.title, params.value, params.type, user);
        await this.transactionRepository.create(transaction);

        return Return.success("Transaction successfully created", transaction);
    }
}
