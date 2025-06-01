import * as bcrypt from "bcryptjs";

export const GeneratePassword = async (
  password: string,
  salt = 10
): Promise<string> => {
  const hash: string = await bcrypt.hash(password, salt);

  return hash;
};
