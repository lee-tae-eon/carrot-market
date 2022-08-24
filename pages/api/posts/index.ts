import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
  if (req.method === "POST") {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req;
    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    await res.unstable_revalidate("/community");

    res.json({
      ok: true,
      post,
    });
  }

  if (req.method === "GET") {
    const {
      query: { latitude, longitude },
    } = req;
    const latNum = parseFloat(latitude.toString());
    const longNum = parseFloat(longitude.toString());
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            wonderings: true,
            answers: true,
          },
        },
      },
      where: {
        latitude: {
          gte: latNum - 0.01,
          lte: latNum + 0.01,
        },
        longitude: {
          gte: longNum - 0.01,
          lte: longNum + 0.01,
        },
      },
    });

    res.json({
      ok: true,
      posts,
    });
  }
}
// * nextjs 가 excute할 껍데기 handler
export default withApiSession(
  withHandler({
    method: ["POST", "GET"],
    handler,
  })
);
