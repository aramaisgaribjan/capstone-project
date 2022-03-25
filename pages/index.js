import Head from "next/head";
import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Capstone-Project</title>
      </Head>

      <main>
        <Container>
          <Navbar />
          <H1>This is the map</H1>
        </Container>
      </main>
    </div>
  );
}

const Container = styled.div`
  width: 390px;
  height: 844px;
  background-color: #404040;
  border-radius: 10px;
`;

const H1 = styled.h1`
  color: white;
`;
