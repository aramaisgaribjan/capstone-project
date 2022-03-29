import { useState, useEffect } from "react";
import useSWR from "swr";

export function useCreateFishingday() {
  const fishingdays = useSWR("/api/fishingdays");
  const [error, setError] = useState();

  async function handleCreateFishingday(fishingdayData, form) {
    const response = await fetch("/api/fishingdays", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(fishingdayData),
    });
    const createdFishingday = await response.json();
    if (response.ok) {
      fishingdays.mutate();
      form.reset();
      setError();
    } else {
      setError(createdFishingday.error ?? "Something went wrong");
    }
  }

  return {
    error,
    handleCreateFishingday,
  };
}
