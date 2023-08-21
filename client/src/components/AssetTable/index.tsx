import { Header } from "./Header";
import styles from "./AssetTable.module.scss";
import { useAtivos } from "../../hooks/useAtivos";

export const AssetTable = () => {
  const { ativos } = useAtivos();
  return (
    <div className={styles.Table}>
      <table>
        <Header />
        {ativos.map((ativo, idx) => (
          <tr key={`${ativo.nome} - ${idx}`}>
            <th>{ativo.tipo}</th>
            <th>{ativo.nome}</th>
            <th>R${ativo.posicao.toFixed(2)}</th>
            <th>{ativo.nota}</th>
            <th>{ativo.quantidade}</th>
          </tr>
        ))}
      </table>
    </div>
  );
};
