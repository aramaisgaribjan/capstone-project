import Container from "../components/Container";
import styled from "styled-components";
import { getSession, signOut } from "next-auth/react";
import backgroundImg from "../public/SVG/iwwa_lightbulb.svg";

export default function Profile() {
  return (
    <main>
      <Container>
        <Button onClick={() => signOut()}>Sign out</Button>
        <Background />
      </Container>
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
const Background = styled.div`
  background-image: url(${backgroundImg});
  border: 1px solid #000;
  width: 350px;
  height: 508px;
`;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
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
