import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default prisma;

(async () => {
  try {
    await prisma.$connect();
    console.log('Prisma connected successfully');
  } catch (error) {
    console.error('Prisma connection error:', error);
  }
})();

async function testConnection() {
  try {
    await prisma.$connect();
    const result = await prisma.user.findFirst(); // Example query
    console.log('Database connection successful', result);
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
