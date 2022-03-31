import Container from "../components/Container";
import styled from "styled-components";

export default function Profile() {
  console.log("Test");
  return (
    <main>
      <Container>
        <Text>Moin</Text>
      </Container>
    </main>
  );
}

const Text = styled.p`
  margin-top: 0;
`;
