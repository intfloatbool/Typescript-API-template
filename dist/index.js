"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var PORT = process.env.PORT || 6011;
var app = express_1.default();
var UserRouter_1 = __importDefault(require("./Routes/UserRouter"));
var Routes = {
    USERS: '/users'
};
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(Routes.USERS, UserRouter_1.default);
app.get('/', function (req, res) {
    var body = req.body;
    if (body.name) {
        res.send("Hi man " + body.name + " !");
        return;
    }
    res.send('Hey baby');
});
app.listen(PORT, function () {
    console.log("Applicatuin running at port: " + PORT);
});
//# sourceMappingURL=index.js.map