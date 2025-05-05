import bcrypt from "bcryptjs";

export const comparePassword = async ({
  enteredPassword,
  recordPassword,
}: {
  enteredPassword: string;
  recordPassword: string;
}) => {
  return await bcrypt.compare(enteredPassword, recordPassword);
};
