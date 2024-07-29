import * as z from 'zod';
import { Request } from 'express';

export const User = z.object({
  username: z.string(),
  name: z.string().optional(),
  email: z.string().email(),
  phone_number: z.string().optional(),
  password: z.string(),
});


export type UserData = z.infer<typeof User>;


export interface IAuthRequest extends Request {
  user?: {
    id: string }
  body: UserData;
  headers: { authorization?: string };
}


export const Login = z.object({
  email: z.string().email(),
  password: z.string(),
});