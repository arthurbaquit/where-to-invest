import { useCallback, useEffect, useState } from "react";
export type Ativo = {
  nome: string;
  tipo: string;
  posicao: number;
  meta: number;
};
export const useAtivos = () => {
  const [ativos, setAtivos] = useState<Ativo[]>([]);
  const fetch = useCallback(async () => {
    // const response = await fetch("http://localhost:3000/ativos");
    // const data = await response.json();
    // setAtivos(data);
    return ativos;
  }, []);

  const addAtivos = useCallback(
    (ativo: Ativo) => {
      if (ativos.find((a) => a.nome === ativo.nome)) {
        return;
      }
      setAtivos((prevAtivos) => [
        ...prevAtivos,
        {
          nome: ativo.nome,
          tipo: ativo.tipo,
          posicao: ativo.posicao,
          meta: ativo.meta,
        },
      ]);
    },
    [ativos]
  );

  const removeAtivos = useCallback(
    (ativo: Ativo) => {
      setAtivos(ativos.filter((a) => a.nome !== ativo.nome));
    },
    [ativos]
  );

  useEffect(() => {
    fetch();
  }, [fetch]);
  return { ativos, addAtivos, removeAtivos, fetch };
};
