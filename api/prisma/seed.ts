import { PrismaClient } from '@prisma/client';
import { fake } from './fake';

const prisma = new PrismaClient();

async function main() {
  if (process.env.FAKE) {
    await fake(prisma);
    return;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();
  });
