import { useFetch } from "@jhenbertnpm/use-fetch";
import { Card, CardBody, CardText } from "reactstrap";

const PartingWords = () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "thought-of-the-day.p.rapidapi.com",
    },
  };

  const { data, isLoaded } = useFetch({
    fetchFn: async () => {
      const response = await fetch(
        "https://thought-of-the-day.p.rapidapi.com/thought",
        options
      );
      const result = await response.json();
      return result;
    },
    initData: [],
  });

  return (
    <>
      <div className="position-relative">
        <img
          src="https://picsum.photos/900"
          alt="bg-image"
          style={{ width: "100%", height: "100vh" }}
        />
      </div>
      <div className="position-absolute top-50 start-50 translate-middle">
        <Card className="shadow">
          <CardBody>
            <CardText className="fs-3 fst-italic">{data.quote}</CardText>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default PartingWords;
