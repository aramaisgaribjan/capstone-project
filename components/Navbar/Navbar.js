import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import mapPic from "../../public/VectorMap.svg";
import profilePic from "../../public/VectorProfile.svg";
import fishingDaysPic from "../../public/VectorFishingdays.svg";

const Navbar = () => {
  return (
    <>
      <Ul>
        <Li>
          <Link href="/meetings">
            <>
              <Image
                src={fishingDaysPic}
                width="55"
                height="47"
                alt="Bild in svg"
              />
            </>
          </Link>
        </Li>
        <Li>
          <Link href="/">
            <>
              <Image src={mapPic} width="55" height="47" alt="Bild in svg" />
            </>
          </Link>
        </Li>
        <Li>
          <Link href="/profile">
            <>
              <Image
                src={profilePic}
                width="55"
                height="47"
                alt="Bild in svg"
              />
            </>
          </Link>
        </Li>
      </Ul>
    </>
  );
};

const Ul = styled.ul`
  box-sizing: border-box;
  background-color: black;
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

const Li = styled.li`
  color: white;
`;

export default Navbar;
