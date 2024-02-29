"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const mongooDB_1 = __importDefault(require("./configs/mongooDB")); // dữ liệu
const morgan_1 = __importDefault(require("./configs/morgan")); //được sử dụng để ghi lại các thông tin về yêu cầu HTTP và phản hồi từ server.
const dotenv_1 = __importDefault(require("dotenv")); //chứa các giá trị cấu hình(khoá API, port erver, info connect database)
const cors_1 = __importDefault(require("cors")); // cho phép chặn các yc HTTP khác
const cookie_parser_1 = __importDefault(require("cookie-parser")); //p.tich xử lí cookie từ yc http
const app = (0, express_1.default)();
//connect dotenv
dotenv_1.default.config();
const port = process.env.port;
//connect cors
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
}));
//connect cookie-parser
app.use((0, cookie_parser_1.default)());
// connect morgan
(0, morgan_1.default)(app);
app.use(express_1.default.json()); //reques data json
app.use(express_1.default.urlencoded({ extended: true })); // reques data body
// connect mongoo db
(0, mongooDB_1.default)();
// connect router
(0, index_1.default)(app);
app.listen(port, () => {
    console.log("run success !" + port);
});
