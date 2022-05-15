import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResType } from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
  const { token } = req.body;
  console.log(token);
  res.status(200).end();
}
// * nextjs 가 excute할 껍데기 handler
export default withHandler("POST", handler);
