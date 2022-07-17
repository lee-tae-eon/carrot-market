import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
  if (req.method === "GET") {
    const products = await client.product.findMany({
      include: {
        _count: {
          select: {
            fav: true,
          },
        },
      },
    });
    return res.json({
      ok: true,
      products,
    });
  }
  if (req.method === "POST") {
    const {
      body: { price, name, description, photoId },
      session: { user },
    } = req;

    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: photoId,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      product,
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
