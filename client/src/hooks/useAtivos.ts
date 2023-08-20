import { useCallback, useEffect, useState } from "react";
import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost/api/ativos/",
});

export type Ativo = {
  id?: string;
  nome: string;
  tipo: string;
  posicao: number;
  nota: number;
};
export const useAtivos = () => {
  const [ativos, setAtivos] = useState<Ativo[]>([]);
  const fetch = useCallback(async () => {
    try {
      const response = await API.get("");
      setAtivos(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchFilter = useCallback(
    async (tipo: string) => {
      try {
        const response = await API.get(`/${tipo}`);
        setAtivos(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    [ativos]
  );

  const addAtivos = useCallback(
    async (ativo: Ativo) => {
      if (ativos.find((a) => a.nome === ativo.nome)) {
        return;
      }
      try {
        const response = await API.post("save", ativo);
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
        const response = await API.delete(`/delete/${ativo.id}`);
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
  return { ativos, addAtivos, removeAtivos, fetch, fetchFilter };
};
