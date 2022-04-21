import { useState } from "react";
import EditAboutMeForm from "./EditAboutMeForm";
import styled from "styled-components";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function AboutMe({ aboutMeText }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState();
  const [aboutMeActualText, setAboutMeActualText] = useState(aboutMeText);
  const { data: session } = useSession();

  const aboutMes = useSWR("/api/assignNickname");

  async function handleEditAboutMe(aboutMeData) {
    console.log("Hier: ");
    const response = await fetch(`/api/assignNickname/${session.user.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(aboutMeData),
    });
    const updatedAboutMe = await response.json();
    if (response.ok) {
      setAboutMeActualText(updatedAboutMe.data.aboutMeText);
      setError();
      setIsEditMode(false);
    } else {
      setError(updatedAboutMe.error ?? "Something went wrong");
    }
  }

  function handleEditButtonClick() {
    setIsEditMode(true);
  }

  function handleCancelEdit() {
    setIsEditMode(false);
  }
  return (
    <>
      {isEditMode ? (
        <EditAboutMeForm
          onSubmitAboutMe={handleEditAboutMe}
          onCancelEdit={handleCancelEdit}
          submitText={"Aktualisieren"}
          error={error}
          aboutMeText={aboutMeActualText}
          id={aboutMeText.id}
        />
      ) : (
        <>
          <H3>ÜBER MICH</H3>
          <HR />
          <Article>{aboutMeActualText}</Article>

          <ButtonContainer>
            <button onClick={handleEditButtonClick}>Bearbeiten</button>
          </ButtonContainer>
        </>
      )}
    </>
  );
}

const Article = styled.article`
  width: 330px;
  margin: 7px 0 30px 10px;
  font-size: 18px;
`;

const HR = styled.hr`
  width: 335px;
  margin-top: 0;
`;

const H3 = styled.h3`
  margin: 10px 0 10px 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

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
