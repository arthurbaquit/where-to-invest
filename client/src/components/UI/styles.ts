import styled from "styled-components";

export const Label = styled.label`
  margin-bottom: 0.5rem;
  display: block;
`;

export const Card = styled.div`
  @media (prefers-color-scheme: dark) {
    box-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.1);
  }
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
`;
export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
  width: 100;
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
  width: 100;
`;

export const Button = styled.button``;
