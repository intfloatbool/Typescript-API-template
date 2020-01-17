"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(userValues) {
        this._userValues = userValues;
    }
    User.prototype.getValues = function () {
        return this._userValues;
    };
    User.prototype.setValues = function (userValues) {
        this._userValues = userValues;
    };
    User.prototype.clone = function () {
        return new User(this._userValues.clone());
    };
    return User;
}());
exports.User = User;
