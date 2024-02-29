"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
function configMorgan(app) {
    const envRun = process.env.envRun;
    if (envRun === 'dev') {
        app.use((0, morgan_1.default)('tiny'));
    }
    else {
        const fileLog = fs_1.default.createWriteStream('assess.log', { flags: 'a' });
        app.use((0, morgan_1.default)('common', {
            stream: fileLog,
            skip: (req, res) => res.statusCode < 400,
        }));
    }
}
exports.default = configMorgan;
