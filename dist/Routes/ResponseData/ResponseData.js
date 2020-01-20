"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseItem = /** @class */ (function () {
    function ResponseItem(status, data) {
        if (status === void 0) { status = null; }
        if (data === void 0) { data = null; }
        this.Status = status;
        this.Data = data;
    }
    return ResponseItem;
}());
exports.ResponseItem = ResponseItem;
var FailedReason = /** @class */ (function () {
    function FailedReason(reason) {
        this.Reason = reason;
    }
    return FailedReason;
}());
exports.FailedReason = FailedReason;
var StatusType;
(function (StatusType) {
    StatusType["SUCCESS"] = "SUCCESS";
    StatusType["FAILED"] = "FAILED";
})(StatusType = exports.StatusType || (exports.StatusType = {}));
//# sourceMappingURL=ResponseData.js.map