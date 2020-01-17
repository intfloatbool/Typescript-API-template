"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
describe('First test', function () {
    it('should return true', function () {
        var isYouAreGood = true;
        chai_1.expect(isYouAreGood).to.equal(true);
    });
});
