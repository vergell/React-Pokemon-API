import "./App.css";
import { Board } from "./components/Board/Board";

function App() {
  return (
    <div className="App">
      <h1 className="title">WIP</h1>
      <div className="container">
        <Board numberOfCards={12} />
      </div>
    </div>
  );
}

export default App;
