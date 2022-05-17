import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
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
export default withApiSession(withHandler("GET", handler));
