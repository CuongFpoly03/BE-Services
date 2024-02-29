import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { typeJwt } from '../type';
interface TypeRequest extends Request {
    user?: typeJwt;
}

const verifyAccessToken = (req: TypeRequest, res: Response, next: NextFunction) => {
    const token: string | string[] | undefined = req.headers.token;
    const accessTokenKey: string | undefined = process.env.accessTokenKey;
    if (typeof token === 'string' && accessTokenKey) {
        const accessToken = token.split(' ')[1];
        jwt.verify(accessToken, accessTokenKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Mã thông báo không hợp lệ' });
            }
            req.user = user as typeJwt;
            next();
        });
    } else {
        res.status(404).json({ message: "Bạn không xác thực"});
    }
};

export default verifyAccessToken;
