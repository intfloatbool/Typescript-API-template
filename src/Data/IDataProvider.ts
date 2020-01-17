import { User } from "../Models/User";

export interface IDataProvider {
    getUsers(): Promise<Array<User>>;
    getUserById(id: Number): Promise<User> | Promise<null>;
}