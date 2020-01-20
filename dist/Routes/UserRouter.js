"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Express = __importStar(require("express"));
var Router = Express.Router();
Router.get('/', function (req, res) {
    res.json({ response: "Hello bro this is users api router!!" });
});
exports.default = Router;
