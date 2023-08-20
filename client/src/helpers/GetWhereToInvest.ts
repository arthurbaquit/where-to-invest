import { Ativo } from "../hooks/useAtivos";

export type AtivosWithInvestAmount = Ativo & {
  investAmount: number;
};

const getInvestAmount = (
  goal: number,
  totalPosition: number,
  totalAmount: number,
  position: number
) =>
  goal * (totalPosition + totalAmount) > position
    ? goal * (totalPosition + totalAmount) - position
    : 0;

export const GetWhereToInvest = (
  ativos: Ativo[],
  totalAmount: number,
  totalPosition: number
): AtivosWithInvestAmount[] => {
  const ativosWithInvestAmount: AtivosWithInvestAmount[] = ativos.map(
    (ativo) => {
      const investAmount = getInvestAmount(
        ativo.nota,
        totalPosition,
        totalAmount,
        ativo.posicao
      );
      return {
        ...ativo,
        investAmount: investAmount,
      };
    }
  );

  const totalInvestAmount = ativosWithInvestAmount.reduce(
    (acc, ativo) => acc + ativo.investAmount,
    0
  );

  return ativosWithInvestAmount.map((ativo) => {
    return {
      ...ativo,
      investAmount: (ativo.investAmount * totalAmount) / totalInvestAmount,
    };
  });
};
