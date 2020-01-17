import UserValues from "./UserValues";

export class User {
    private _userValues: UserValues;
    constructor(userValues: UserValues) {
        this._userValues = userValues;
    }

    getValues(): UserValues {
        return this._userValues;
    }

    setValues(userValues: UserValues): void {
        this._userValues = userValues;
    }

    clone(): User {
        return new User(this._userValues.clone());
    }
}