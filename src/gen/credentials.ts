import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

function generatePassword(length = 10, options = { saltRounds: 10 }) {
  const saltRounds = options.saltRounds;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return bcrypt.hash(password, saltRounds);
}

const { CREDENTIALS_PASSWORD_LENGTH, CREDENTIALS_SALTROUND } = process.env;
const passwordLength = parseInt(CREDENTIALS_PASSWORD_LENGTH as string);
const saltRounds = parseInt(CREDENTIALS_SALTROUND as string);

async function main() {
  const generatedCredentials = {
    cookieSecret: await generatePassword(passwordLength, { saltRounds }),
    domainSecret: await generatePassword(passwordLength, { saltRounds }),
  };
  fs.writeFileSync(
    path.resolve(__dirname, "../../.credentials.json"),
    JSON.stringify(generatedCredentials),
  );
}

main();
