import Container from "../components/Container";
import { getSession, signOut } from "next-auth/react";

export default function Meeting() {
  return (
    <main>
      <Container></Container>
    </main>
  );
}
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
