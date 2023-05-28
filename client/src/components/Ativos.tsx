import { useAtivos } from "../hooks/useAtivos";
import { AddAtivoCard } from "./AddAtivoCard";
import { AtivoCard } from "./AtivoCard";
import { GetWhereToInvest } from "../helpers/GetWhereToInvest";
import React from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
  width: 100;
`;

export const Ativos = () => {
  const { ativos, addAtivos } = useAtivos();
  const [totalAmount, setTotalAmount] = React.useState(0);
  const totalPosition = ativos.reduce((acc, ativo) => acc + ativo.posicao, 0);
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
          onChange={(e) => setTotalAmount(Number(e.target.value))}
        />
      </div>
      <AddAtivoCard onSubmit={addAtivos} />
      {ativos.length ? (
        <div>
          <h1>Ativos</h1>
          {GetWhereToInvest(ativos, totalAmount, totalPosition).map((ativo) => (
            <AtivoCard ativo={ativo} />
          ))}
        </div>
      ) : null}
    </>
  );
};
