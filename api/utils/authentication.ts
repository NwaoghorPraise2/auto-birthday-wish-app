import crypto from 'crypto';
import {CRYPTO_SECRET} from '../config/config';


const stringEnforce = () :string => { // this function is to ensure that the CRYPTO_SECRET is a string
    if (typeof CRYPTO_SECRET !== 'string') throw new Error('CRYPTO_SECRET must be a string');
    return CRYPTO_SECRET;
}

const SECRET: string = stringEnforce();

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
    return crypto
        .createHmac('sha256', [salt, password].join('/'))
        .update(SECRET)
        .digest('hex');
};