/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import styled from "styled-components";

export default function UploadCatches() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );
    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "ml-default");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/fishingbuddies/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
  }

  return (
    <div>
      <main>
        <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <P>
            <input type="file" name="file" />
          </P>
          <UploadedPhoto>
            {imageSrc ? (
              <img src={imageSrc} alt="image" width="145px" height="180px" />
            ) : (
              ""
            )}

            {imageSrc && !uploadData && (
              <p>
                <button>Hochladen</button>
              </p>
            )}
          </UploadedPhoto>

          {uploadData && (
            <code>
              <pre>{JSON.stringify(uploadData, null, 2)}</pre>
            </code>
          )}
        </form>
      </main>
    </div>
  );
}

const P = styled.p`
  display: flex;
  justify-content: end;
  > input {
  }
`;

const UploadedPhoto = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
`;
