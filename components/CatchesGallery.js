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
    <>
      <Ul>
        {images.map((image) => {
          return (
            <li key={image.id}>
              <a href={image.link}>
                <div>
                  <Image
                    width={image.width}
                    height={image.height}
                    src={image.image}
                    alt=""
                  />
                </div>
              </a>
            </li>
          );
        })}
      </Ul>
      <p>
        <button onClick={handleLoadMore}>Load more</button>
      </p>
    </>
  );
}

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5em;
  > li {
    list-style-type: none;
  }
`;

export async function getStaticProps() {
  const results = await search();

  const { resources, next_cursor: nextCursor } = results;

  const images = mapImageResources(resources);

  return {
    props: { images, nextCursor: nextCursor || false },
  };
}
