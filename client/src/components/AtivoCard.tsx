import { AtivosWithInvestAmount } from "../helpers/GetWhereToInvest";
import { Card, DangerButton } from "./UI/styles";

type AtivoCardProps = {
  ativo: AtivosWithInvestAmount;
  onRemove: (ativo: AtivosWithInvestAmount) => void;
};
export const AtivoCard = ({ ativo, onRemove }: AtivoCardProps) => {
  const onHandleClick = () => {
    onRemove(ativo);
  };

  return (
    <Card style={{ display: "flex", justifyContent: "space-between" }}>
      <p>
        Ativo: {ativo.nome} - Posição: {ativo.posicao} - Meta: {ativo.meta}% -
        Tipo: {ativo.tipo} - Aporte: {ativo.investAmount.toFixed(2)}
      </p>
      <DangerButton onClick={onHandleClick}> Apagar ativo</DangerButton>
    </Card>
  );
};
