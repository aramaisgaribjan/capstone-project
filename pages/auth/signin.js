import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import backgroundImg from "/public/LoginBackground.png";
import Image from "next/image";

export default function SignIn({ providers }) {
  // you can use a hook like this to redirect the user after the login:
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
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
      <p>FishingBuddies</p>
      <Buttons>
        {Object.values(providers).map((provider) => (
          <Button
            key={provider.name}
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: "http://localhost:3000/auth/createNickname",
              })
            }
          >
            Log in with {provider.name}
          </Button>
        ))}
      </Buttons>
    </Main>
  );
}
const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession();
  return {
    props: { providers },
  };
}

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
  justify-content: space-around;
  align-items: center;
  position: relative;
  top: 632px;
  left: 55px;
  font-size: 22px;
  width: 277px;
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
const Buttons = styled.button`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;
