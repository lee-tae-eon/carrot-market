import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResType } from "@libs/server/withHandler";
import client from "@libs/server/client";
// declar module
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}
async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });

  res.json({
    ok: true,
    profile,
  });
}
// * nextjs 가 excute할 껍데기 handler
export default withIronSessionApiRoute(withHandler("GET", handler), {
  cookieName: "carrotsession",
  password: "6sfasd213g^24dsa@!DGG324y77JJWt27ugadfgmk;'2345.,,dfsfgFsd",
});
