import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export type Ativo = {
  id?: string;
  nome: string;
  tipo: string;
  posicao: number;
  meta: number;
};
export const useAtivos = () => {
  const [ativos, setAtivos] = useState<Ativo[]>([]);
  const fetch = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost/api/ativos/");
      setAtivos(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const addAtivos = useCallback(
    async (ativo: Ativo) => {
      if (ativos.find((a) => a.nome === ativo.nome)) {
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost/api/ativos/save",
          ativo
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    [ativos]
  );

  const removeAtivos = useCallback(
    async (ativo: Ativo) => {
      try {
        const response = await axios.delete(
          `http://localhost/api/ativos/delete/${ativo.id}`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    [ativos]
  );

  useEffect(() => {
    fetch();
  }, [fetch]);
  return { ativos, addAtivos, removeAtivos, fetch };
};
