import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  [...Array.from(Array(500).keys())].forEach(async (item) => {
    const stream = await client?.stream.create({
      //@ts-ignore
      data: {
        name: String(item),
        description: String(item),
        price: item,
        user: {
          connect: {
            id: 1,
          },
        },
      },
    });
  });
}

main()
  .catch((event) => console.log(event))
  .finally(() => client?.$disconnect());
