import { model, Schema } from "mongoose";
import { IType } from "../types/type.types";

const typeSchema = new Schema<IType>({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

typeSchema.methods.toJSON = function () {
  const { __v, _id, ...type } = this.toObject();
  type.id = _id.toString();
  return type;
};

const Types = model("Types", typeSchema);

export default Types;
