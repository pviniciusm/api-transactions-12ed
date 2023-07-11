import { usersList } from "../data/users";
import { Database } from "../database/database.connection";
import { User } from "../models/user.model";

export class UserRepository {
    private connection = Database.connection;

    public async list() {
        const result = await this.connection.query("select * from transactions.user");
        return result.rows;
    }

    public async get(id: string) {
        // usersList.find((user) => user.id === id);
        const result = await this.connection.query(`select * from transactions.user where id = '${id}'`);

        if (result.rows.length == 0) {
            return undefined;
        }

        const dbUser = result.rows[0];
        return UserRepository.mapRowToModel(dbUser);
    }

    public getByCpf(cpf: number) {
        return usersList.find((user) => user.cpf === cpf);
    }

    public getByEmail(email: string) {
        return usersList.find((user) => user.email === email);
    }

    public static mapRowToModel(row: any): User {
        return User.create(row);
    }
}
