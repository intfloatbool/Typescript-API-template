"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FakeDataProvider_1 = require("../Providers/FakeDataProvider");
var FakeUserDataCreator = /** @class */ (function () {
    function FakeUserDataCreator() {
    }
    FakeUserDataCreator.prototype.create = function () {
        return new FakeDataProvider_1.FakeDataProvider();
    };
    return FakeUserDataCreator;
}());
exports.FakeUserDataCreator = FakeUserDataCreator;
//# sourceMappingURL=FakeUserDataCreator.js.map