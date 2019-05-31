/* eslint-disable no-param-reassign */
import * as multer from 'multer';
import * as path from 'path';
import * as crypto from 'crypto';

const storePath = path.resolve(__dirname, '..', '..', 'tmp');

export const MulterConfig = {
    dest: storePath,
    storage: multer.diskStorage({
        destination: (req, file, callBack) => {
            callBack(null, storePath);
        },
        filename: (req, file, callBack) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) {
                    callBack(err, undefined);
                } else {
                    const key = `${hash.toString('hex')}-${file.originalname}`;
                    callBack(null, key);
                }
            });
        },
    }),
};
