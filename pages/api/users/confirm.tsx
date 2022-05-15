import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResType } from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
  const { token } = req.body;
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
    include: { user: true },
  });
  if (!exists) res.status(404).end();

  req.session.user = {
    id: exists?.userId,
  };
  await req.session.save();
  res.status(200).end();
}
// * nextjs 가 excute할 껍데기 handler
export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrotsession",
  password: "6sfasd213g^24dsa@!DGG324y77JJWt27ugadfgmk;'2345.,,dfsfgFsd",
});
