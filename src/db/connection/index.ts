import mongoose from "mongoose";

export const mongodbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.DB_URL as string);
    const {db} = conn.connection
    console.log(`DB connected : ${db.databaseName}`);
  } catch (error) {
    console.log(error);
  }
};
