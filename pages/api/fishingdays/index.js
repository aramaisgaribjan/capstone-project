import Fishingday from "../../../schema/Fishingday";
import { connectDb } from "../../../utils/db";

export default async function handler(request, response) {
  try {
    connectDb();

    switch (request.method) {
      case "GET":
        const fishingdays = await Fishingday.find();
        response.status(200).json(fishingdays);
        break;

      case "POST":
        const createdFishingdays = await Fishingday.create({
          ...request.body,
        });
        response.status(200).json({ success: true, data: createdFishingdays });
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
