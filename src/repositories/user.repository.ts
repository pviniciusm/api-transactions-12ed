import { ILike, Like, MoreThan } from "typeorm";
import { usersList } from "../data/users";
import { Database } from "../database/config/database.connection";
import { UserEntity } from "../database/entities/user.entity";
import { User } from "../models/user.model";

export class UserRepository {
    private repository = Database.connection.getRepository(UserEntity);

    public async list() {
        const result = await this.repository.find({
            // where: {
            //     age: MoreThan(20),
            //     name: ILike("%teste%"),
            // }
            where: [
                {
                    age: MoreThan(20),
                },
                {
                    name: ILike("%teste%"),
                },
            ],
        });

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

    public getByCpf(cpf: number) {
        return usersList.find((user) => user.cpf === cpf);
    }

    public getByEmail(email: string) {
        return usersList.find((user) => user.email === email);
    }

    public static mapRowToModel(row: UserEntity): User {
        return User.create(row);
    }
}
