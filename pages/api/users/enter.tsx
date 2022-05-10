import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

interface ResType {
  ok: boolean;
  [key: string]: any;
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;

  //  user가 없으면.
  if (!user) return res.status(400).json({ ok: false });
  // token 값
  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  //  prisma 의 relation을 이용해서 token을 create할 때
  //  user가 없는 유저면 생성 후 token까지 생성 있으면 token만 생성 후 connect
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  console.log(token);

  // if (email) {
  //   user = await client.user.findUnique({
  //     where: {
  //       email,
  //     },
  //   });
  //   if (!user) {
  //     console.log("not found . will create.");
  //     user = await client.user.create({
  //       data: {
  //         name: "Anonymous",
  //         email,
  //       },
  //     });
  //   }
  //   console.log(user);
  // }
  // if (phone) {
  //   user = await client.user.findUnique({
  //     where: {
  //       phone: +phone,
  //     },
  //   });
  //   if (!user) {
  //     console.log("not found . will create.");
  //     user = await client.user.create({
  //       data: {
  //         name: "Anonymous",
  //         phone: +phone,
  //       },
  //     });
  //   }
  //   console.log(user);
  // }

  return res.status(200).json({
    ok: true,
  });
}
// * nextjs 가 excute할 껍데기 handler
export default withHandler("POST", handler);
