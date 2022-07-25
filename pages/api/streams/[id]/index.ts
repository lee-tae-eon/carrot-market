import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
  const {
    query: { id },
    session: { user },
  } = req;

  const stream = await client.stream.findUnique({
    where: {
      id: +id.toString(),
    },
    // * includes 는 모든정보를 노출  select로 선택하자
    include: {
      messages: {
        select: {
          message: true,
          id: true,
          user: {
            select: {
              avatar: true,
              id: true,
            },
          },
        },
      },
    },
  });
  if (!stream) {
    return res.status(404).json({ ok: false, message: "nothing" });
  }

  const isOwner = stream?.userId === user?.id;

  if (stream && !isOwner) {
    stream.cloudflareKey = "xxxx";
    stream.cloudflareUrl = "xxxx";
  }

  res.json({ ok: true, stream });
}
// * nextjs 가 excute할 껍데기 handler
export default withApiSession(
  withHandler({
    method: ["GET"],
    handler,
  })
);
