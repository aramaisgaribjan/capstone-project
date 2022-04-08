/* eslint-disable @next/next/no-img-element */
import Container from "../components/Container";
import styled from "styled-components";
import { getSession, signOut } from "next-auth/react";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import { useSession } from "next-auth/react";
import Image from "next/image";

import logoutIcon from "../public/SVG/LogoutVector.svg";

export default function Profile() {
  const { data: session } = useSession();

  function getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const age = getAge(session.user.birthday);

  return (
    <main>
      <TitleBar />
      <Container>
        <PersonSection>
          <AllInfo>
            <ProfilePic>
              <img alt="profilepic" src={session.user.image} />
            </ProfilePic>
            <Info>
              <Nickname>{session.user.nickname}</Nickname>
              <p>{age} Jahre</p>
              <p>{session.user.city}</p>
            </Info>
          </AllInfo>
          <ButtonContainer>
            <Button onClick={() => signOut()}>
              <Image
                src={logoutIcon}
                width="30"
                height="30"
                alt="logout icon"
              />
              Sign out
            </Button>
          </ButtonContainer>
        </PersonSection>
      </Container>
      <Navbar />
    </main>
  );
}
const Button = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 20px;
  color: white;
  width: fit-content;
  background-color: green;
  border: 0px solid green;
  border-radius: 5px;
  gap: 3px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Nickname = styled.p`
  font-size: 26px;
  margin-bottom: 10px !important;
`;

const PersonSection = styled.section`
  background-color: #363535;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const ProfilePic = styled.div`
  > img {
    border-radius: 999px;
    width: 110px;
    height: 110px;
  }
`;
const Info = styled.div`
  background-image: #363535;
  padding: 5px;
  @import url("https://fonts.googleapis.com/css2?family=Bona+Nova&display=swap");
  font-family: "Bona Nova", serif;
  font-size: 18px;
  > p {
    margin: 0;
  }
`;
const AllInfo = styled.div`
  background-image: #363535;
  display: flex;
  padding: 5px;
  gap: 20px;
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
