import { useAtivos } from "../hooks/useAtivos";
import { AddAtivoCard } from "./AddAtivoCard";
import { AtivoCard } from "./AtivoCard";

export const Ativos = () => {
  const { ativos, addAtivos } = useAtivos();

  return (
    <>
      <AddAtivoCard onSubmit={addAtivos} />
      {ativos.length ? (
        <div>
          <h1>Ativos</h1>
          {ativos.map((ativo) => (
            <AtivoCard ativo={ativo} />
          ))}
        </div>
      ) : null}
    </>
  );
};
