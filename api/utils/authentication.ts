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

export const validatePassword = (encryptedPassword: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export const comparePassword = (password: string, encryptedPassword: string) => {
    return validatePassword(encryptedPassword) === password;
}