import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
  const {
    query: { id },
    session: { user },
    body: { answer },
  } = req;

  const newAnswer = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: +id.toString(),
        },
      },
      answer,
    },
  });
  console.log(newAnswer);

  res.json({
    ok: true,
    answer: newAnswer,
  });
}
// * nextjs 가 excute할 껍데기 handler
export default withApiSession(
  withHandler({
    method: ["POST"],
    handler,
  })
);
