import { useGetData } from "../../hooks/useGetData";
import { useState, useEffect } from "react";
import { Card } from "../Card/CardDisplay";
import { Pokemon } from "../../types/Pokemon";
import "./CardLoader.css";
import { Color } from "../../types/Color";
import nokemon from "./2.png";

type Props = { numberOfCards: number };

type Item = {
  key: number;
  value: string;
};

export const Board = (numberOfCards: Props) => {
  const { response, loading, error } = useGetData(numberOfCards);
  const [data, setData] = useState<Pokemon[] | any>([]);
  const [item, setItem] = useState<Item[]>([]);
  const [array, setArray] = useState(Array(12).fill(false));

  useEffect(() => {
    if (loading === false) {
      setData(response);
      console.log(" use effect on Board");
      console.log("1 is " + array[1]);
    }
  }, [loading]);

  const handleBackground = (type: any) => {
    const typeColor = Color.find((item) => item.key === type);
    return `radial-gradient(circle at 50% 0%, ${typeColor?.value} 36%, #fefefe 36.5%)`;
  };

  function handleFlipCard(index: number) {
    const newState = [...array];
    newState[index] = !newState[index];
    setArray(newState);
  }

  if (loading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
  return (
    <>
      {data.map((value: Pokemon, index: number) => (
        <div className="flip-card " key={index}>
          <div
            className={`flip-card-inner + ${array[index] ? "active" : ""}`}
            onClick={() => handleFlipCard(index)}
          >
            <div className="flip-card-front">
              <img src={nokemon} alt="" />
            </div>
            <div
              className="flip-card-back"
              style={{
                background: handleBackground(value.data.types[0].type.name),
                backgroundPosition: "center",
                backgroundSize: "400px 250px",
              }}
            >
              <Card {...value}></Card>
            </div>
          </div>
        </div>
      ))}
    </>

    // <div className="flip-card">
    //   <div className="flip-card-inner">
    //     <div className="flip-card-front">
    //       <img src={nokemon} alt="did not" />
    //     </div>
    //     <div
    //       className="flip-card-back"
    //       style={{
    //         background: handleBackground(value.types[0].type.name),
    //         backgroundPosition: "center",
    //         backgroundSize: "400px 250px",
    //       }}
    //     >
    //       <Card {...value}></Card>
    //     </div>
    //   </div>
    // </div>
  );
};
