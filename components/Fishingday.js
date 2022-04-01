import { useState } from "react";
import { EditFishingdayForm } from "./EditFishingdayForm";
import styled from "styled-components";
import useSWR from "swr";

export function Fishingday({ fishingday }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState();

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
        dateTime={fishingday.dateTime}
      />
    );
  } else {
    return (
      <Container>
        <span>{"Zielfisch: " + fishingday.fish}</span>
        <span>{"Gewässer: " + fishingday.waters}</span>
        <span>{"Datum: " + fishingday.dateTime}</span>
        <Buttons>
          <button onClick={handleEditButtonClick}>Bearbeiten</button>
          <button onClick={handleDeleteButtonClick}>Löschen</button>
        </Buttons>
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

const Buttons = styled.div`
  margin-top: auto;
  display: flex;
  gap: 0.5rem;
  > button {
    flex: 1 0 auto;
  }
`;
