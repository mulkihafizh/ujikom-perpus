import crypto from "node:crypto";
export const authenticate = async (
  password: string,
  encrypted_password: string
) => {
  const hash = crypto
    .createHmac("sha256", "4r34l1y53cr37")
    .update(password)
    .digest("hex");

  return hash === encrypted_password;
};
