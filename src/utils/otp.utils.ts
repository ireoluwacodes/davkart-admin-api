export const generateOtp = (): number => {
  let otp: number = Math.floor(100000 + Math.random() * 900000);
  return otp;
};
