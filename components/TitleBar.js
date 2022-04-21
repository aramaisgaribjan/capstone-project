import styled from "styled-components";
import { useRouter } from "next/router";

const TitleBar = () => {
  const router = useRouter();
  const path = router.pathname;
  let pathTitle = "";
  function title(path) {
    if (path == "/") {
      pathTitle = "MAP";
      return pathTitle;
    } else if (path == "/fishingdays") {
      pathTitle = "ANGELTAGE";
      return pathTitle;
    } else if (path == "/profile") {
      pathTitle = "PROFIL";
      return pathTitle;
    }
  }
  title(path);
  return (
    <>
      <Ul>
        <div>{pathTitle}</div>
      </Ul>
    </>
  );
};

const Ul = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: black;
  position: relative;
  width: 375px;
  height: 55px;
  > div {
    color: white;
    font-size: 35px;
  }
`;

export default TitleBar;
