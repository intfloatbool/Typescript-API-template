"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../../../Models/Users/User");
var UserValuesBuilder_1 = __importDefault(require("../../Builders/UserValuesBuilder"));
var FakeDataProvider = /** @class */ (function () {
    function FakeDataProvider() {
        this._currentUserIndex = 0;
        this._valuesBuilder = new UserValuesBuilder_1.default();
        this.userData = [];
        //fill data for test
        this.create(new User_1.User(this._valuesBuilder
            .setFirstName('Vova')
            .setPhoneNumber('8544 333 21 31')
            .build()));
        this.create(new User_1.User(this._valuesBuilder
            .setFirstName('B0riz')
            .setPhoneNumber('8577 555 21 98')
            .build()));
        this.create(new User_1.User(this._valuesBuilder
            .setFirstName('Michael')
            .setPhoneNumber('8544 123 55 21')
            .build()));
    }
    FakeDataProvider.prototype.create = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.userData.push(user);
                user.getValues().itemID = _this._currentUserIndex;
                _this._currentUserIndex++;
                resolve(user.clone());
            }
            catch (err) {
                reject(err);
            }
        });
    };
    FakeDataProvider.prototype.update = function (userId, newUserValues) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var target = _this.userData.find(function (u) { return u.getValues().itemID === userId; });
                if (target) {
                    target.setValues(newUserValues.clone());
                    resolve(target.clone());
                }
                else {
                    resolve(undefined);
                }
            }
            catch (err) {
                reject(err);
            }
        });
    };
    FakeDataProvider.prototype.list = function () {
        var _this = this;
        return new Promise(function (resolve) { return resolve(_this.userData); });
    };
    FakeDataProvider.prototype.read = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var target = _this.userData.find(function (u) { return u.getValues().itemID === userId; });
                if (target) {
                    resolve(target.clone());
                }
                else {
                    resolve(undefined);
                }
            }
            catch (err) {
                reject(err);
            }
        });
    };
    FakeDataProvider.prototype.delete = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var target = _this.userData.find(function (u) { return u.getValues().itemID === id; });
                if (target) {
                    resolve(true);
                }
                else {
                    resolve(false);
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