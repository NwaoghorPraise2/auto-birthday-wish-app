import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client with logging options
const db = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Log various levels of database operations
    omit: { user: { password: true } } // Omit the password field from the user model in query results
});

export default db;
