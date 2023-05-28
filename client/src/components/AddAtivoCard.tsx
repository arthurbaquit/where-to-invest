import { Ativo } from "../hooks/useAtivos";
import { Button, Card, Input, Label, Select } from "./UI/styles";

type AddAtivoProps = {
  onSubmit: (ativo: Ativo) => void;
};
export const AddAtivoCard = ({ onSubmit }: AddAtivoProps) => {
  return (
    <Card>
      <h1>Adicionar Ativo</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            nome: { value: string };
            posicao: { value: number };
            meta: { value: number };
            tipo: { value: string };
          };
          const nome = target?.nome.value;
          const posicao = Number(target?.posicao.value);
          const meta = Number(target?.meta.value);
          const tipo = target?.tipo.value;
          if (!nome || !posicao || !meta || !tipo) {
            return;
          }
          onSubmit({ nome, posicao, meta, tipo });
        }}
      >
        <Label htmlFor="nome">
          Nome do Ativo
          <Input type="text" name="nome" id="nome" placeholder="XXXX11" />
        </Label>
        <Label htmlFor="posicao">
          Posição Atual
          <Input type="number" name="posicao" id="posicao" placeholder="1000" />
        </Label>
        <Label htmlFor="tipo">
          Tipo
          <Select name="tipo" id="tipo">
            <option value="FII">FII</option>
            <option value="Ação">Ação</option>
            <option value="ETF">ETF</option>
            <option value="Stock">Stock</option>
          </Select>
        </Label>
        <Label htmlFor="meta">
          Meta em Porcentagem
          <Input
            type="text"
            name="meta"
            id="meta"
            step="0.01"
            placeholder="25"
          />
        </Label>
        <Button type="submit">Adicionar</Button>
      </form>
    </Card>
  );
};
