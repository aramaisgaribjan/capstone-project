import { connect } from "mongoose";

export function connectDb() {
  connect(process.env.MONGODB_URI);
}
