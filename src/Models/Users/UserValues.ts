import ValuesBase from "../ValuesBase";

export default class UserValues extends ValuesBase {
    firstName?: String;
    phoneNumber?: String;
    userRole?: Number;
    bonuses?: Number;
    
    clone(oldValues?: UserValues): UserValues  {
        if(oldValues) {
            Object.keys(oldValues).forEach(k => {
                let oldValue = Reflect.get(oldValues, k);
                if(oldValue) {
                    let newValue = Reflect.get(this, k);
                    if(!newValue) {
                        Reflect.set(this, k, oldValue);
                    }
                }
            });
        }
        const copy = new UserValues();
        copy.itemID = this.itemID;
        copy.firstName = this.firstName;
        copy.phoneNumber = this.phoneNumber;
        copy.userRole = this.userRole;
        copy.bonuses = this.bonuses;
        return copy;
    }
}