import { useState } from "react";
import { EditFishingdayForm } from "./EditFishingdayForm";
import styled from "styled-components";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export function Fishingday({ fishingday }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState();
  const { data: session } = useSession();

  const fishingdays = useSWR("/api/fishingdays");

  async function handleEditFishingday(fishingdayData) {
    const response = await fetch(`/api/fishingdays/${fishingday._id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(fishingdayData),
    });
    const updatedFishingday = await response.json();
    if (response.ok) {
      fishingdays.mutate();
      setError();
      setIsEditMode(false);
    } else {
      setError(updatedFishingday.error ?? "Something went wrong");
    }
  }

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
      setIsEditMode(false);
    } else {
      setError(updatedFishingday.error ?? "Something went wrong");
    }
  }

  function handleEditButtonClick() {
    setIsEditMode(true);
  }

  function handleCancelEditFishingday() {
    setIsEditMode(false);
  }

  async function handleDeleteButtonClick() {
    const response = await fetch(`/api/fishingdays/${fishingday._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fishingdays.mutate();
    }
  }

  let dtFormat = new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  let date = new Date(fishingday.dateTime);
  console.log(fishingday.dateTime);

  if (isEditMode) {
    return (
      <EditFishingdayForm
        onSubmitFishingday={handleEditFishingday}
        onCancelEdit={handleCancelEditFishingday}
        submitText={"Aktualisieren"}
        error={error}
        id={fishingday._id}
        fish={fishingday.fish}
        waters={fishingday.waters}
        dateTime={fishingday.dateTime.substring(
          0,
          fishingday.dateTime.length - 1
        )}
      />
    );
  } else {
    return (
      <Container>
        <Content>
          <span>{"Zielfisch: " + fishingday.fish}</span>
          <span>{"Gewässer: " + fishingday.waters}</span>
          <span>{"Datum: " + dtFormat.format(date) + " Uhr"}</span>
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

        {fishingday.userId?._id === session.user.id ? (
          <Buttons>
            <button onClick={handleEditButtonClick}>Bearbeiten</button>
            <button onClick={handleDeleteButtonClick}>Löschen</button>
          </Buttons>
        ) : (
          <Buttons>
            <button onClick={handleJoinFishingday}>Teilnehmen</button>
          </Buttons>
        )}
      </Container>
    );
  }
}

export const Container = styled.div`
  padding: 1rem 1rem 0.75rem 1rem;
  background-color: white;
  box-shadow: 0 0 10px rgb(0 0 0 / 6%), 0 5px 20px rgb(0 0 0 / 5%);
  height: 100%;
  border-radius: 10px;
  display: flex;
  gap: 1rem;
  width: 300px;
  flex-wrap: wrap;

  > form {
    height: 100%;
  }
  > span {
    color: black;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  gap: 10px;
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
