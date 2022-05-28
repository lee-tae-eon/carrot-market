import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
  const {
    query: { id },
    session: { user },
  } = req;

  const aleadyExist = await client.fav.findFirst({
    where: {
      productId: +id.toString(),
      userId: user?.id,
    },
  });

  if (aleadyExist) {
    await client.fav.delete({
      where: {
        id: aleadyExist.id,
      },
    });
  } else {
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }

  res.json({ ok: true });
}
// * nextjs 가 excute할 껍데기 handler
export default withApiSession(
  withHandler({
    method: ["POST"],
    handler,
  })
);
