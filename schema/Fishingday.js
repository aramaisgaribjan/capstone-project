import { Schema, model } from "mongoose";
import "./User";

const fishingdaySchema = new Schema({
  fish: { type: String, required: true },
  waters: { type: String, required: true },
  dateTime: { type: Date },
  lat: { type: String },
  lng: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export default model("Fishingday", fishingdaySchema, "fishingdays", {
  overwriteModels: true,
});
