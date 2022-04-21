/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import Container from "../components/Container";
import { useCreateFishingday } from "../utils/hooks/useCreateFishingday";
import { getSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import Map from "../components/Map";

export default function Home() {
  const { handleCreateFishingday, error } = useCreateFishingday();

  return (
    <div>
      <Head>
        <title>Capstone-Project</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;1,100;1,300;1,400&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <main>
        <TitleBar />
        <Container>
          <Map />
        </Container>
        <Navbar />
      </main>
    </div>
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
