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
        <input
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
  width: 350px;
  margin-top: 0;
`;

const H3 = styled.h3`
  margin: 10px 0 10px 10px;
`;

const Form = styled.form`
  height: 100%;
  display: flex;
  gap: 1rem;
  width: 300px;
  flex-wrap: wrap;

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
  input[type="text"] {
    width: 350px;
    height: 100px;
    padding: 0.5rem;
    border: 2px solid rgb(190 190 190);
    border-radius: 3px;
  }
`;

const Button = styled.div`
  display: flex;
`;
