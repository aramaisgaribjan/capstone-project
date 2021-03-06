/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { search, mapImageResources } from "../src/lib/cloudinary";

export default function CatchesGallery({
  images: defaultImages = [],
  nextCursor: defaultNextCursor,
}) {
  const [images, setImages] = useState(defaultImages);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  console.log("images", images);

  async function handleLoadMore(event) {
    event.preventDefault();

    const results = await fetch("/api/catchesGallery/search", {
      method: "POST",
      body: JSON.stringify({
        nextCursor,
      }),
    }).then((r) => r.json());

    const { resources, next_cursor: updatedNextCursor } = results;

    const images = mapImageResources(resources);

    setImages((prev) => {
      return [...prev, ...images];
    });

    setNextCursor(updatedNextCursor);
  }

  return (
    <Main>
      <TitleCatches>
        <h3>MEINE FÄNGE</h3>
        <HR />
      </TitleCatches>

      <Ul>
        {images.map((image) => {
          return (
            <li key={image.id}>
              <a href={image.link}>
                <StyledImage>
                  <Image
                    width="145px"
                    height="180px"
                    src={image.image}
                    alt=""
                  />
                </StyledImage>
              </a>
            </li>
          );
        })}
      </Ul>

      <p>
        {nextCursor ? <button onClick={handleLoadMore}>Mehr laden</button> : ""}
      </p>
    </Main>
  );
}

const StyledImage = styled.div`
  padding: 6px 6px 2px 6px;
  background-color: white;
`;

const TitleCatches = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #363535;

  > h3 {
    padding: 15px 10px 10px 10px;
    margin: 0;
  }
`;

const Main = styled.main`
  padding: 0;
  > p {
    display: flex;
    justify-content: end;
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
  padding: 0;
  justify-content: center;
  > li {
    list-style-type: none;
  }
`;

const HR = styled.hr`
  width: 335px;
  margin-top: 0;
`;

export async function getStaticProps() {
  const results = await search();

  const { resources, next_cursor: nextCursor } = results;

  const images = mapImageResources(resources);

  return {
    props: { images, nextCursor: nextCursor || false },
  };
}
