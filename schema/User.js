import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String },
  nickname: { type: String },
  image: { type: String },
  email: { type: String },
  city: { type: String },
  birthday: { type: Date },
});

export default model("User", userSchema, "users", { overwriteModels: true });
