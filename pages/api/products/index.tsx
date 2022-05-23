import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
  const {
    body: { price, name, description },
    session: { user },
  } = req;

  const product = await client.product.create({
    data: {
      name,
      price: +price,
      description,
      image: "hhh",
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
// * nextjs 가 excute할 껍데기 handler
export default withApiSession(
  withHandler({
    method: ["POST", "GET"],
    handler,
  })
);
