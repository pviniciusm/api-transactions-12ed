import { TransactionRepository } from "../../../../../src/app/features/transaction/repositories/transaction.repository";
import { UpdateTransactionUsecase } from "../../../../../src/app/features/transaction/usecases/update-transaction.usecase";
import { UserRepository } from "../../../../../src/app/features/user/repositories/user.repository";
import { Transaction, TransactionType } from "../../../../../src/app/models/transaction.model";
import { User } from "../../../../../src/app/models/user.model";
import { Result } from "../../../../../src/app/shared/contracts/result.contract";
import { CacheRepository } from "../../../../../src/app/shared/database/repositories/cache.repository";
import { Database } from "../../../../../src/main/database/database.connection";
import { CacheDatabase } from "../../../../../src/main/database/redis.connection";

// ..
describe("Testes unitários do usecase que atualiza transactions", () => {
    beforeAll(async () => {
        await Database.connect();
        await CacheDatabase.connect();
    });

    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();

        jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(user);
        jest.spyOn(TransactionRepository.prototype, "get").mockResolvedValue(transaction);
        jest.spyOn(CacheRepository.prototype, "delete").mockResolvedValue();
        jest.spyOn(TransactionRepository.prototype, "update").mockResolvedValue();
        jest.spyOn(TransactionRepository.prototype, "list").mockResolvedValue(transactions);
    });

    const createSut = () => {
        const sut = new UpdateTransactionUsecase();

        return sut;
    };

    const expectFalha = (result: Result) => {
        expect(result).toBeDefined();
        expect(result.ok).toBe(false);
        expect(result).not.toHaveProperty("data");
    };

    const user = new User("nome", 123456, "teste@teste", 20, "123456789");
    const transaction = new Transaction("any_title", 2, TransactionType.Income, user);
    const transactions = [transaction];

    test("deveria retornar not found quando o usuario nao existir", async () => {
        const sut = createSut();

        jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(undefined);

        const result = await sut.execute({
            userId: "any_id",
            transactionId: "any_transaction",
        });

        expectFalha(result);
        expect(result.code).toBe(404);
        expect(result.message).toEqual("User not found");
    });

    test("deveria retornar not found quando a transaction não existir", async () => {
        const sut = createSut();

        jest.spyOn(TransactionRepository.prototype, "get").mockResolvedValue(undefined);

        const result = await sut.execute({
            userId: "any_id",
            transactionId: "any_transaction",
        });

        expectFalha(result);
        expect(result.code).toBe(404);
        expect(result.message).toEqual("Transaction not found");
    });

    test("deveria retornar success caso passe em todas as validações", async () => {
        const sut = createSut();

        const result = await sut.execute({
            userId: "any_id",
            transactionId: "any_transaction",
        });

        expect(result).toBeDefined();
        expect(result.code).toBe(200);
        expect(result.ok).toBe(true);
        expect(result).toHaveProperty(
            "data",
            transactions.map((transaction) => transaction.toJson())
        );
        expect(result.data).toHaveLength(transactions.length);
        expect(result.message).toEqual("Transaction successfully updated");
    });

    test("deveria retornar success caso passe em todas as validações e informe novo type e novo value", async () => {
        const sut = createSut();

        const result = await sut.execute({
            userId: "any_id",
            transactionId: "any_transaction",
            type: TransactionType.Income,
            value: 12,
        });

        expect(result).toBeDefined();
        expect(result.code).toBe(200);
        expect(result.ok).toBe(true);
        expect(result).toHaveProperty(
            "data",
            transactions.map((transaction) => transaction.toJson())
        );
        expect(result.data).toHaveLength(transactions.length);
        expect(result.message).toEqual("Transaction successfully updated");
    });

    test("deveria retornar success caso passe em todas as validações e informe apenas um novo value", async () => {
        const sut = createSut();

        const result = await sut.execute({
            userId: "any_id",
            transactionId: "any_transaction",
            value: 12,
        });

        expect(result).toBeDefined();
        expect(result.code).toBe(200);
        expect(result.ok).toBe(true);
        expect(result).toHaveProperty(
            "data",
            transactions.map((transaction) => transaction.toJson())
        );
        expect(result.data).toHaveLength(transactions.length);
        expect(result.message).toEqual("Transaction successfully updated");
    });
});

//..
