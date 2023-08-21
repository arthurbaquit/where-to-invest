import "./App.css";
import { AssetTable } from "./components/AssetTable";
import { Ativos } from "./components/Ativos";
import { DoughnutChart } from "./components/DoughnutChart";

function App() {
  return (
    <>
      <h1>Onde Investir</h1>
      <p>
        {" "}
        Este pequeno projeto foi desenhado para pessoas que desejam investir em
        renda variável. Ele funciona como uma sugestão da onde alguém deveria
        aportar.
      </p>
      <ul>
        <li> Primeiro coloque seus ativos, com posição atual e nota</li>
        <li> Depois coloque seu aporte</li>
        <li> Clique em calcular e bons investimentos!</li>
      </ul>
      <h1>Posição Atual</h1>
      <div style={{ display: "flex", height: "300px" }}>
        <DoughnutChart />
        <AssetTable />
      </div>
      <Ativos />
    </>
  );
}

export default App;
