import { Schema, model } from "mongoose";

const fishingdaySchema = new Schema({
  fish: { type: String, required: true },
  waters: { type: String, required: true },
  date: { type: Date },
});

export default model("Fishingday", fishingdaySchema, "fishingdays", {
  overwriteModels: true,
});
