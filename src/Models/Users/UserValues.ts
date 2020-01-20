export default class UserValues {
    userId?: Number;
    firstName?: String;
    phoneNumber?: String;
    userRole?: Number;
    bonuses?: Number;
    
    clone(): UserValues {
        const copy = new UserValues();
        copy.userId = this.userId;
        copy.firstName = this.firstName;
        copy.phoneNumber = this.phoneNumber;
        copy.userRole = this.userRole;
        copy.bonuses = this.bonuses;
        return copy;
    }
}