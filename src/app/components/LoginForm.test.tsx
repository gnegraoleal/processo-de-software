import React from "react";  // Importando o React
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import "@testing-library/jest-dom"; // Para asserções com jest-dom

describe("LoginForm", () => {
  // Mockando o console.log antes de cada teste
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  // Limpando mocks após cada teste
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("deve renderizar todos os campos do formulário", () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("deve mostrar erros quando os campos estão vazios", async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText("O campo de email é obrigatório")).toBeInTheDocument();
      expect(screen.getByText("O campo de senha é obrigatório")).toBeInTheDocument();
    });
  });

  it("deve mostrar erro de email inválido", async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "invalid-email" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText("Por favor, insira um email válido")).toBeInTheDocument();
    });
  });

  it("deve permitir o login com dados válidos", async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "123456" } });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Verificar se o console.log foi chamado corretamente
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith("Email:", "test@example.com");
      expect(console.log).toHaveBeenCalledWith("Password:", "123456");
    });
  });

  it("deve exibir erro quando o campo de senha estiver vazio", async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "" } });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText("O campo de senha é obrigatório")).toBeInTheDocument();
    });
  });
});
