import { PrismaClient } from '@prisma/client';


const db = new PrismaClient({ log: ['query', 'info', 'warn', 'error'], omit: {user: { password: true } } });

export default db;