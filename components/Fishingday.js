import { useState } from "react";
import { FishingdayForm } from "./FishingdayForm";
import styled from "styled-components";
import useSWR from "swr";

export function Fishingday({ fishingday }) {
  const fishingdays = useSWR("/api/fishingday");

  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState();

  async function handleEditFishingday(newText) {
    setIsUpdating(true);
    const response = await fetch(`/api/fishingday/${fishingday._id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: newText }),
    });
    const updatedFishingday = await response.json();
    if (response.ok) {
      fishingdays.mutate();
      setError();
      setIsEditMode(false);
    } else {
      setError(updatedFishingday.error ?? "Something went wrong");
    }
    setIsUpdating(false);
  }

  function handleEditButtonClick() {
    setIsEditMode(true);
  }

  async function handleDeleteButtonClick() {
    setIsDeleting(true);
    const response = await fetch(`/api/fishingdays/${fishingday._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fishingdays.mutate();
    }
    setIsDeleting(false);
  }

  if (isEditMode) {
    return (
      <Container>
        <FishingdayForm
          defaultValue={fishingday.text}
          onSubmitFishingday={handleEditFishingday}
          submitText={"Update fishingday"}
          error={error}
          id={fishingday._id}
        />
      </Container>
    );
  } else {
    return (
      <Container>
        <span>{fishingday.text}</span>
        <Buttons>
          <button onClick={handleEditButtonClick}>Edit</button>
          <button onClick={handleDeleteButtonClick}>Delete</button>
        </Buttons>
      </Container>
    );
  }
}

export const Container = styled.article`
  padding: 1rem 1rem 0.75rem 1rem;
  background-color: rgb(246 246 246);
  box-shadow: 0 0 10px rgb(0 0 0 / 6%), 0 5px 20px rgb(0 0 0 / 5%);
  height: 100%;
  display: flex;
  gap: 1rem;

  > form {
    height: 100%;
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
