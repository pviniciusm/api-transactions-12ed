import { User } from "../../../models/user.model";
import { UserRepositoryContract } from "../../../shared/contracts/user-repo.contract";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { UserRepository } from "../../user/repositories/user.repository";
import { TransactionController } from "../controllers/transaction.controller";
import { TransactionRepository } from "../repositories/transaction.repository";
import { CreateTransactionUsecase } from "../usecases/create-transaction.usecase";
import { ListTransactionsUsecase } from "../usecases/list-transactions.usecase";

class PrismaUserRepo implements UserRepositoryContract {
    public async get(): Promise<User | undefined> {
        return new User("name", 2123, "email", 123, "asdsadsa");
    }
}

export function createTransactionController() {
    const userRepoSigleton = new UserRepository();
    const primsaUserRepo = new PrismaUserRepo();

    const transactionRepoSigleton = new TransactionRepository();
    const cacheRepo = new CacheRepository();

    const usecase = new CreateTransactionUsecase(userRepoSigleton, transactionRepoSigleton);
    const listUsecase = new ListTransactionsUsecase(cacheRepo, transactionRepoSigleton);

    return new TransactionController(usecase, listUsecase);
}

class SimulatedUserRepository implements UserRepositoryContract {
    public async get(): Promise<User | undefined> {
        return new User("name", 2123, "email", 123, "asdsadsa");
    }
}

export function createTestTransactionController() {
    const userRepoSigleton = new SimulatedUserRepository();
    const transactionRepoSigleton = new TransactionRepository();
    const cacheRepo = new CacheRepository();

    const usecase = new CreateTransactionUsecase(userRepoSigleton, transactionRepoSigleton);
    const listUsecase = new ListTransactionsUsecase(cacheRepo, transactionRepoSigleton);

    return new TransactionController(usecase, listUsecase);
}
