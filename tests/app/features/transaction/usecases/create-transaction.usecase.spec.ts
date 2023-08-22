import { TransactionRepository } from "../../../../../src/app/features/transaction/repositories/transaction.repository";
import { CreateTransactionUsecase } from "../../../../../src/app/features/transaction/usecases/create-transaction.usecase";
import { UserRepository } from "../../../../../src/app/features/user/repositories/user.repository";
import { TransactionType } from "../../../../../src/app/models/transaction.model";
import { User } from "../../../../../src/app/models/user.model";
import { Database } from "../../../../../src/main/database/database.connection";
import { CacheDatabase } from "../../../../../src/main/database/redis.connection";

describe("Testes unitários do usecase que cria transactions", () => {
    beforeAll(async () => {
        await Database.connect();
        await CacheDatabase.connect();
    });

    const createSut = () => {
        const userRepo = new UserRepository();
        const transactionRepo = new TransactionRepository();

        const sut = new CreateTransactionUsecase(userRepo, transactionRepo);

        return sut;
    };

    // 1- deveria retornar notFound quando o usuario nao existir
    test("deveria retornar notFound quando o usuario nao existir", async () => {
        const sut = createSut();

        jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(undefined);

        const result = await sut.execute({
            title: "any_title",
            type: TransactionType.Income,
            value: 10,
            userId: "any_user_id",
        });

        expect(result).toBeDefined();
        expect(result.code).toBe(404);
        expect(result.ok).toBe(false);
        expect(result.message).toBe("User not found");
    });

    // 2- deveria retornar 200 e a transaction criada quando os parâmetros estiverem corretos
    test("deveria retornar 201 e a transaction criada quando os parâmetros estiverem corretos", async () => {
        const sut = createSut();

        jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(new User("nome", 54654, "email", 54, "321654654"));

        jest.spyOn(TransactionRepository.prototype, "create").mockResolvedValue();

        const result = await sut.execute({
            title: "any_title",
            type: TransactionType.Income,
            value: 10,
            userId: "any_user_id",
        });

        expect(result).toBeDefined();
        expect(result.code).toBe(201);
        expect(result.ok).toBe(true);
        expect(result.message).toBe("Transaction successfully created");

        expect(result).toHaveProperty("data");
        expect(result.data).toHaveProperty("id");
        expect(result.data).toHaveProperty("title", "any_title");
        expect(result.data).toHaveProperty("type", TransactionType.Income);
        expect(result.data).toHaveProperty("value", 10);
    });
});
