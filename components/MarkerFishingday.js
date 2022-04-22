import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import Button from "./Button";
import { useSession } from "next-auth/react";

export default function MarkerFishingday({ fishingday }) {
  const [error, setError] = useState();
  const { data: session } = useSession();

  const fishingdays = useSWR("/api/fishingdays");

  async function handleJoinFishingday() {
    const response = await fetch(`/api/fishingdays/${fishingday._id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ $push: { participants: session.user?.id } }),
    });
    const updatedFishingday = await response.json();
    if (response.ok) {
      fishingdays.mutate();
      setError();
    } else {
      setError(updatedFishingday.error ?? "Something went wrong");
    }
  }

  async function handleLeaveFishingday() {
    const response = await fetch(`/api/fishingdays/${fishingday._id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ $pull: { participants: session.user?.id } }),
    });
    const deletedFishingday = await response.json();
    if (response.ok) {
      fishingdays.mutate();
      setError();
    } else {
      setError(deletedFishingday.error ?? "Something went wrong");
    }
  }

  let dtFormat = new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  let timeFormat = new Intl.DateTimeFormat("de-DE", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  let date = new Date(fishingday.dateTime).toISOString;

  return fishingdays.data
    ? fishingdays.data.map((fishingday) => (
        <>
          <Container>
            <Content>
              <Top>
                <Left>
                  <span>{"Zielfisch: " + fishingday.fish}</span>
                  <span>{"Gewässer: " + fishingday.waters}</span>
                </Left>
                <Right></Right>
              </Top>
              <span>{"Ersteller: " + fishingday.userId?.nickname}</span>
              <span>
                Teilnehmer: <li>{fishingday.userId?.nickname}</li>
                {fishingday.participants.map((participant) => (
                  <li key={fishingday._id}>
                    <Teilnehmer>{participant.nickname}</Teilnehmer>
                  </li>
                ))}
              </span>
            </Content>
            {fishingday.userId?._id !== session.user.id ? (
              <Buttons>
                {fishingday.participants.some(
                  (participant) => participant._id === session.user.id
                ) ? (
                  <Button
                    onClick={handleLeaveFishingday}
                    backgroundColor={"#8a2900"}
                  >
                    Austragen
                  </Button>
                ) : (
                  <Button
                    onClick={handleJoinFishingday}
                    backgroundColor={"green"}
                  >
                    Teilnehmen
                  </Button>
                )}
              </Buttons>
            ) : (
              ""
            )}
          </Container>
        </>
      ))
    : null;
}

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 200px;
  flex-wrap: wrap;
  background-color: #363535;

  > form {
    height: 100%;
  }
  > span {
    color: black;
  }
`;

const Top = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: white;
`;

const Buttons = styled.div`
  margin-top: auto;
  display: flex;
  gap: 0.5rem;
  > button {
    flex: 1 0 auto;
  }
`;

const Teilnehmer = styled.ul`
  padding: 0;
`;
