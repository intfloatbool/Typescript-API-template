"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserValues = /** @class */ (function () {
    function UserValues(firstName, phoneNumber, bonuses) {
        var _this = this;
        if (bonuses === void 0) { bonuses = 0; }
        this.getId = function () { return _this._userId; };
        this.getFirstName = function () { return _this._firstName; };
        this.getPhoneNumber = function () { return _this._phoneNumber; };
        this.getBonuses = function () { return _this._bonuses; };
        this._userId = 0;
        this._firstName = firstName;
        this._phoneNumber = phoneNumber;
        this._bonuses = bonuses;
    }
    UserValues.prototype.setUserId = function (userId) {
        this._userId = userId;
    };
    UserValues.prototype.clone = function () {
        return new UserValues(this._firstName, this._phoneNumber, this._bonuses);
    };
    return UserValues;
}());
exports.default = UserValues;
