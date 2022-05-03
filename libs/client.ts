import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

prismaClient.user.create({
  data: {
    email: "eon@naver.com",
    name: "lee",
  },
});
