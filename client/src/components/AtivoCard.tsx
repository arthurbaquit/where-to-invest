import { AtivosWithInvestAmount } from "../helpers/GetWhereToInvest";
import styled from "styled-components";

const Card = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
`;

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
