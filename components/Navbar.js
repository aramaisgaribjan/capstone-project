import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import mapIcon from "../public/SVG/VectorMap.svg";
import profileIcon from "../public/SVG/VectorProfile.svg";
import fishingDaysIcon from "../public/SVG/VectorFishingdays.svg";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <>
      <Ul>
        <StyledLink
          className={router.pathname == "/fishingdays" ? "active" : ""}
        >
          <Link href="/fishingdays" passHref>
            <a>
              <Image
                src={fishingDaysIcon}
                width="45"
                height="37"
                alt="Bild in svg"
              />
            </a>
          </Link>
        </StyledLink>
        <StyledLink className={router.pathname == "/" ? "active" : ""}>
          <Link href="/">
            <a>
              <Image src={mapIcon} width="45" height="37" alt="Bild in svg" />
            </a>
          </Link>
        </StyledLink>
        <StyledLink className={router.pathname == "/profile" ? "active" : ""}>
          <Link href="/profile">
            <a>
              <Image
                src={profileIcon}
                width="45"
                height="37"
                alt="Bild in svg"
              />
            </a>
          </Link>
        </StyledLink>
      </Ul>
    </>
  );
};

const Ul = styled.ul`
  box-sizing: border-box;
  background-color: black;
  padding-inline-start: 0px;
  display: flex;
  position: fixed;
  width: 375px;
  height: 73px;
  margin: 0;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  list-style-type: none;
  text-decoration: none;
`;

const StyledLink = styled.li`
  opacity: 50%;
  &.active {
    opacity: 100%;
  }
  :hover {
    opacity: 100%;
  }
`;

export default Navbar;
