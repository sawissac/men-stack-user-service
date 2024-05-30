export function generateOTP(digits: number) {
  var digitsString = "0123456789";

  var otpLength = digits;

  var otp = "";

  for (let i = 1; i <= otpLength; i++) {
    var index = Math.floor(Math.random() * digitsString.length);

    otp = otp + digitsString[index];
  }

  return otp;
}
