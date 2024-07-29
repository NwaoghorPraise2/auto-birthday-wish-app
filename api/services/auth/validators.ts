import * as z from 'zod';

export const User = z.object({
  username: z.string(),
  name: z.string().optional(),
  email: z.string().email(),
  phone_number: z.string().optional(),
  password: z.string(),
});

export type UserData = z.infer<typeof User>;

export const Login = z.object({
  email: z.string().email(),
  password: z.string(),
});