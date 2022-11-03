import { observer } from "@legendapp/state/react";
import axios from "axios";
import React from "react";
import { useObservableQuery } from "./useObservableQuery";

export const Basic = observer(function Basic() {
  const renderCount = ++React.useRef(0).current;
  const obs = useObservableQuery({
    queryKey: ["basicData"],
    queryFn: () =>
      axios
        .get("https://api.github.com/repos/tannerlinsley/react-query")
        .then((res) => res.data)
  });

  const { isLoading, error, data, isFetching } = obs.get();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div>
      <h1>Basic {renderCount}</h1>
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
});
