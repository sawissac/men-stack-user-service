import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import nodeMailer from "nodemailer";
import handleBars from "handlebars";
import { IUser } from "../db/models/users";
import { IOtp } from "../db/models/otps";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const templateString = fs.readFileSync(
  path.resolve(__dirname, "../view/otp-mail.hbs"),
  {
    encoding: "utf8",
    flag: "r",
  }
);

const template = handleBars.compile(templateString);
const user = process.env.NODE_MAILER_EMAIL_ACC as string;
const pass = process.env.NODE_MAILER_EMAIL_PASS as string;

const transportMail = nodeMailer.createTransport({
  service: "Gmail",
  auth: {
    user,
    pass,
  },
});

export async function sendOtpMail(
  to: IUser["email"],
  otp: IOtp["otp"],
  ref: IOtp["ref"],
) {
  const mailContent = {
    from: user,
    to,
    subject: `OTP[${otp}] TEST MAIL VERIFICATION`,
    html: template({
      user: {
        otp,
        ref,
        email: to,
      },
    }),
  };

  await transportMail.sendMail(mailContent);
}