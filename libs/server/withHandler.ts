import { NextApiRequest, NextApiResponse } from "next";

export interface ResType {
  ok: boolean;
  [key: string]: any;
}

type method = "GET" | "POST" | "DELETE";

interface ConfigType {
  method: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({
  method,
  handler,
  isPrivate = true,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method && !method.includes(req.method as method)) {
      return res.status(405).end();
    }
    if (isPrivate && !req?.session?.user?.id) {
      return res.status(401).json({ ok: false, errors: "please login" });
    }
    try {
      //* 실제 실행 될 function (Handler);
      await handler(req, res);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err });
    }
  };
}
