import express from "express";
import { requestValidator } from "../middlewares/requestValidator";
import { authController } from "../controllers/auth";

const router = express.Router();

router.post("/login", requestValidator.authLogin, authController.login);
router.post("/verify-otp", requestValidator.verifyOtp, authController.verifyOTP)
router.post("/member", requestValidator.verifyToken, requestValidator.verifyMember, authController.memberUpdate)
router.get("/member", requestValidator.verifyToken, authController.member)

export const authRoutes = router;
