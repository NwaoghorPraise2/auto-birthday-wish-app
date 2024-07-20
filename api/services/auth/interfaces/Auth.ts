import * as z from 'zod';

export const User = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone_number: z.string(),
  password: z.string(),
});

export type UserData = z.infer<typeof User>;