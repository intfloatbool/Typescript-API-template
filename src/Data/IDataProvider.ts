import { User } from "../Models/Users/User";
import UserValues from "../Models/Users/UserValues";

export interface IDataProvider {
    addUser(user: User): Promise<User>;
    updateUser(userId: Number, newUserValues: UserValues): Promise<User>; 
    getUsers(): Promise<Array<User>>;
    getUserById(id: Number): Promise<User> | Promise<null>;
}