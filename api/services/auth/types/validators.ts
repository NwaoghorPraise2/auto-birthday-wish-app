import * as z from 'zod';

/**
 * @desc Schema for user registration
 */
export const User = z.object({
  username: z.string(),             // Required username
  name: z.string().optional(),      // Optional name
  email: z.string().email(),        // Required email, must be a valid email address
  phone_number: z.string().optional(), // Optional phone number
  password: z.string(),             // Required password
  refreshToken: z.string().optional(), // Optional refresh token
});

/**
 * @desc Type inferred from the User schema
 */
export type UserData = z.infer<typeof User>;

/**
 * @desc Schema for user login
 */
export const Login = z.object({
  email: z.string().email(),        // Required email, must be a valid email address
  password: z.string(),             // Required password
});
