import jwt from 'jsonwebtoken';
import { typeJwt } from '~/type';

const generateAccessToken = (data: typeJwt) => {
    const accessTokenKey: string | undefined = process.env.accessTokenKey;
    if (accessTokenKey) {
        return jwt.sign(data, accessTokenKey, {
            expiresIn: '50s',
        });
    }
};

export default generateAccessToken;
