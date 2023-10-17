import { Alert, Label, Input, Button, Spinner } from "reactstrap";

interface Props {
  alertIsOpen: boolean;
  alertToggle(): void;
  query: string;
  inputOnChange(event: React.ChangeEvent<HTMLInputElement>): void;
  btnDisabled: boolean;
  btnOnClick(): void;
  isLoading: boolean;
}

function Form({
  alertIsOpen,
  alertToggle,
  query,
  inputOnChange,
  btnDisabled,
  btnOnClick,
  isLoading,
}: Props) {
  return (
    <>
      <Alert
        className="position-absolute top-0 start-50 translate-middle-x mt-2"
        color="warning"
        isOpen={alertIsOpen}
        toggle={alertToggle}
      >
        <strong>Warning!</strong> Address field must not be empty
      </Alert>
      <Label for="searchBar">Enter Postal Address</Label>
      <Input
        id="searchBar"
        name="searchBar"
        type="search"
        placeholder="e.g Brgy., Pasian, Mabini, Davao de Oro"
        value={query}
        onChange={inputOnChange}
      />
      <Button
        disabled={btnDisabled}
        className="mt-3"
        color="primary"
        onClick={btnOnClick}
      >
        {isLoading ? (
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
