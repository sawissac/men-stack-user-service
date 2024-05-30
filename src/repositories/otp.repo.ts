import { OTP_STATUS } from "../constants";
import { IOtp, OTP } from "../db/models/otps";
import moment from "moment";

const findPendingById = (userId: IOtp["userId"]) => {
  return OTP.findOne({ userId, status: OTP_STATUS.PENDING });
};

const findPendingByRef = (ref: IOtp["ref"], populate: boolean = false) => {
  if (populate) {
    return OTP.findOne()
      .where({ ref })
      .or([{ status: OTP_STATUS.PENDING }, { status: OTP_STATUS.REJECTED }])
      .populate("userId");
  }

  return OTP.findOne({ ref, status: OTP_STATUS.PENDING });
};

const updateApproveByRef = (ref: IOtp["ref"]) => {
  return OTP.updateOne(
    { ref, status: OTP_STATUS.PENDING },
    { status: OTP_STATUS.APPROVE }
  );
};

const updateManyStatusById = (
  userId: IOtp["userId"],
  statusSearch: IOtp["status"],
  statusUpdate: IOtp["status"]
) => {
  return OTP.updateMany(
    { userId, status: statusSearch },
    { status: statusUpdate }
  );
};

const create = async (
  userId: IOtp["userId"],
  otp: IOtp["otp"],
  ref: IOtp["ref"]
) => {
  const generatedDate = moment().toDate();
  const createdAt = generatedDate;
  const updatedAt = generatedDate;
  const foundPendingOTP = await findPendingById(userId);

  if (foundPendingOTP) {
    await updateManyStatusById(
      userId,
      OTP_STATUS.PENDING,
      OTP_STATUS.CANCELLED
    );
  }

  return OTP.create({
    userId,
    ref,
    otp,
    createdAt,
    updatedAt,
  });
};

const update = (filter: Partial<IOtp>, update: Partial<IOtp>) => {
  return OTP.updateOne(filter, update);
};

export const otpRepo = {
  create,
  update,
  findPendingById,
  findPendingByRef,
  updateManyStatusById,
  updateApproveByRef,
};
