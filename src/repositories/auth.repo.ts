import moment from "moment";
import shortUUID from "short-uuid";
import { v4 as uuidV4 } from "uuid";
import { IUser, User } from "../db/models/users";
import mongoose from "mongoose";

const find = (data: Partial<IUser>) => {
  return User.findOne(data);
};

const update = (search: Partial<IUser>, update: Partial<IUser>) => {
  return User.updateOne(search, update);
};

const create = (email: IUser["email"]) => {
  const generatedDate = moment().toDate();
  const createdAt = generatedDate;
  const updatedAt = generatedDate;
  const uuid = shortUUID();
  const verification = uuid.fromUUID(uuidV4());

  return User.create({
    email,
    verification,
    createdAt,
    updatedAt,
  });
};

export const authRepo = { create, find, update };
