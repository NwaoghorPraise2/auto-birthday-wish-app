import CryptoJS from 'crypto-js';
import { CRYPTO_SECRET } from '../config/config';

// Ensure the secret key is defined as a string
const SECRET: string = CRYPTO_SECRET as string;

/**
 * @desc Encrypts a password using AES encryption
 * @param password - The plaintext password to encrypt
 * @returns Encrypted password as a string
 */
export const authenticate = (password: string): string => {
    return CryptoJS.AES.encrypt(password, SECRET).toString();
};

/**
 * @desc Decrypts an encrypted password
 * @param encryptedPassword - The encrypted password string
 * @returns The decrypted plaintext password
 */
export const validatePassword = (encryptedPassword: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
};

/**
 * @desc Compares a plaintext password with an encrypted password
 * @param password - The plaintext password
 * @param encryptedPassword - The encrypted password
 * @returns True if passwords match, otherwise false
 */
export const comparePassword = (password: string, encryptedPassword: string): boolean => {
    return validatePassword(encryptedPassword) === password;
};
