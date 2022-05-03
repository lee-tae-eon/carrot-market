import { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const test = await client.user.create({
    data: {
      email: "hi",
      name: "lee",
    },
  });

  console.log(test);
  res.json({
    ok: true,
    data: "test",
  });
}
