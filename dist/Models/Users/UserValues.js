"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserValues = /** @class */ (function () {
    function UserValues() {
    }
    UserValues.prototype.clone = function () {
        var copy = new UserValues();
        copy.userId = this.userId;
        copy.firstName = this.firstName;
        copy.phoneNumber = this.phoneNumber;
        copy.userRole = this.userRole;
        copy.bonuses = this.bonuses;
        return copy;
    };
    return UserValues;
}());
exports.default = UserValues;
//# sourceMappingURL=UserValues.js.map