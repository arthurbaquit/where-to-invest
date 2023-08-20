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
            nota: { value: number };
            tipo: { value: string };
          };
          const nome = target?.nome.value;
          const posicao = Number(target?.posicao.value);
          const nota = Number(target?.nota.value);
          const tipo = target?.tipo.value;
          if (!nome || !posicao || !nota || !tipo) {
            return;
          }
          onSubmit({ nome, posicao, nota, tipo });
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
            <option value="NationalStocks">Ação Nacional</option>
            <option value="ForeignStocks">Ação Internacional</option>
            <option value="FixedIncome">Renda Fixa</option>
            <option value="Reits">REITs</option>
            <option value="Crypto">Criptomoedas</option>
          </Select>
        </Label>
        <Label htmlFor="nota">
          Nota
          <Input type="text" name="nota" id="nota" step="1" placeholder="1" />
        </Label>
        <Button type="submit">Adicionar</Button>
      </form>
    </Card>
  );
};
