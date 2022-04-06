import Container from "../components/Container";
import { getSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";

export default function Meeting() {
  return (
    <main>
      <TitleBar />
      <Container></Container>
      <Navbar />
    </main>
  );
}
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
