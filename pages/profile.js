/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { getSession, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import AboutMe from "../components/AboutMe";
import UploadCatches from "../components/UploadCatches";
import CatchesGallery from "../components/CatchesGallery";
import useSWR from "swr";
import { search, mapImageResources } from "../src/lib/cloudinary";
import logoutIcon from "../public/SVG/LogoutVector.svg";

export default function Profile({ images, nextCursor }) {
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

  const aboutMeText = useSWR(`/api/assignNickname/`);

  return (
    <main>
      <TitleBar />
      <Container>
        <Sections>
          <Section>
            <AllInfo>
              <ProfilePic>
                <img
                  alt="profilepic"
                  src={session.user.image}
                  referrerpolicy="no-referrer"
                />
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
          </Section>
          <Section>
            {aboutMeText.data ? (
              <AboutMe aboutMeText={aboutMeText.data.aboutMeText} />
            ) : null}
          </Section>
          <Section>
            <CatchesGallery images={images} nextCursor={nextCursor} />
            <UploadCatches />
          </Section>
        </Sections>
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
  margin-right: 5px;
`;

const Nickname = styled.p`
  font-size: 26px;
  margin-bottom: 10px !important;
`;

const Section = styled.section`
  background-color: #363535;
  display: flex;
  flex-direction: column;
  padding: 0 10px 10px 10px;
  max-height: 355px;
  overflow-y: scroll;
`;

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  margin-top: 10px;
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
  const results = await search();

  return {
    props: {
      session,
     
    },
  };
}
