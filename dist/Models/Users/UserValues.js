"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ValuesBase_1 = __importDefault(require("../ValuesBase"));
var UserValues = /** @class */ (function (_super) {
    __extends(UserValues, _super);
    function UserValues() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserValues.prototype.clone = function () {
        var copy = new UserValues();
        copy.itemID = this.itemID;
        copy.firstName = this.firstName;
        copy.phoneNumber = this.phoneNumber;
        copy.userRole = this.userRole;
        copy.bonuses = this.bonuses;
        return copy;
    };
    return UserValues;
}(ValuesBase_1.default));
exports.default = UserValues;
//# sourceMappingURL=UserValues.js.map