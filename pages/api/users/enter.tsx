import { NextApiRequest, NextApiResponse } from "next";
import mail from "@sendgrid/mail";
import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { ResType } from "@libs/server/withHandler";

mail.setApiKey(process.env.SENDGRID_APIKEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
  const { phone, email, name } = req.body;
  const user = phone ? { phone } : email ? { email } : null;

  //  user가 없으면.
  if (!user) return res.status(400).json({ ok: false });
  // token 값
  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  //  prisma 의 relation을 이용해서 token을 create할 때
  //  user가 없는 유저면 생성 후 token까지 생성 있으면 token만 생성 후 connect
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name,
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    // twilio set
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MESSAGE_SERVICES_ID,
    //   to: process.env.DEFAULT_PHONE!,
    //   body: `Your login token is ${payload}`,
    // });
  } else if (email) {
    // const email = await mail.send({
    //   from: "eongon@naver.com",
    //   to: "eongon@naver.com",
    //   subject: "Your Carrot Market Verification Email",
    //   text: `Your toke is ${payload}`,
    //   html: `<strong>Your toke is ${payload}</strong>`,
    // });
  }

  return res.status(200).json({
    ok: true,
  });
}
// * nextjs 가 excute할 껍데기 handler
export default withHandler({
  method: ["POST"],
  handler,
  isPrivate: false,
});
