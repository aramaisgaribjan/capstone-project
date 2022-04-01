import styled from "styled-components";

export function EditFishingdayForm({
  onSubmitFishingday,
  onCancelEdit,
  submitText,
  error,
  id,
  fish,
  waters,
  dateTime,
}) {
  async function handleSubmit(event) {
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
        <input
          type="text"
          required
          id={`fish-${id}`}
          name="fish"
          defaultValue={fish}
        />
        <label htmlFor={`waters-${id}`}>Gewässer</label>
        <input
          type="text"
          required
          id={`waters-${id}`}
          name="waters"
          defaultValue={waters}
        />
        <label htmlFor={`dateTime-${id}`}>Datum & Uhrzeit</label>
        <input
          type="datetime-local"
          required
          id={`date-${id}`}
          name="dateTime"
          defaultValue={dateTime}
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

const Form = styled.form`
  padding: 1rem 1rem 1rem 1rem;
  background-color: lightgrey;
  height: 100%;
  border-radius: 10px;
  display: flex;
  gap: 1rem;
  width: 300px;
  margin: auto;
  flex-wrap: wrap;

  > div {
    color: black;
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
`;

const Button = styled.div`
  display: flex;
`;
