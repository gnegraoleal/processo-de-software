import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CadastroForm from "./CadastroForm";
import "@testing-library/jest-dom";

describe("CadastroForm", () => {
  it("deve renderizar todos os campos do formulário", () => {
    render(<CadastroForm />);

    expect(screen.getByLabelText("Nome:")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha:")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirme sua senha:")).toBeInTheDocument();
    expect(screen.getByLabelText("Número de telefone:")).toBeInTheDocument();
  });

  it("deve mostrar erros quando os campos estão vazios", async () => {
    render(<CadastroForm />);

    fireEvent.click(screen.getByText("Confirmar"));

    expect(await screen.findByText("O campo de nome é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("O campo de email é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("O campo de senha é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("O campo de confirmação de senha é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("O campo de telefone é obrigatório")).toBeInTheDocument();
  });

  it("deve validar que as senhas correspondem", async () => {
    render(<CadastroForm />);

    fireEvent.change(screen.getByLabelText("Senha:"), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText("Confirme sua senha:"), { target: { value: "654321" } });

    fireEvent.click(screen.getByText("Confirmar"));

    expect(await screen.findByText("As senhas não correspondem")).toBeInTheDocument();
  });

  it("deve formatar o número de telefone corretamente", async () => {
    render(<CadastroForm />);

    const phoneInput = screen.getByLabelText("Número de telefone:");
    fireEvent.change(phoneInput, { target: { value: "11987654321" } });

    expect(phoneInput).toHaveValue("(11) 98765-4321");
  });

  it("deve exibir mensagem de sucesso com dados válidos", async () => {
    render(<CadastroForm />);

    fireEvent.change(screen.getByLabelText("Nome:"), { target: { value: "João" } });
    fireEvent.change(screen.getByLabelText("Email:"), { target: { value: "joao@email.com" } });
    fireEvent.change(screen.getByLabelText("Senha:"), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText("Confirme sua senha:"), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText("Número de telefone:"), { target: { value: "11987654321" } });

    fireEvent.click(screen.getByText("Confirmar"));

    expect(await screen.findByText("Cadastro enviado com sucesso!")).toBeInTheDocument();
  });
});