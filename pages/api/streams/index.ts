import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
  const {
    session: { user },
    body: { name, price, description },
    query: { page, skip },
  } = req;

  if (req.method === "POST") {
    const response = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGE_TOKEN}`,
          },
        }
      )
    ).json();
    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, stream });
  } else if (req.method === "GET") {
    const streams = await client.stream.findMany({
      take: +skip,
      skip: +skip * +page,
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ ok: true, streams });
  }
}
// * nextjs 가 excute할 껍데기 handler
export default withApiSession(
  withHandler({
    method: ["GET", "POST"],
    handler,
  })
);
