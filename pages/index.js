import Head from "next/head";
import { Fishingday } from "../components/Fishingday";
import Container from "../components/Container";
import useSWR from "swr";
import { FishingdayForm } from "../components/FishingdayForm";
import { useCreateFishingday } from "../utils/hooks/useCreateFishingday";
import styled from "styled-components";

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

export default function Home() {
  const { handleCreateFishingday, error } = useCreateFishingday();
  const fishingdays = useSWR("/api/fishingdays", fetcher);

  return (
    <div>
      <Head>
        <title>Capstone-Project</title>
      </Head>
      <main>
        <Container>
          <FishingdayForm
            onSubmitFishingday={handleCreateFishingday}
            submitText={"Create fishingday"}
            error={error}
            id="create"
          />
          {fishingdays.data ? (
            <JokeList>
              {fishingdays.data.map((fishingday) => (
                <li key={fishingday._id}>
                  <Fishingday fishingday={fishingday} />
                </li>
              ))}
            </JokeList>
          ) : (
            "Empty"
          )}
        </Container>
      </main>
    </div>
  );
}
const JokeList = styled.ul`
  list-style: none;
  width: 300px;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin: 30px auto 0;
  padding-inline-start: 0;
  flex-direction: row;
  overflow-y: auto;
  > li {
    margin: auto;
  }
`;
