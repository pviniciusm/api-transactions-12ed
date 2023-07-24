import { Database } from "../../../../main/database/database.connection";

import { User } from "../../../models/user.model";
import { UserEntity } from "../../../shared/database/entities/user.entity";

export class UserRepository {
    private repository = Database.connection.getRepository(UserEntity);

    public async list() {
        const result = await this.repository.find();

        console.log(result);

        return result.map((entity) => UserRepository.mapRowToModel(entity));
    }

    public async get(id: string) {
        // const result = await this.repository.find({
        //     where: {
        //         id
        //     }
        // });

        // const result = await this.repository.findBy({
        //     id
        // });

        const result = await this.repository.findOneBy({
            id,
        });

        if (!result) {
            return undefined;
        }

        return UserRepository.mapRowToModel(result);
    }

    public async getByCpf(cpf: number) {
        const result = await this.repository.findOneBy({
            cpf,
        });

        if (!result) {
            return undefined;
        }

        return UserRepository.mapRowToModel(result);
    }

    public async getByEmail(email: string) {
        const result = await this.repository.findOneBy({
            email,
        });

        if (!result) {
            return undefined;
        }

        return UserRepository.mapRowToModel(result);
    }

    public static mapRowToModel(row: UserEntity): User {
        return User.create(row);
    }
}
