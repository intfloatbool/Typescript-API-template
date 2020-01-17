import { IDataProvider } from "../IDataProvider";
import {User} from '../../Models/Users/User';
import UserValues from "../../Models/Users/UserValues";

export class FakeDataProvider implements IDataProvider{

    private _currentUserIndex: number;
    private userData: Array<User>;
    constructor() {
        this._currentUserIndex = 0;
        this.userData = new Array<User>();
    }

    addUser(user: User): Promise<User> {
        return new Promise((resolve,reject) => {
            try {
                this.userData.push(user);
                user.getValues().setUserId(this._currentUserIndex);
                this._currentUserIndex++;
                resolve(user.clone());
            } catch(err) {
                reject(err);
            }
        });
    }
    updateUser(userId: Number, newUserValues: UserValues): Promise<User> {
        return new Promise((resolve, reject) => {
            try {
                const target = this.userData.find(u => u.getValues().getId() === userId);
                if(target) {
                    target.setValues(newUserValues.clone());
                    resolve(target.clone());
                } else {
                    throw new Error(`Cannot find user with id ${userId}!`);
                }
            } catch(err) {
                reject(err);
            }
        });
    }
    getUsers(): Promise<Array<User>> {
        return new Promise(resolve => resolve(this.userData));
    }    
    getUserById(userId: Number): Promise<User> | Promise<null> {
        return new Promise<User>((resolve,reject) => {
            try {
                const target = this.userData.find(u => u.getValues().getId() === userId);
                if(target) {
                    resolve(target.clone());
                } else {
                    throw new Error(`Cannot find user with id ${userId}!`);
                }
            } catch(err) {
                reject(err);
            }
        });
    }

}