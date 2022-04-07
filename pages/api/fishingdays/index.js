import Fishingday from "../../../schema/Fishingday";
import { connectDb } from "../../../utils/db";
import { getSession } from "next-auth/react";

export default async function handler(request, response) {
  try {
    connectDb();

    const session = await getSession({ req: request });

    switch (request.method) {
      case "GET":
        if (session) {
          const fishingdays = await Fishingday.find()
            .populate("userId")
            .populate("participants");
          response.status(200).json(fishingdays);
        } else {
          response.status(401).json({ error: "Not authenticated" });
        }
        break;

      case "POST":
        if (session) {
          const createdFishingdays = await Fishingday.create({
            ...request.body,
            userId: session.user.id,
          });
          response
            .status(200)
            .json({ success: true, data: createdFishingdays });
        } else {
          response.status(401).json({ error: "Not authenticated" });
        }
        break;

      default:
        console.log("request method was neither GET or POST");
        response.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
}
