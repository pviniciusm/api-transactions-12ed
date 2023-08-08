import { Result } from "../../../shared/contracts/result.contract";
import { Return } from "../../../shared/util/return.adapter";
import { UserRepository } from "../repositories/user.repository";

export class GetUserUsecase {
    public async execute(id: string): Promise<Result> {
        const repository = new UserRepository();
        const result = await repository.get(id);

        if (!result) {
            return Return.notFound("User");
        }

        return Return.success("User successfully obtained", result.toJson());
    }
}
