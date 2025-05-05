import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 9);
};
