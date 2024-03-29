import { Ativo, useAtivos } from "../hooks/useAtivos";
import { AddAtivoCard } from "./AddAtivoCard";
import { AtivoCard } from "./AtivoCard";
import { GetWhereToInvest } from "../helpers/GetWhereToInvest";
import React from "react";
import { Input } from "./UI/styles";
import styles from "./Ativos.module.scss";

export const Ativos = () => {
  const { ativos, addAtivos, removeAtivos, fetch, fetchFilter } = useAtivos();
  const [totalAmount, setTotalAmount] = React.useState(0);
  const totalPosition = ativos.reduce((acc, ativo) => acc + ativo.posicao, 0);
  const handleTotalAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const insertValue = Number(e.target.value);
    if (insertValue < 0) return;
    setTotalAmount(Number(e.target.value));
  };
  const handleSave = async (ativo: Ativo) => {
    await addAtivos(ativo).then(() => fetch());
  };

  const RemoveHandler = async (ativo: Ativo) => {
    await removeAtivos(ativo).then(() => fetch());
  };
  return (
    <>
      <h1>Aporte do Mês</h1>
      <div>
        <p style={{ display: "inline-block", marginRight: "0.5em" }}>
          {" "}
          Digite seu aporte desse mês
        </p>
        <Input
          type="number"
          onChange={handleTotalAmount}
          value={totalAmount !== 0 ? totalAmount : ""}
        />
      </div>
      <AddAtivoCard onSubmit={handleSave} />
      <div className={styles.Header}>
        <h1>Ativos</h1>
        <label>
          Filtro
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              if (e.target.value === "Todos") {
                fetch();
                return;
              }
              fetchFilter(e.target.value);
            }}
          >
            <option value="Todos">Todos</option>
            <option value="FII">FII</option>
            <option value="NationalStocks">Ação Nacional</option>
            <option value="ForeignStocks">Ação Internacional</option>
            <option value="FixedIncome">Renda Fixa</option>
            <option value="Reits">REITs</option>
            <option value="Crypto">Criptomoedas</option>
          </select>
        </label>
      </div>

      {ativos.length > 0 && (
        <div>
          <div className={styles.AtivosTable}>
            {GetWhereToInvest(ativos, totalAmount, totalPosition).map(
              (ativo) => (
                <AtivoCard
                  key={ativo.id || ativo.nome}
                  ativo={ativo}
                  onRemove={RemoveHandler}
                />
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};
