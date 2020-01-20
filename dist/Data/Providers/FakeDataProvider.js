"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../../Models/Users/User");
var UserValuesBuilder_1 = __importDefault(require("../Builders/UserValuesBuilder"));
var FakeDataProvider = /** @class */ (function () {
    function FakeDataProvider() {
        this._currentUserIndex = 0;
        this._valuesBuilder = new UserValuesBuilder_1.default();
        this.userData = [
            new User_1.User(this._valuesBuilder
                .setId(0)
                .setFirstName('Vova')
                .setPhoneNumber('8544 333 21 31')
                .build()),
            new User_1.User(this._valuesBuilder
                .setId(1)
                .setFirstName('B0riz')
                .setPhoneNumber('8577 555 21 98')
                .build()),
            new User_1.User(this._valuesBuilder
                .setId(2)
                .setFirstName('Michael')
                .setPhoneNumber('8544 123 55 21')
                .build())
        ];
    }
    FakeDataProvider.prototype.addUser = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.userData.push(user);
                user.getValues().userId = _this._currentUserIndex;
                _this._currentUserIndex++;
                resolve(user.clone());
            }
            catch (err) {
                reject(err);
            }
        });
    };
    FakeDataProvider.prototype.updateUser = function (userId, newUserValues) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var target = _this.userData.find(function (u) { return u.getValues().userId === userId; });
                if (target) {
                    target.setValues(newUserValues.clone());
                    resolve(target.clone());
                }
                else {
                    throw new Error("Cannot find user with id " + userId + "!");
                }
            }
            catch (err) {
                reject(err);
            }
        });
    };
    FakeDataProvider.prototype.getUsers = function () {
        var _this = this;
        return new Promise(function (resolve) { return resolve(_this.userData); });
    };
    FakeDataProvider.prototype.getUserById = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var target = _this.userData.find(function (u) { return u.getValues().userId === userId; });
                if (target) {
                    resolve(target.clone());
                }
                else {
                    throw new Error("Cannot find user with id " + userId + "!");
                }
            }
            catch (err) {
                reject(err);
            }
        });
    };
    return FakeDataProvider;
}());
exports.FakeDataProvider = FakeDataProvider;
//# sourceMappingURL=FakeDataProvider.js.map