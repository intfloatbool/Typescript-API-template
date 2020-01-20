"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserValues_1 = __importDefault(require("../../Models/Users/UserValues"));
var UserValuesBuilder = /** @class */ (function () {
    function UserValuesBuilder() {
        this._userValues = new UserValues_1.default();
    }
    UserValuesBuilder.prototype.setId = function (id) {
        this._userValues.itemID = id;
        return this;
    };
    UserValuesBuilder.prototype.setFirstName = function (firstName) {
        this._userValues.firstName = firstName;
        return this;
    };
    UserValuesBuilder.prototype.setPhoneNumber = function (phoneNumber) {
        this._userValues.phoneNumber = phoneNumber;
        return this;
    };
    UserValuesBuilder.prototype.setRole = function (userRole) {
        this._userValues.userRole = userRole;
        return this;
    };
    UserValuesBuilder.prototype.setBonuses = function (bonuses) {
        this._userValues.bonuses = bonuses;
        return this;
    };
    UserValuesBuilder.prototype.build = function () {
        return this._userValues.clone();
    };
    return UserValuesBuilder;
}());
exports.default = UserValuesBuilder;
//# sourceMappingURL=UserValuesBuilder.js.map