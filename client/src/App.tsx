import "./App.css";
import { Ativos } from "./components/Ativos";
import { DoughnutChart } from "./components/UI/DoughnutChart";

function App() {
  return (
    <>
      <DoughnutChart />
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
      <Ativos />
    </>
  );
}

export default App;
