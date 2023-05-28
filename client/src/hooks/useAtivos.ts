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

  const addAtivos = useCallback((ativo: Ativo) => {
    setAtivos((prevAtivos) => [
      ...prevAtivos,
      {
        nome: ativo.nome,
        tipo: ativo.tipo,
        posicao: ativo.posicao,
        meta: ativo.meta,
      },
    ]);
  }, []);
  useEffect(() => {
    fetch();
  }, [fetch]);
  return { ativos, addAtivos, fetch };
};
