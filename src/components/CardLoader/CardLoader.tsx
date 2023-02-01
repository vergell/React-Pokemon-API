import { useGetData } from "../../hooks/useGetData";
import { useState, useEffect } from "react";
import { Card } from "../Card/CardDisplay";
import { Pokemon } from "../../types/Pokemon";
import "./CardLoader.css";
import { Color } from "../../types/Color";
import nokemon from "../../assets/nokemon.svg";

type Props = { id: number };
export const CardLoader = (id: Props) => {
  const { response, loading, error } = useGetData(id);
  const [data, setData] = useState<Pokemon | null>();

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);

  const handleBackground = (type: any) => {
    const typeColor = Color.find((item) => item.key === type);
    return `radial-gradient(circle at 50% 0%, ${typeColor?.value} 36%, #fefefe 36.5%)`;
  };

  return (
    <div className="flip-card">
      {loading ? (
        <div className="loading"></div>
      ) : (
        <>
          {error && (
            <div>
              <p>{error}</p>
            </div>
          )}
          <>
            {data && (
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img src={nokemon} alt="" />
                </div>
                <div
                  className="flip-card-back"
                  style={{
                    background: handleBackground(data.types[0].type.name),
                    backgroundPosition: "center",
                    backgroundSize: "400px 250px",
                  }}
                >
                  <Card {...data}></Card>
                </div>
              </div>
            )}
          </>
        </>
      )}
    </div>
  );
};
