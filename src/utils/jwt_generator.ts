import jwt from "jsonwebtoken";

export const GenerateJWT = (uid = ""): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRET_JWT as string,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) {
          reject("Token could not be generated");
        } else {
          resolve(token);
        }
      }
    );
  });
};
