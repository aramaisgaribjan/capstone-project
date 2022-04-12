import { getSession } from "next-auth/react";
import { connectDb } from "../../../utils/db";
import User from "../../../schema/User";

export default async function handler(request, response) {
  const { userId } = request.query;

  try {
    connectDb();

    const session = await getSession({ req: request });

    switch (request.method) {
      case "PATCH":
        const createNickname = await User.findByIdAndUpdate(
          userId,
          {
            $set: {
              nickname: request.body.nickname,
              city: request.body.city,
              birthday: request.body.birthday,
              image: request.body.image,
              aboutMeText: request.body.aboutMeText,
            },
          },
          { returnDocument: "after", runValidators: true }
        ).where({ userId: session.user.id });

        if (createNickname) {
          response.status(200).json({
            success: true,
            data: createNickname,
          });
        } else {
          response.status(404).json({ error: "Not found" });
        }

        break;

      case "GET":
        const aboutMeText = await User.findById(session.user.id).exec();
        response.status(200).json(aboutMeText);
        console.log(session.user.id);
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
