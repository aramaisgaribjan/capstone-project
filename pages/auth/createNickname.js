import styled from "styled-components";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import backgroundImg from "/public/LoginBackground.png";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CreateNickname({ id }) {
  const { data: session } = useSession();
  const router = useRouter();

  async function assignNickname(nickname, city, birthday, aboutMeText) {
    const response = await fetch(`/api/assignNickname/${session.user.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ nickname, city, birthday, aboutMeText }),
    });
    if (response.ok) {
      router.push("/");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const aboutMeText =
      "Ein schlechter Tag beim Angeln ist immer noch besser als ein guter Tag auf der Arbeit.";
    assignNickname(
      event.target.elements.nickname.value,
      event.target.elements.city.value,
      event.target.elements.birthday.value,
      aboutMeText
    );
  }

  useEffect(() => {
    if (session.user.nickname) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <Main>
      <ImageContainer>
        <Image
          src={backgroundImg}
          alt="Bild in svg"
          layout="fill"
          objectFit="cover"
        />
      </ImageContainer>
      <h2>FishingBuddies!</h2>
      <Form onSubmit={handleSubmit}>
        <label htmlFor={`nickname-${id}`}>
          Bitte vergebe deinen Nicknamen!
        </label>
        <input
          type="text"
          required
          id={`nickname-${id}`}
          name="nickname"
          placeholder="Nickname"
        />
        <label htmlFor={`city-${id}`}>In welcher Stadt wohnst du?</label>
        <input
          type="text"
          required
          id={`city-${id}`}
          name="city"
          placeholder="Stadt"
        />
        <label htmlFor={`birthday-${id}`}>Wann hast du Geburtstag?</label>
        <input
          type="date"
          required
          id={`birthday-${id}`}
          name="birthday"
          placeholder="tt.mm.jjjj"
          min="1920-01-01"
          max="2015-12-31"
        />
        <input type="submit" value="Erstellen" />
      </Form>
    </Main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    if (session.user.nickname) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  } else {
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
const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Form = styled.form`
  margin: auto;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  gap: 1rem;
  flex-direction: column;
  color: white;
  position: relative;
  width: fit-content;
  background-color: grey;
  font-size: 22px;

  input[type="text"] {
    padding: 0.5rem;
    border: 2px solid rgb(190 190 190);
    border-radius: 3px;
    width: 300px;
  }

  input[type="submit"] {
    width: fmax-content;
    padding: 0.2rem 1.5rem 0.2rem 1.5rem;
    border: 2px solid #00aa44;
    border-radius: 5px;
    background-color: #00aa44;
    color: white;
    font-size: 18px;
  }
`;

const Main = styled.main`
  height: 100vh;
  width: 100vw;
  > p {
    color: white;
    position: relative;
    font-size: 48px;
    margin: 0;
    text-align: center;
    top: 110px;
  }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  position: relative;
  top: 80px;
  left: 80px;
  font-size: 22px;
  width: fit-content;
  height: 41px;
  cursor: pointer;
  color: #00ff85;
  background-color: #595959;
  border: 1px solid #595959;
  border-radius: 10px;
  :hover {
    background-color: green;
    color: white;
  }
`;
