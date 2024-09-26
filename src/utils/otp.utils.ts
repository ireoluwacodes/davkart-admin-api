export const generateOtp = (): number => {
  const otp: number = Math.floor(100000 + Math.random() * 900000);
  return otp;
};
