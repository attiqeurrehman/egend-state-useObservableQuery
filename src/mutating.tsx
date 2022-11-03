import { observer, useObservable } from "@legendapp/state/react";
import axios from "axios";
import React from "react";
import { useObservableQuery } from "./useObservableQuery";

export const Mutating = observer(function Basic() {
  const mutateResult = useObservable("");
  const obs = useObservableQuery(
    {
      queryKey: ["mutatingData"],
      queryFn: () =>
        axios.get("https://reqres.in/api/users/2").then((res) => res.data.data)
    },
    {
      mutationFn: (newData) =>
        axios
          .post("https://reqres.in/api/users/2", newData)
          .then((res) =>
            mutateResult.set(`Mutated: ${JSON.stringify(res, null, 4)}`)
          )
    }
  );

  const { isLoading, error, data, isFetching } = obs.get();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div>
      <h1>Mutating</h1>
      <h2>{data.first_name}</h2>
      <h2>{data.email}</h2>
      <div>{isFetching ? "Updating..." : ""}</div>
      <button onClick={() => obs.data.email.set("testemail")}>
        Change email
      </button>
      <pre>{mutateResult.get()}</pre>
    </div>
  );
});
