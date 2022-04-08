import Head from "next/head";
import { Fishingday } from "../components/Fishingday";
import Container from "../components/Container";
import { FishingdayForm } from "../components/FishingdayForm";
import { useCreateFishingday } from "../utils/hooks/useCreateFishingday";
import { getSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";

export default function Home() {
  const { handleCreateFishingday, error } = useCreateFishingday();

  return (
    <div>
      <Head>
        <title>Capstone-Project</title>
      </Head>
      <main>
        <TitleBar />
        <Container>
          <FishingdayForm
            onSubmitFishingday={handleCreateFishingday}
            submitText={"Erstellen"}
            error={error}
            id="create"
          />
        </Container>
        <Navbar />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
