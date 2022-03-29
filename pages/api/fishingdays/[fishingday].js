import Fishingday from "../../../schema/Fishingday";
import { connectDb } from "../../../utils/db";

export default async function handler(request, response) {
  const { fishingdayId } = request.query;

  try {
    connectDb();

    switch (request.method) {
      case "PATCH":
        // patch the correct fishingday
        const updatedFishingday = await Fishingday.findByIdAndUpdate(
          fishingdayId,
          {
            $set: request.body,
          },
          { returnDocument: "after", runValidators: true }
        );

        if (updatedFishingday) {
          response.status(200).json({
            success: true,
            data: updatedFishingday,
          });
        } else {
          response.status(404).json({ error: "Not found" });
        }

        break;

      case "DELETE":
        const deletedFishingday = await Fishingday.findByIdAndDelete(
          fishingdayId
        );
        if (deletedFishingday) {
          response.status(200).json({
            success: true,
            data: deletedFishingday,
          });
        } else {
          response.status(404).json({ error: "Not found" });
        }
        break;

      default:
        console.log("request method was neither PATCH or DELETE");
        response.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
}
