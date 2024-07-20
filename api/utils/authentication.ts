import CryptoJS from 'crypto-js';
import {CRYPTO_SECRET} from '../config/config';


const stringEnforce = () :string => { // this function is to ensure that the CRYPTO_SECRET is a string
    if (typeof CRYPTO_SECRET !== 'string') throw new Error('CRYPTO_SECRET must be a string');
    return CRYPTO_SECRET;
}

const SECRET: string = stringEnforce();


export const authentication = (password: string) => {
    return CryptoJS.AES.encrypt(password, SECRET).toString();
}