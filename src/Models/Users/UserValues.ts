import ValuesBase from "../ValuesBase";

export default class UserValues extends ValuesBase {
    firstName?: String;
    phoneNumber?: String;
    userRole?: Number;
    bonuses?: Number;
    
    clone(): UserValues  {
        const copy = new UserValues();
        copy.itemID = this.itemID;
        copy.firstName = this.firstName;
        copy.phoneNumber = this.phoneNumber;
        copy.userRole = this.userRole;
        copy.bonuses = this.bonuses;
        return copy;
    }
}