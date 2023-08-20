import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Ativos } from "./components/Ativos";
import { DoughnutChart } from "./components/UI/DoughnutChart";

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <DoughnutChart />
      <h1>Onde Investir</h1>
      <p>
        {" "}
        Este pequeno projeto foi desenhado para pessoas que desejam investir em
        renda variável. Ele funciona como uma sugestão da onde alguém deveria
        aportar.
      </p>
      <ul>
        <li>
          {" "}
          Primeiro coloque seus ativos, com posição atual e meta final (em
          relação a todos os ativos listados)
        </li>
        <li> Depois coloque seu aporte</li>
        <li> Clique em calcular e bons investimentos!</li>
      </ul>
      <Ativos />
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
