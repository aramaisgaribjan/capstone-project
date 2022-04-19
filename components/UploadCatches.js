/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

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
          <p>
            <input type="file" name="file" />
          </p>

          <img src={imageSrc} alt="image" width="150px" />

          {imageSrc && !uploadData && (
            <p>
              <button>Hochladen</button>
            </p>
          )}

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
