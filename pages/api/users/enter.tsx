import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);

  return res.status(200).end();
}
// * nextjs 가 excute할 껍데기 handler
export default withHandler("POST", handler);
