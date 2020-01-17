"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FakeDataProvider_1 = require("../Providers/FakeDataProvider");
var FakeDataCreator = /** @class */ (function () {
    function FakeDataCreator() {
    }
    FakeDataCreator.prototype.create = function () {
        return new FakeDataProvider_1.FakeDataProvider();
    };
    return FakeDataCreator;
}());
exports.FakeDataCreator = FakeDataCreator;
