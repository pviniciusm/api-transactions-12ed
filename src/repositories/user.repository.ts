import { usersList } from "../data/users";

export class UserRepository {
    public get(id: string) {
        return usersList.find((user) => user.id === id);
    }

    public getByCpf(cpf: number) {
        return usersList.find((user) => user.cpf === cpf);
    }

    public getByEmail(email: string) {
        return usersList.find((user) => user.email === email);
    }
}
