import request from "supertest";

import { Database } from "../../../../../src/main/database/database.connection";
import { CacheDatabase } from "../../../../../src/main/database/redis.connection";
import { UserController } from "../../../../../src/app/features/user/controllers/user.controller";
import { Server } from "../../../../../src/main/config/express.config";
import { LoginUsecase } from "../../../../../src/app/features/user/usecases/login.usecase";
import { Return } from "../../../../../src/app/shared/util/return.adapter";
import { UserEntity } from "../../../../../src/app/shared/database/entities/user.entity";
import { AddressEntity } from "../../../../../src/app/shared/database/entities/address.entity";
import { TransactionEntity } from "../../../../../src/app/shared/database/entities/transaction.entity";
import { User } from "../../../../../src/app/models/user.model";

describe.skip("Testes de API do controller de user - método login - mock do usecase", () => {
    beforeAll(async () => {
        await Database.connect();
        await CacheDatabase.connect();
    });

    afterAll(async () => {
        await Database.connection.destroy();
        await CacheDatabase.connection.quit();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    const createSut = () => {
        return Server.create();
    };

    const route = "/users/login";

    test("deveria retornar 200 se o usecase for executado com sucesso", async () => {
        // 1 - criar o sut
        const sut = createSut();

        // Mock do usecase
        jest.spyOn(LoginUsecase.prototype, "execute").mockResolvedValue(Return.success("Login feito com sucesso", {}));

        // 2 - executar o método
        const result = await request(sut).post(route).send({
            email: "teste@teste.com",
            password: "12345",
        });

        // 3 - fazer os asserts
        expect(result).toBeDefined();

        // Expects da chamada da API
        expect(result.status).toEqual(200);
        expect(result).toHaveProperty("body");

        // Expects do resultado retornado pelo controller
        expect(result.body).toHaveProperty("ok", true);
        expect(result.body).toHaveProperty("code", 200);
        expect(result.body).toHaveProperty("data");
        expect(result.body).toHaveProperty("message");
    });

    test("deveria retornar 500 se o usecase disparar uma exceção", async () => {
        // 1 - criar o sut
        const sut = createSut();

        // Mock do usecase
        jest.spyOn(LoginUsecase.prototype, "execute").mockRejectedValue("Erro simulado");

        // 2 - executar o método
        const result = await request(sut).post(route).send({
            email: "teste@teste.com",
            password: "12345",
        });

        // 3 - fazer os asserts
        expect(result).toBeDefined();

        // Expects da chamada da API
        expect(result.status).toEqual(500);
        expect(result).toHaveProperty("body");

        // Expects do resultado retornado pelo controller
        expect(result.body).toHaveProperty("ok", false);
        expect(result.body).toHaveProperty("message", "Erro simulado");
        expect(result.body).not.toHaveProperty("data");
        expect(result.body).not.toHaveProperty("code");
    });

    test("deveria retornar 400 (fieldNotProvided) se o email não for informado", async () => {
        const sut = createSut();

        const result = await request(sut).post(route).send({
            password: "any_password",
        });

        // 3 - fazer os asserts
        expect(result).toBeDefined();

        // Expects da chamada da API
        expect(result.status).toEqual(400);
        expect(result).toHaveProperty("body");

        // Expects do resultado retornado pelo controller
        expect(result.body).toHaveProperty("ok", false);
        expect(result.body).toHaveProperty("message", "Email was not provided.");
        expect(result.body).not.toHaveProperty("data");
    });

    test("deveria retornar 400 (fieldNotProvided) se o password não for informado", async () => {
        const sut = createSut();

        const result = await request(sut).post(route).send({
            email: "any_email",
        });

        // 3 - fazer os asserts
        expect(result).toBeDefined();

        // Expects da chamada da API
        expect(result.status).toEqual(400);
        expect(result).toHaveProperty("body");

        // Expects do resultado retornado pelo controller
        expect(result.body).toHaveProperty("ok", false);
        expect(result.body).toHaveProperty("message", "Password was not provided.");
        expect(result.body).not.toHaveProperty("data");
    });
});
