"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FakeDataProvider = /** @class */ (function () {
    function FakeDataProvider() {
        this._currentUserIndex = 0;
        this.userData = new Array();
    }
    FakeDataProvider.prototype.addUser = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.userData.push(user);
                user.getValues().setUserId(_this._currentUserIndex);
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
                var target = _this.userData.find(function (u) { return u.getValues().getId() === userId; });
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
                var target = _this.userData.find(function (u) { return u.getValues().getId() === userId; });
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
