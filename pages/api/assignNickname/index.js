import { getSession } from "next-auth/react";
import { connectDb } from "../../../utils/db";
import User from "../../../schema/User";

export default async function handler(request, response) {
  try {
    connectDb();

    const session = await getSession({ req: request });

    switch (request.method) {
      case "GET":
        const aboutMeText = await User.findById(session.user.id);
        response.status(200).json(aboutMeText);
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
