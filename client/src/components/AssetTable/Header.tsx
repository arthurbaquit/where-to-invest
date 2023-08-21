import styles from "./AssetTable.module.scss";

export const Header = () => {
  return (
    <tr className={styles.Header}>
      <th>Tipo</th>
      <th>Nome</th>
      <th>Posição</th>
      <th>Nota</th>
      <th>Quantidade</th>
    </tr>
  );
};
