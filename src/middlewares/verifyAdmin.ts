import verifyAccessToken from './verifyAccessToken';
import { Request, Response, NextFunction } from 'express';
// nextFunction từ một middleware sang middleware tiếp theo hoặc từ một middleware sang hàm xử lý cuối cùng của một tuyến đường (route handler).
import { typeJwt } from '../type';
interface TypeRequest extends Request {
    user?: typeJwt;
}
const verifyAdmin = async (req: TypeRequest, res: Response, next: NextFunction) => {
    verifyAccessToken(req, res, () => {
        if (req.user?.admin) {
            next();
        } else {
            res.status(401).json({ message: 'You have no right' });
        }
    });
};

export default verifyAdmin;
