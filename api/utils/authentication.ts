import CryptoJS from 'crypto-js';
import {CRYPTO_SECRET} from '../config/config';


const SECRET: string = CRYPTO_SECRET as string;


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