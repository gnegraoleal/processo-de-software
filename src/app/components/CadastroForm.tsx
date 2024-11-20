"use client";
import React, { useState } from "react";

const CadastroForm: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [nomeError, setNomeError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    setNomeError("");
    setEmailError("");
    setPasswordError("");

    // Validação do nome
    if (!nome.trim()) {
      setNomeError("O campo de nome é obrigatório");
      isValid = false;
    }

    // Validação do email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      setEmailError("O campo de email é obrigatório");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Por favor, insira um email válido");
      isValid = false;
    }

    // Validação da senha
    if (!password.trim()) {
      setPasswordError("O campo de senha é obrigatório");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres");
      isValid = false;
    }

    // Se todos os campos forem válidos
    if (isValid) {
      console.log({ nome, email, password });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Cadastro</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Campo de Nome */}
        <div style={styles.field}>
          <label htmlFor="nome" style={styles.label}>
            Nome:
          </label>
          <input
            type="text"
            id="nome"
            placeholder="Username"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{
              ...styles.input,
              borderColor: nomeError ? "red" : "#ccc",
            }}
          />
          {nomeError && <p style={styles.errorText}>{nomeError}</p>}
        </div>

        {/* Campo de Email */}
        <div style={styles.field}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              ...styles.input,
              borderColor: emailError ? "red" : "#ccc",
            }}
          />
          {emailError && <p style={styles.errorText}>{emailError}</p>}
        </div>

        {/* Campo de Senha */}
        <div style={styles.field}>
          <label htmlFor="senha" style={styles.label}>
            Senha:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              ...styles.input,
              borderColor: passwordError ? "red" : "#ccc",
            }}
          />
          {passwordError && <p style={styles.errorText}>{passwordError}</p>}
        </div>

        <button type="submit" style={styles.button}>
          Confirmar
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f4f4f9",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center" as const,
    fontSize: "24px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
  },
  field: {
    display: "flex",
    flexDirection: "column" as const,
  },
  label: {
    marginBottom: "5px",
    fontSize: "16px",
    color: "#555",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  errorText: {
    marginTop: "5px",
    color: "red",
    fontSize: "12px",
  },
};

export default CadastroForm;
