import Container from "../components/Container";
import { getSession, useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import { Fishingday } from "../components/Fishingday";
import styled from "styled-components";
import useSWR from "swr";

export default function Meeting() {
  const fishingdays = useSWR("/api/fishingdays");
  const { data: session } = useSession();

  console.log(fishingdays.data);
  return (
    <main>
      <TitleBar />
      <Container>
        {fishingdays.data ? (
          <FishingdayList>
            {fishingdays.data
              .filter(
                (fishingday) => fishingday.userId?._id === session.user?.id
              )
              .map((fishingday) => (
                <li key={fishingday._id}>
                  <Fishingday fishingday={fishingday} />
                </li>
              ))}
            {fishingdays.data
              .filter((fishingday) =>
                fishingday.participants?.some(
                  (participant) => participant._id === session.user?.id
                )
              )
              .map((fishingday) => (
                <li key={fishingday._id}>
                  <Fishingday fishingday={fishingday} />
                </li>
              ))}
          </FishingdayList>
        ) : (
          "Empty"
        )}
      </Container>
      <Navbar />
    </main>
  );
}

const FishingdayList = styled.ul`
  list-style: none;
  width: 375px;
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
