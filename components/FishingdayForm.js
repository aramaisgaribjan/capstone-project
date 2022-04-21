import styled from "styled-components";

export function FishingdayForm({ onSubmitFishingday, submitText, error, id }) {
  function handleSubmit(event) {
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
        <h3>Erstelle Angeltag</h3>
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
        <input type="submit" value={submitText} />
      </div>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  color: white;

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 20px auto;
    background-color: #909090;
    padding: 1rem;
    border-radius: 3px;
    > h3 {
      margin-top: 0;
    }
  }

  input[type="text"] {
    padding: 0.5rem;
    border: 2px solid rgb(190 190 190);
    border-radius: 3px;
    width: 185px;
  }

  input[type="submit"] {
    width: max-content;
    padding: 0.2rem 1.5rem 0.2rem 1.5rem;
    border: 2px solid #00aa44;
    border-radius: 5px;
    background-color: #00aa44;
    color: white;
    font-size: 18px;
  }
`;
