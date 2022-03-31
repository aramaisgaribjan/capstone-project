import styled from "styled-components";

export function EditFishingdayForm({
  onSubmitFishingday,
  submitText,
  error,
  id,
}) {
  async function handleSubmit(event) {
    //const response = await fetch(`/api/fishingdays/${fishingday._id}`);

    event.preventDefault();
    onSubmitFishingday(
      {
        fish: event.target.elements.fish.value,
        waters: event.target.elements.waters.value,
        dateTime: event.target.elements.dateTime.value,
      },
      event.target
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor={`fish-${id}`}>Zielfisch</label>
        <input type="text" required id={`fish-${id}`} name="fish" />
        <label htmlFor={`waters-${id}`}>Gewässer</label>
        <input type="text" required id={`waters-${id}`} name="waters" />
        <label htmlFor={`dateTime-${id}`}>Datum & Uhrzeit</label>
        <input
          type="datetime-local"
          required
          id={`date-${id}`}
          name="dateTime"
        />
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
  padding: 1rem 1rem 1rem 1rem;
  background-color: lightgrey;
  height: 100%;
  border-radius: 10px;
  display: flex;
  gap: 1rem;
  width: 291px;
  margin: auto;

  > div {
    color: black;
  }
  input[type="submit"] {
    margin: auto;
    width: 100px;
    padding: 0.5rem;
    border: 2px solid rgb(190 190 190);
    border-radius: 3px;
  }
`;
