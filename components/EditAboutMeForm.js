import styled from "styled-components";

export default function EditAboutMeForm({
  onSubmitAboutMe,
  onCancelEdit,
  submitText,
  error,
  id,
  aboutMeText,
}) {
  async function handleSubmit(event) {
    event.preventDefault();
    onSubmitAboutMe(
      {
        aboutMeText: event.target.elements.aboutMeText.value,
      },
      event.target
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <H3>ÜBER MICH</H3>
      <HR />
      <div>
        <textarea
          type="text"
          id={`aboutMeText-${id}`}
          name="aboutMeText"
          defaultValue={aboutMeText}
        />
        {error ? (
          <p>
            <strong>Error:</strong> {error}
          </p>
        ) : null}
        <Button>
          <input type="submit" value={submitText} />
          <button onClick={onCancelEdit}>Abbrechen</button>
        </Button>
      </div>
    </Form>
  );
}

const HR = styled.hr`
  width: 335px;
  margin: 0;
`;

const H3 = styled.h3`
  margin: 15px 0px 0px 0px;
`;

const Form = styled.form`
  height: 100%;
  display: flex;
  gap: 1rem;
  width: 335px;
  flex-wrap: wrap;
  margin: auto;

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  input[type="submit"] {
    margin: auto;
    width: 100px;
    padding: 0.5rem;
    border: 2px solid rgb(190 190 190);
    border-radius: 3px;
  }
  & button {
    margin: auto;
    width: 100px;
    padding: 0.5rem;
    border: 2px solid rgb(190 190 190);
    border-radius: 3px;
  }
  textarea[type="text"] {
    width: 335px;
    height: 100px;
    padding: 0.5rem;
    border: 2px solid rgb(190 190 190);
    border-radius: 3px;
    background-color: #363535;
    color: white;
    font-size: 17px;
    font-family: "Lato", sans-serif;
  }
`;

const Button = styled.div`
  display: flex;
`;
