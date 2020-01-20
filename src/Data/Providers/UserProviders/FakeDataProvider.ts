import { IDataProvider } from "../../IDataProvider";
import {User} from '../../../Models/Users/User';
import UserValues from "../../../Models/Users/UserValues";
import UserValuesBuilder from "../../Builders/UserValuesBuilder";

export class FakeDataProvider implements IDataProvider<User, UserValues> {

    private _currentUserIndex: number;
    private userData: Array<User>;
    private _valuesBuilder: UserValuesBuilder;
    constructor() {
        this._currentUserIndex = 0;
        this._valuesBuilder = new UserValuesBuilder();
        this.userData = [
            new User(
                this._valuesBuilder
                    .setId(0)
                    .setFirstName('Vova')
                    .setPhoneNumber('8544 333 21 31')
                    .build()
                ),
            new User(
                this._valuesBuilder
                    .setId(1)
                    .setFirstName('B0riz')
                    .setPhoneNumber('8577 555 21 98')
                    .build()
                ),
            new User(
                this._valuesBuilder
                    .setId(2)
                    .setFirstName('Michael')
                    .setPhoneNumber('8544 123 55 21')
                    .build()
                )
        ];
    }

    addItem(user: User): Promise<User> {
        return new Promise((resolve,reject) => {
            try {
                this.userData.push(user);
                user.getValues().itemID = this._currentUserIndex;
                this._currentUserIndex++;
                resolve(user.clone());
            } catch(err) {
                reject(err);
            }
        });
    }
    updateItem(userId: Number, newUserValues: UserValues): Promise<User> {
        return new Promise((resolve, reject) => {
            try {
                const target = this.userData.find(u => u.getValues().itemID === userId);
                if(target) {
                    target.setValues(newUserValues.clone());
                    resolve(target.clone());
                } else {
                    resolve(undefined);
                }
            } catch(err) {
                reject(err);
            }
        });
    }
    getItems(): Promise<Array<User>> {
        return new Promise(resolve => resolve(this.userData));
    }    
    getItemById(userId: Number): Promise<User> | Promise<null> {
        return new Promise<User>((resolve,reject) => {
            try {
                const target = this.userData.find(u => u.getValues().itemID === userId);
                if(target) {
                    resolve(target.clone());
                } else {
                    resolve(undefined);
                }
            } catch(err) {
                reject(err);
            }
        });
    }

}