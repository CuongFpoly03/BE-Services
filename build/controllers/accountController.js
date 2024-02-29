"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const accountModel_1 = __importDefault(require("../models/accountModel"));
const generateAccessToken_1 = __importDefault(require("~/utils/generateAccessToken"));
const generateRefreshToken_1 = __importDefault(require("~/utils/generateRefreshToken"));
const refreshtokenModel_1 = __importDefault(require("~/models/refreshtokenModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class account {
    async register(req, res) {
        try {
            if (!req.body.username || !req.body.password) {
                res.status(201).json({
                    message: "tao tk khong thanh cong !",
                    status: 201,
                });
            }
            else {
                const saltRound = 10;
                const hashPass = await bcrypt_1.default.hash(Buffer.from(req.body.password), saltRound);
                let data = {
                    ...req.body,
                    password: hashPass,
                };
                await accountModel_1.default.create(data);
                res.status(200).json({
                    message: "account successfully created",
                    status: 200,
                });
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    async login(req, res) {
        try {
            const resUser = await accountModel_1.default.findOne({
                username: req.body.username,
            });
            if (!resUser) {
                return res.status(403).json({
                    message: "ten nguoi dung sai",
                    status: 403,
                });
            }
            const isPassword = await bcrypt_1.default.compare(Buffer.from(req.body.password), resUser.password);
            if (!isPassword) {
                return res.status(403).json({
                    message: "mat khau sai",
                    status: 403,
                });
            }
            if (req.body.username === resUser.username && isPassword) {
                const dataJwt = { id: resUser._id, admin: resUser.admin };
                const accessToken = (0, generateAccessToken_1.default)(dataJwt);
                const refreshToken = (0, generateRefreshToken_1.default)(dataJwt);
                await refreshtokenModel_1.default.create({
                    token: refreshToken,
                    user_id: dataJwt.id,
                });
                const { username, _id, admin, avatar, first_name, last_name } = resUser;
                return res.status(200).json({
                    message: "Logged in successfully",
                    status: 200, // yc xu li thanh cong
                    data: {
                        username,
                        _id,
                        admin,
                        avatar,
                        first_name,
                        last_name,
                        accessToken,
                        refreshToken,
                    },
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                message: error,
                status: 500, //khong mong muon 1 sk xay ra.
            });
        }
    }
    async logout(req, res) {
        try {
            const refreshToken = req.body.refreshToken;
            if (!refreshToken) {
                return res.status(403).json({
                    message: "khong co tokens",
                    status: 403, // may chu hieu duoc yc nhung tu choi cho phep no
                });
            }
            const response = await refreshtokenModel_1.default.findOne({ token: refreshToken });
            if (response) {
                await refreshtokenModel_1.default.deleteMany({ user_id: response.user_id });
                res.status(200).json({
                    status: 200,
                    message: "logout thanh cong",
                });
            }
            else {
                res.status(403).json({
                    status: 403,
                    message: "logout khong thanh cong",
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                message: error,
                status: 500,
            });
        }
    }
    async refreshToken(req, res) {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken)
            return res.status(401).json({
                message: "ban khong xac thuc"
            });
        const isRefreshToken = await refreshtokenModel_1.default.findOne({
            token: refreshToken
        });
        if (isRefreshToken)
            await refreshtokenModel_1.default.deleteOne({
                token: refreshToken
            });
        const refreshTokenKey = process.env.refreshTokenKey;
        if (refreshTokenKey) {
            jsonwebtoken_1.default.verify(refreshToken, refreshTokenKey, async (err, user) => {
                const data = user;
                const datajwt = {
                    id: data.id,
                    admin: data.admin,
                };
                const newAccessToken = (0, generateAccessToken_1.default)(datajwt);
                const newRefrechToken = (0, generateRefreshToken_1.default)(datajwt);
                await refreshtokenModel_1.default.create({
                    token: newRefrechToken,
                    user_id: datajwt.id,
                });
                res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefrechToken });
            });
        }
    }
}
exports.default = new account();
