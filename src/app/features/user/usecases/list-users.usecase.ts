import { Result } from "../../../shared/contracts/result.contract";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

export class ListUsersUsecase {
    public async execute(): Promise<Result> {
        // verifica se existem users em cache
        const cacheRepository = new CacheRepository();
        const cachedUsers = await cacheRepository.get("users");

        // se tem em cache, retorna o que estiver em cache
        if (cachedUsers) {
            return {
                ok: true,
                message: "Users successully listed (cache)",
                data: cachedUsers,
                code: 200,
            };
        }

        const repository = new UserRepository();
        const result = await repository.list();

        // se não tiver em cache, seta o cache
        await cacheRepository.set("users", result);

        return {
            ok: true,
            message: "Users successully listed",
            data: result,
            code: 200,
        };
    }
}
