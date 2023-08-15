import { UserRepository } from "../../../../../src/app/features/user/repositories/user.repository";
import { ListUsersUsecase } from "../../../../../src/app/features/user/usecases/list-users.usecase";
import { User } from "../../../../../src/app/models/user.model";
import { CacheRepository } from "../../../../../src/app/shared/database/repositories/cache.repository";
import { Database } from "../../../../../src/main/database/database.connection";
import { CacheDatabase } from "../../../../../src/main/database/redis.connection";

describe("Testes para a o list-users usecase", () => {
    beforeAll(async () => {
        await Database.connect();
        await CacheDatabase.connect();

        jest.setTimeout(30000);
    });

    afterAll(async () => {
        await Database.connection.destroy();
        await CacheDatabase.connection.quit();
    });

    // 1- quando houver cache, deve ser retornado o que estiver em cache
    // 2- quando não houver cache, e não houver users, a lista deve ser vazia
    // 3- quando não houver cache, e existirem usuários, a lista deve vir populada

    test("deveria retornar sucesso e indicação de cache se houve cache para a lista de usuários", async () => {
        const sut = new ListUsersUsecase();

        jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(true);

        const result = await sut.execute();

        expect(result).toBeDefined();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result).toHaveProperty("message", "Users successully listed (cache)");
        expect(result).toHaveProperty("data");
    });

    test("deveria retornar sucesso sem indicação de cache se não houver cache", async () => {
        const sut = new ListUsersUsecase();

        const users: User[] = [new User("any_name", 654654, "any_email", 99, "any_password")];

        jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(undefined);
        jest.spyOn(UserRepository.prototype, "list").mockResolvedValue(users);
        jest.spyOn(CacheRepository.prototype, "set").mockResolvedValue();

        const result = await sut.execute();

        expect(result).toBeDefined();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result).toHaveProperty("message", "Users successully listed");
        expect(result).toHaveProperty("data");
        expect(result.data.length).toBeGreaterThan(0);

        for (const item of result.data) {
            console.log(item);
            expect(item.id).toBeDefined();
        }
    });

    test("deveria retornar sucesso e uma lista vazia se não houver nenhum usuário cadastrado", async () => {
        const sut = new ListUsersUsecase();

        jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(undefined);
        jest.spyOn(UserRepository.prototype, "list").mockResolvedValue([]);
        jest.spyOn(CacheRepository.prototype, "set").mockResolvedValue();

        const result = await sut.execute();

        expect(result).toBeDefined();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result).toHaveProperty("message", "Users successully listed");
        expect(result).toHaveProperty("data");
        expect(result.data).toHaveLength(0);
    });
});
