import { Express } from 'express';
import morgan from 'morgan';
import fs from 'fs';

function configMorgan(app: Express) {
    const envRun: string | undefined = process.env.envRun;
    if (envRun === 'dev') {
        app.use(morgan('tiny'));
    } else {
        const fileLog = fs.createWriteStream('assess.log', { flags: 'a' });
        app.use(
            morgan('common', {
                stream: fileLog,
                skip: (req, res) => res.statusCode < 400,
            }),
        );
    }
}

export default configMorgan;
