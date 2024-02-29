import accounts from '../models/accountModel';
import bcrypt from 'bcrypt';
import { typeUser } from '../type';

const accountService = {
    register: async (user: typeUser) => {
        try {
            const saltRounds = 10;
            const hashPass = await bcrypt.hash(Buffer.from(user.password), saltRounds);
            let data = {
                ...user,
                password: hashPass,
            };
            return await accounts.create(data);
        } catch (error) {
            return error;
        }
    },
};

export default accountService;
