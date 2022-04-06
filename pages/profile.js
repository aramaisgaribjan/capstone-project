import Container from "../components/Container";
import styled from "styled-components";
import { getSession, signOut } from "next-auth/react";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";

export default function Profile() {
  return (
    <main>
      <TitleBar />
      <Container>
        <Button onClick={() => signOut()}>Sign out</Button>
      </Container>
      <Navbar />
    </main>
  );
}
const Button = styled.button`
  margin-top: 20px;
  margin-left: 150px;
  padding: 0.7rem 1rem;
  text-align: center;
  color: white;
  background-color: green;
  border: 2px solid green;
  border-radius: 5px;
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
