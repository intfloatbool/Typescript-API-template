"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var PORT = process.env.PORT || 6011;
var app = express_1.default();
app.get('/', function (req, res) {
    res.send('Hey baby');
});
app.listen(PORT, function () {
    console.log("Applicatuin running at port: " + PORT);
});
