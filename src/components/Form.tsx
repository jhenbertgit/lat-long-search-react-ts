import { useContext, useState } from "react";
import { Alert, Label, Input, Button, Spinner } from "reactstrap";
import { LatLongDispatchCtx, LatLongStateCtx } from "../context/LatLongCtx";

function Form() {
  const [error, setError] = useState<Error | null>(null);
  const state = useContext(LatLongStateCtx);
  const dispatch = useContext(LatLongDispatchCtx);

  const url = "https://trueway-geocoding.p.rapidapi.com";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com",
    },
  };

  const fetchResults = async (query: string) => {
    dispatch({ type: "status", status: "loading" });

    if (query.trim() === "") {
      dispatch({ type: "isEmpty", isEmpty: true });
      dispatch({ type: "status", status: "init" });
      return;
    }

    try {
      const response = await fetch(
        `${url}/Geocode?address=${query}&language=en`,
        options
      );
      const data = await response.json();
      const results = data.results[0] || {};

      dispatch({
        type: "dataset",
        dataset: {
          lat: results.location.lat,
          lng: results.location.lng,
          address: results.address,
        } || {
          lat: "",
          lng: "",
          address: "",
        },
      });

      dispatch({ type: "status", status: "success" });
    } catch (error) {
      setError(error as Error);
      dispatch({ type: "isOpen", isOpen: true });
      dispatch({ type: "status", status: "init" });
    }
  };

  const onDismissed = () => {
    dispatch({ type: "isOpen", isOpen: false });
    dispatch({ type: "isEmpty", isEmpty: false });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "query",
      payload: event.target.value,
    });
    dispatch({ type: "status", status: "typing" });
  };

  const handleSearch = () => {
    fetchResults(state.query);
  };

  return (
    <>
      {error && (
        <Alert
          className="position-absolute top-0 start-50 translate-middle-x mt-2"
          color="info"
          isOpen={state.isOpen}
          toggle={onDismissed}
        >
          <strong>{error.name}: </strong>
          {error.message}
        </Alert>
      )}

      {state.isEmpty && (
        <Alert
          className="position-absolute top-0 start-50 translate-middle-x mt-2"
          color="warning"
          isOpen={state.isEmpty}
          toggle={onDismissed}
        >
          <strong>Warning!</strong> Address field must not be empty
        </Alert>
      )}

      <Label for="searchBar">Enter Postal Address</Label>
      <Input
        id="searchBar"
        name="searchBar"
        type="search"
        placeholder="e.g Brgy., Pasian, Mabini, Davao de Oro"
        value={state.query}
        onChange={handleChange}
      />
      <Button
        disabled={state.isEmpty}
        className="mt-3"
        color="primary"
        onClick={handleSearch}
      >
        {state.status === "loading" ? (
          <div>
            <Spinner size="sm">Loading...</Spinner>
            <span> Loading</span>
          </div>
        ) : (
          "Search"
        )}
      </Button>
    </>
  );
}

export default Form;
