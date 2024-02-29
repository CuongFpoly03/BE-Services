import { Response, Request } from "express";
import bcrypt from "bcrypt";
import accounts from "../models/accountModel";
import { typeJwt } from "~/type";
import generateAccessToken from "~/utils/generateAccessToken";
import generateRefreshToken from "~/utils/generateRefreshToken";
import refreshtokenModel from "~/models/refreshtokenModel";
import jwt from "jsonwebtoken"
class account {
  async register(req: Request, res: Response) {
    try {
      if (!req.body.username || !req.body.password) {
        res.status(201).json({
          message: "tao tk khong thanh cong !",
          status: 201,
        });
      } else {
        const saltRound = 10;
        const hashPass = await bcrypt.hash(
          Buffer.from(req.body.password),
          saltRound
        );
        let data = {
          ...req.body,
          password: hashPass,
        };
        await accounts.create(data);
        res.status(200).json({
          message: "account successfully created",
          status: 200,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const resUser = await accounts.findOne({
        username: req.body.username,
      });
      if (!resUser) {
        return res.status(403).json({
          message: "ten nguoi dung sai",
          status: 403,
        });
      }
      const isPassword = await bcrypt.compare(
        Buffer.from(req.body.password),
        resUser.password
      );
      if (!isPassword) {
        return res.status(403).json({
          message: "mat khau sai",
          status: 403,
        });
      }

      if (req.body.username === resUser.username && isPassword) {
        const dataJwt: typeJwt = { id: resUser._id, admin: resUser.admin };
        const accessToken = generateAccessToken(dataJwt);
        const refreshToken: string = generateRefreshToken(dataJwt);
        await refreshtokenModel.create({
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
    } catch (error) {
      return res.status(500).json({
        message: error,
        status: 500, //khong mong muon 1 sk xay ra.
      });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const refreshToken: string = req.body.refreshToken;
      if (!refreshToken) {
        return res.status(403).json({
          message: "khong co tokens",
          status: 403, // may chu hieu duoc yc nhung tu choi cho phep no
        });
      }
      const response = await refreshtokenModel.findOne({ token: refreshToken });
      if (response) {
        await refreshtokenModel.deleteMany({ user_id: response.user_id });
        res.status(200).json({
          status: 200,
          message: "logout thanh cong",
        });
      } else {
        res.status(403).json({
          status: 403,
          message: "logout khong thanh cong",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error,
        status: 500,
      });
    }
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken: string = req.body.refreshToken;
    if(!refreshToken) return res.status(401).json({
        message: "ban khong xac thuc"
    });
    const isRefreshToken = await refreshtokenModel.findOne({
        token: refreshToken
    });
    if(isRefreshToken) await refreshtokenModel.deleteOne({
        token: refreshToken
    });

    const refreshTokenKey : string | undefined = process.env.refreshTokenKey;
    if(refreshTokenKey) {
        jwt.verify(refreshToken, refreshTokenKey, async (err, user) => {
            const data = user as typeJwt;
            const datajwt: typeJwt = {
                id: data.id,
                admin: data.admin,
            };
            const newAccessToken = generateAccessToken(datajwt);
            const newRefrechToken = generateRefreshToken(datajwt);
            await refreshtokenModel.create({
                token: newRefrechToken,
                user_id: datajwt.id,
            });
            res.status(200).json({accessToken: newAccessToken, refreshToken: newRefrechToken});
        });
    }
  }
}

export default new account();
