import useSWR from "swr";
import { Fishingday } from "./Fishingday";
import styled from "styled-components";

export default function FishingdayList() {
  const fishingdays = useSWR("/api/fishingdays");

  return (
    <>
      {fishingdays.data ? (
        <Ul>
          {fishingdays.data.map((fishingday) => (
            <li key={fishingday._id}>
              <Fishingday fishingday={fishingday} />
            </li>
          ))}
        </Ul>
      ) : (
        "Loading…"
      )}
    </>
  );
}

const Ul = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;

  > li {
    flex: 1 0 30ch;
  }
`;
