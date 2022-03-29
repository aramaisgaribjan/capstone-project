import Head from "next/head";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import { FishingdayForm } from "../components/FishingdayForm";
import { useCreateFishingday } from "../utils/hooks/useCreateFishingday";
import FishingdayList from "../components/FishingdayList";

export default function Home() {
  const { handleCreateFishingday, error } = useCreateFishingday();
  return (
    <div>
      <Head>
        <title>Capstone-Project</title>
      </Head>

      <main>
        <h1>Fishingdays</h1>
        <Container>
          <div>Create a new Fishingday</div>
          <FishingdayForm
            onSubmitFishingday={handleCreateFishingday}
            submitText={"Create fishingday"}
            error={error}
            id="create"
          />
          <FishingdayList />
        </Container>
        <Navbar />
      </main>
    </div>
  );
}
