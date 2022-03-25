import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import mapIcon from "../../public/VectorMap.svg";
import profileIcon from "../../public/VectorProfile.svg";
import fishingDaysIcon from "../../public/VectorFishingdays.svg";

const Navbar = () => {
  return (
    <>
      <Ul>
        <li>
          <Link href="/meetings">
            <>
              <Image
                src={fishingDaysIcon}
                width="55"
                height="47"
                alt="Bild in svg"
              />
            </>
          </Link>
        </li>
        <li>
          <Link href="/">
            <>
              <Image src={mapIcon} width="55" height="47" alt="Bild in svg" />
            </>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <>
              <Image
                src={profileIcon}
                width="55"
                height="47"
                alt="Bild in svg"
              />
            </>
          </Link>
        </li>
      </Ul>
    </>
  );
};

const Ul = styled.ul`
  box-sizing: border-box;
  background-color: black;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  position: fixed;
  width: 390px;
  height: 93px;
  top: 755px;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  list-style-type: none;
  text-decoration: none;
`;

export default Navbar;
