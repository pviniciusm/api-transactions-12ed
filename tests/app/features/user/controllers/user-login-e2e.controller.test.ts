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

describe("Testes de API do controller de user - método login", () => {
    beforeAll(async () => {
        await Database.connect();
        await CacheDatabase.connect();
    });

    beforeEach(async () => {
        const database = Database.connection;
        const userRepository = database.getRepository(UserEntity);
        const transactionRepository = database.getRepository(TransactionEntity);

        await transactionRepository.clear();
        await userRepository.clear();

        const cache = CacheDatabase.connection;
        await cache.flushall();
    });

    afterAll(async () => {
        await Database.connection.destroy();
        await CacheDatabase.connection.quit();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    const createUser = async (user: User) => {
        const database = Database.connection;
        const userRepository = database.getRepository(UserEntity);

        const entity = userRepository.create({
            id: user.id,
            age: user.age,
            cpf: user.cpf,
            email: user.email,
            name: user.name,
            password: user.password,
            createdAt: new Date(),
        });

        await userRepository.save(entity);
    };

    const createSut = () => {
        return Server.create();
    };

    const route = "/users/login";

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

    test("deveria retornar 401 se o user não existe", async () => {
        const sut = createSut();

        const result = await request(sut).post(route).send({
            email: "teste@teste.com",
            password: "12345",
        });

        // Expects da chamada da API
        expect(result.status).toEqual(401);
        expect(result).toHaveProperty("body");

        // Expects do resultado retornado pelo controller
        expect(result.body).toHaveProperty("ok", false);
        expect(result.body).toHaveProperty("message", "Acesso não autorizado");
        expect(result.body).not.toHaveProperty("data");
    });

    test("deveria retornar 401 se senha estiver incorreta", async () => {
        const sut = createSut();

        const user = new User("Daphne", 13684, "teste@teste.com", 55, "12345");
        await createUser(user);

        const result = await request(sut).post(route).send({
            email: "teste@teste.com",
            password: "wrong_pass",
        });

        // Expects da chamada da API
        expect(result.status).toEqual(401);
        expect(result).toHaveProperty("body");

        // Expects do resultado retornado pelo controller
        expect(result.body).toHaveProperty("ok", false);
        expect(result.body).toHaveProperty("message", "Acesso não autorizado");
        expect(result.body).not.toHaveProperty("data");
    });

    test("deveria retornar 200 se as credenciais forem informadas com sucesso", async () => {
        const sut = createSut();

        const user = new User("Daphne", 13684, "teste@teste.com", 55, "12345");
        await createUser(user);

        const result = await request(sut).post(route).send({
            email: "teste@teste.com",
            password: "12345",
        });

        // Expects da chamada da API
        expect(result.status).toEqual(200);
        expect(result).toHaveProperty("body");

        // Expects do resultado retornado pelo controller
        expect(result.body).toHaveProperty("ok", true);
        expect(result.body).toHaveProperty("message", "Login feito com sucesso");
        expect(result.body).toHaveProperty("data");
    });
});
