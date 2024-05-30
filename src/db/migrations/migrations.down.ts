import mongoose from "mongoose";
import { Models } from "../models";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

(function init() {
  mongoose
    .connect(process.env.DB_URL as string)
    .then(async () => {
      for (const [_, model] of Object.entries(Models)) {
        await model.collection.drop();
      }
    })
    .finally(() => {
      mongoose.connection.close();
      process.exit();
    })
    .catch((err) => {
      mongoose.connection.close();
      console.log(err);
    });
})();
