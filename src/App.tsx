import "./App.css";
import { CardLoader } from "./components/CardLoader/CardLoader";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomNumbers(min: number, max: number, count: number): number[] {
  let uniqueNumbers = new Set<number>();
  while (uniqueNumbers.size < count) {
    let randomNum = getRandomInt(max - min + 1) + min;
    uniqueNumbers.add(randomNum);
  }
  return Array.from(uniqueNumbers);
}
function App() {
  const cards = getRandomNumbers(1, 500, 12);
  return (
    <div className="App">
      {cards.map((number, index) => (
        <CardLoader id={number} key={index} />
      ))}
    </div>
  );
}

export default App;
