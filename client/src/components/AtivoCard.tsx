import { AtivosWithInvestAmount } from "../helpers/GetWhereToInvest";
import { Card } from "./UI/styles";

type AtivoCardProps = {
  ativo: AtivosWithInvestAmount;
};
export const AtivoCard = ({ ativo }: AtivoCardProps) => {
  return (
    <Card>
      <p>
        Ativo: {ativo.nome} - Posição: {ativo.posicao} - Meta: {ativo.meta}% -
        Tipo: {ativo.tipo} - Aporte: {ativo.investAmount.toFixed(2)}
      </p>
    </Card>
  );
};
