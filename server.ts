import fs from "fs";
import path from "path";
import https from "https";
import { server, serverPort } from "./src";
import { mongodbConnect } from "./src/db/connection";

const options = {
  key: fs.readFileSync(path.join(__dirname, "./src/cert/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "./src/cert/cert.pem")),
};

const sslServer = https.createServer(options, server);

mongodbConnect()
  .then(() => {
    sslServer.listen(serverPort, () => {
      console.log(
        `Secure server is listening on port https://localhost:${serverPort}`
      );
    });
  })
  .catch((err) => console.log(err));
