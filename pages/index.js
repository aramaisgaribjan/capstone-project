import Head from "next/head";
import { Fishingday } from "../components/Fishingday";
import Container from "../components/Container";
import useSWR from "swr";
import { FishingdayForm } from "../components/FishingdayForm";
import { useCreateFishingday } from "../utils/hooks/useCreateFishingday";
import styled from "styled-components";
import { getSession } from "next-auth/react";

export default function Home() {
  const { handleCreateFishingday, error } = useCreateFishingday();
  const fishingdays = useSWR("/api/fishingdays");

  return (
    <div>
      <Head>
        <title>Capstone-Project</title>
      </Head>
      <main>
        <Container>
          <FishingdayForm
            onSubmitFishingday={handleCreateFishingday}
            submitText={"Erstellen"}
            error={error}
            id="create"
          />
          {fishingdays.data ? (
            <FishingdayList>
              {fishingdays.data.map((fishingday) => (
                <li key={fishingday._id}>
                  <Fishingday fishingday={fishingday} />
                </li>
              ))}
            </FishingdayList>
          ) : (
            "Empty"
          )}
        </Container>
      </main>
    </div>
  );
}
const FishingdayList = styled.ul`
  list-style: none;
  width: 390px;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin: 30px auto 0;
  padding-inline-start: 0;
  flex-direction: row;
  > li {
    margin: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: max-content;
  }
`;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/signin/",
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
