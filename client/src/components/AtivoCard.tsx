import { AtivosWithInvestAmount } from "../helpers/GetWhereToInvest";
import styles from "./Ativos.module.scss";
type AtivoCardProps = {
  ativo: AtivosWithInvestAmount;
  onRemove: (ativo: AtivosWithInvestAmount) => void;
};
export const AtivoCard = ({ ativo, onRemove }: AtivoCardProps) => {
  const onHandleClick = () => {
    onRemove(ativo);
  };

  return (
    <div className={styles.AtivoCard}>
      <ul>
        <li>Nome: {ativo.nome}</li>
        <li>Posição: {ativo.posicao}</li>
        <li>Nota: {ativo.nota}% </li>
        <li>Tipo: {ativo.tipo} </li>
        <li> Aporte: {ativo.investAmount.toFixed(2)}</li>
      </ul>
      <button className={styles.DangerButton} onClick={onHandleClick}>
        Apagar ativo
      </button>
    </div>
  );
};
