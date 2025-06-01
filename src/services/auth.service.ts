import bcrypt from "bcryptjs";

import User from "../models/user.model";
import { IAuth } from "../types/auth.type";
import { NotFoundError, UserAlreadyExist } from "../utils/errors/api_errors";
import { GenerateJWT } from "../utils/jwt_generator";
import { GeneratePassword } from "../utils/password_generator";

class AuthService {
  async login(email: string, password: string): Promise<IAuth> {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      throw new NotFoundError("Email or password is incorrect");
    }

    const isMatch = bcrypt.compareSync(password, userFound.password);

    if (!isMatch) {
      throw new NotFoundError("Email or password is incorrect");
    }

    const accessToken = await GenerateJWT(userFound.id);

    const userAuth = {
      accessToken,
      user: userFound,
    } as IAuth;

    return userAuth;
  }

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<IAuth> {
    const userExist = await User.findOne({ email });

    if (userExist) {
      throw new UserAlreadyExist("The user already registered");
    }

    const encriptedPassword = await GeneratePassword(password);
    const createAt = Date.now();

    const newUser = new User({
      name,
      email,
      createAt,
    });

    newUser.password = encriptedPassword;

    await newUser.save();

    const accessToken = await GenerateJWT(newUser.id);

    const userRegistered = {
      accessToken,
      user: newUser,
    } as IAuth;

    return userRegistered;
  }

  async refreshMe(userId: string) {
    const query = { _id: userId };
    const user = await User.findById(query).select("-password");

    if (!user) {
      throw new NotFoundError("user not found");
    }

    return user;
  }
}

export default AuthService;
