import { Show, Switch } from "@legendapp/state/react";
import axios from "axios";
import React from "react";
import { useObservableQuery } from "./useObservableQuery";

export const Optimized = function Optimized() {
  const renderCount = ++React.useRef(0).current;
  const obs = useObservableQuery({
    queryKey: ["optimizedData"],
    queryFn: () =>
      axios
        .get("https://api.github.com/repos/tannerlinsley/react-query")
        .then((res) => res.data)
  });

  const { isLoading, error, data, isFetching } = obs;

  return (
    <Switch>
      <Show if={isLoading}>Loading...</Show>
      <Show if={error}>An error has occurred: {error.message}</Show>
      <Show if={data}>
        <div>
          <h1>Optimized {renderCount}</h1>
          <h2>{data.name}</h2>
          <p>{data.description}</p>
          <strong>👀 {data.subscribers_count}</strong>{" "}
          <strong>✨ {data.stargazers_count}</strong>{" "}
          <strong>🍴 {data.forks_count}</strong>
          <Show if={isFetching}>
            <div>Updating...</div>
          </Show>
        </div>
      </Show>
    </Switch>
  );
};
