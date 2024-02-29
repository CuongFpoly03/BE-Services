import jwt from 'jsonwebtoken';
import { typeJwt } from '~/type';

const generateRefreshToken = (data: typeJwt) => {
    const refreshTokenKey: string | undefined = process.env.refreshTokenKey;
    if (refreshTokenKey) {
        return jwt.sign(data, refreshTokenKey, {
            expiresIn: '365d',
        });
    } else {
        return '';
    }
};

export default generateRefreshToken;
