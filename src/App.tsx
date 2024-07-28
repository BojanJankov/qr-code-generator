import "./App.css";
import InputGenerator from "./components/inputGenerator/inputGenerator";

function App() {
  return (
    <section className="App">
      <div className="app-heading">
        <h1>QR Code Generator</h1>
      </div>
      <InputGenerator />
    </section>
  );
}

export default App;
