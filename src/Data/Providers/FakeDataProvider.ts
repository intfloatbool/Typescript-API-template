import { IDataProvider } from "../IDataProvider";
import {User} from '../../Models/User';

export class FakeDataProvider implements IDataProvider{
    getUsers(): Promise<Array<User>> {
        return new Promise(resolve => resolve([]));
    }    
    getUserById(id: Number): Promise<User> | Promise<null> {
        return new Promise<User>(resolve => resolve(undefined));
    }

}