import { NextApiRequest, NextApiResponse } from "next";

export default function withHandler(
  method: "GET" | "POST" | "DELETE",
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      //* 실제 실행 될 function (Handler);
      await fn(req, res);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err });
    }
  };
}
