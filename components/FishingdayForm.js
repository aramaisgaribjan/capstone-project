import styled from "styled-components";

export function FishingdayForm({ onSubmitFishingday, submitText, error, id }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmitFishingday(
      {
        fish: event.target.elements.fish.value,
        waters: event.target.elements.waters.value,
      },
      event.target
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <h3>Create a new Fishingday</h3>
        <label htmlFor={`text-${id}`}>Zielfisch</label>
        <input type="text" required id={`text-${id}`} name="fish" />
        <label htmlFor={`text-${id}`}>Gewässer</label>
        <input type="text" required id={`text-${id}`} name="waters" />
        {error ? (
          <p>
            <strong>Error:</strong> {error}
          </p>
        ) : null}
      </div>
      <input type="submit" value={submitText} />
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  color: white;
  margin-top: 10px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 20px auto;
  }

  input[type="text"] {
    padding: 0.5rem;
    border: 2px solid rgb(190 190 190);
    border-radius: 3px;
    width: 300px;
  }

  input[type="submit"] {
    margin: auto;
    width: 300px;
    padding: 0.5rem;
    border: 2px solid rgb(190 190 190);
    border-radius: 3px;
  }
`;
