import { User } from "../../models/user.model";

export interface UserRepositoryContract {
    get: (userId: string) => Promise<User | undefined>;
}
