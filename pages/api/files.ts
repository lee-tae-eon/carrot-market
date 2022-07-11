import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGE_TOKEN}`,
        },
      }
    )
  ).json();
  console.log(response);
  return res.json({
    ok: true,
    ...response.result,
  });
}
// * nextjs 가 excute할 껍데기 handler
export default withApiSession(
  withHandler({
    method: ["GET"],
    handler,
  })
);
