import { useState, useEffect } from "react";
import axios from "axios";

type Props = { id: number };
export const useGetData = ({ id }: Props) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/` + id)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { response, error, loading };
};
