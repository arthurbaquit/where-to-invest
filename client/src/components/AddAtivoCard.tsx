import { Ativo } from "../hooks/useAtivos";
import styled from "styled-components";
const Label = styled.label`
  margin-bottom: 0.5rem;
  display: block;
`;
const Card = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
`;
const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
  width: 100;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
  width: 100;
`;
const Button = styled.button``;
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
          const posicao = target?.posicao.value;
          const meta = target?.meta.value;
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
