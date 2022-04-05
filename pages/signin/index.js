import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import backgroundImg from "../../public/LoginBackground.png";

export default function SignIn({ providers }) {
  // you can use a hook like this to redirect the user after the login:
  const { data: session } = useSession();
  const router = useRouter();
  const providersIcon = ["akar-icons:google-contained-fill", "brandico:github"];

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <main>
      <Background>
        {Object.values(providers).map((provider, index) => (
          <Button
            key={provider.name}
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: "http://localhost:3000/signin/",
              })
            }
          >
            <Icon icon={providersIcon[index]} color="#6926A9" height="30" />
            <p>Sign in with {provider.name}</p>
          </Button>
        ))}
      </Background>
    </main>
  );
}
const Background = styled.div`
  background-image: url(${backgroundImg});
  border: 1px solid #000;
  width: 390px;
  height: 708px;
`;

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

const Button = styled.button`
  margin-top: 20px;
  margin-left: 120px;
  padding: 0.7rem 1rem;
  text-align: center;
  color: white;
  background-color: green;
  border: 2px solid green;
  border-radius: 5px;
`;
