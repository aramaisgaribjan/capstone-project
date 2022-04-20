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
        <H3>MEINE FÄNGE</H3>
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
  padding: 6px;
  background-color: grey;
`;

const TitleCatches = styled.div`
  position: relative;
`;

const Main = styled.main`
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
  width: 350px;
  margin-top: 0;
`;

const H3 = styled.h3`
  margin: 10px 0 10px 10px;
`;

export async function getStaticProps() {
  const results = await search();

  const { resources, next_cursor: nextCursor } = results;

  const images = mapImageResources(resources);

  return {
    props: { images, nextCursor: nextCursor || false },
  };
}
