import { UserRepository } from "../../../../../src/app/features/user/repositories/user.repository";
import { LoginUsecase } from "../../../../../src/app/features/user/usecases/login.usecase";
import { User } from "../../../../../src/app/models/user.model";
import { Database } from "../../../../../src/main/database/database.connection";

describe("Testes unitários do login usecase", () => {
    beforeAll(async () => {
        await Database.connect();
        jest.setTimeout(300000);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await Database.connection.destroy();
    });

    // 1- verificar se o retorno é invalidCredentials se o user não existe
    test("deveria retornar acesso não autorizado quando o user não existir", async () => {
        const sut = new LoginUsecase();

        // MOCK => simulação
        jest.spyOn(UserRepository.prototype, "getByEmail").mockResolvedValue(undefined);

        const result = await sut.execute({
            email: "any_email",
            password: "any_password",
        });

        expect(result).toBeDefined();
        expect(result.code).toBe(401);
        expect(result.ok).toBe(false);
        expect(result.message).toBe("Acesso não autorizado");
    });

    // 2 - user existe, mas a senha está divergente, retorno invalidCredentials
    test("deveria retornar acesso não autorizado se o user existe mas a senha está incorreta", async () => {
        const sut = new LoginUsecase();

        jest.spyOn(UserRepository.prototype, "getByEmail").mockResolvedValue(new User("any_name", 654654, "any_email", 99, "wrong_pass"));

        const result = await sut.execute({
            email: "any_email",
            password: "any_password",
        });

        expect(result).toBeDefined();
        expect(result.code).toBe(401);
        expect(result.ok).toBe(false);
        expect(result.message).toBe("Acesso não autorizado");
    });

    // 3 - user existe, senha ok, retorno de sucesso
    test("deveria retornar sucesso se as credenciais estiverem corretas", async () => {
        const sut = new LoginUsecase();

        jest.spyOn(UserRepository.prototype, "getByEmail").mockResolvedValue(new User("any_name", 654654, "any_email", 99, "any_password"));

        const result = await sut.execute({
            email: "any_email",
            password: "any_password",
        });

        expect(result).toBeDefined();
        expect(result.code).toBe(200);
        expect(result.ok).toBe(true);
        expect(result.message).toBe("Login feito com sucesso");
    });
});
