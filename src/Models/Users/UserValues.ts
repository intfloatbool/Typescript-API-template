export default class UserValues {
    private _userId: Number;
    private _firstName: String;
    private _phoneNumber: String;
    private _bonuses: Number;
    
    constructor(firstName: String, phoneNumber: String, bonuses: Number = 0) {
        this._userId = 0;
        this._firstName = firstName;
        this._phoneNumber = phoneNumber;
        this._bonuses = bonuses;
    }

    setUserId(userId: Number) {
        this._userId = userId;
    }

    getId = () => this._userId;
    getFirstName =() => this._firstName;
    getPhoneNumber =() => this._phoneNumber;
    getBonuses = () => this._bonuses;

    clone(): UserValues {
        return new UserValues(this._firstName, this._phoneNumber, this._bonuses);
    }
}