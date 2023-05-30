import { Ativo, useAtivos } from "../hooks/useAtivos";
import { AddAtivoCard } from "./AddAtivoCard";
import { AtivoCard } from "./AtivoCard";
import { GetWhereToInvest } from "../helpers/GetWhereToInvest";
import React from "react";
import { Input } from "./UI/styles";

export const Ativos = () => {
  const { ativos, addAtivos, removeAtivos, fetch } = useAtivos();
  const [totalAmount, setTotalAmount] = React.useState(0);
  const totalPosition = ativos.reduce((acc, ativo) => acc + ativo.posicao, 0);
  const onHandleTotalAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const insertValue = Number(e.target.value);
    if (insertValue < 0) return;
    setTotalAmount(Number(e.target.value));
  };
  const onSaveHandler = async (ativo: Ativo) => {
    await addAtivos(ativo).then(() => fetch());
  };

  const onRemoveHandler = async (ativo: Ativo) => {
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
          onChange={onHandleTotalAmount}
          value={totalAmount !== 0 ? totalAmount : ""}
        />
      </div>
      <AddAtivoCard onSubmit={onSaveHandler} />
      {ativos.length ? (
        <div>
          <h1>Ativos</h1>
          {GetWhereToInvest(ativos, totalAmount, totalPosition).map((ativo) => (
            <AtivoCard
              key={ativo.nome}
              ativo={ativo}
              onRemove={onRemoveHandler}
            />
          ))}
        </div>
      ) : null}
    </>
  );
};
