import { useGetData } from "../../hooks/useGetData";
import { useState, useEffect } from "react";
import { Card } from "../Card/CardDisplay";
import { Pokemon } from "../../types/Pokemon";
import "./CardLoader.css";

type Props = { id: number };
export const CardLoader = (id: Props) => {
  const { response, loading, error } = useGetData(id);
  const [data, setData] = useState<Pokemon | null>();
  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);
  return (
    <div className="container">
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          {error && (
            <div>
              <p>{error}</p>
            </div>
          )}

          <div>
            {data && (
              <div>
                <Card {...data}></Card>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
