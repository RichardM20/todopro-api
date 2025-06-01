import { Schema, model } from "mongoose";
import { IUser } from "../types/user.type";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

userSchema.methods.toJSON = function () {
  const { __v, _id, password, ...user } = this.toObject();

  user.uid = _id;
  return user;
};

const User = model("User", userSchema);

export default User;
