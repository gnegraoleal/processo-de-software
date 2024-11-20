"use client";
import React, { useState } from "react";

const CadastroForm: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [nomeError, setNomeError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");

  const [successMessage, setSuccessMessage] = useState<string>("");

  const handlePhoneChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    let formattedValue = numericValue;
    if (numericValue.length > 0) {
      formattedValue = `(${numericValue.substring(0, 2)}`;
    }
    if (numericValue.length > 2) {
      formattedValue += `) ${numericValue.substring(2, 7)}`;
    }
    if (numericValue.length > 7) {
      formattedValue += `-${numericValue.substring(7, 11)}`;
    }
    setPhone(formattedValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    setNomeError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setPhoneError("");
    setSuccessMessage("");

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

    // Validação de confirmação de senha
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("O campo de confirmação de senha é obrigatório");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não correspondem");
      isValid = false;
    }

    // Validação do número de telefone
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!phone.trim()) {
      setPhoneError("O campo de telefone é obrigatório");
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      setPhoneError("O telefone deve estar no formato (XX) XXXXX-XXXX");
      isValid = false;
    }

    // Exibir mensagem de sucesso
    if (isValid) {
      setSuccessMessage("Cadastro enviado com sucesso!");
      console.log({ nome, email, password, phone });
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
          <label htmlFor="password" style={styles.label}>
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

        {/* Campo de Confirmação de Senha */}
        <div style={styles.field}>
          <label htmlFor="confirmPassword" style={styles.label}>
            Confirme sua senha:
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              ...styles.input,
              borderColor: confirmPasswordError ? "red" : "#ccc",
            }}
          />
          {confirmPasswordError && (
            <p style={styles.errorText}>{confirmPasswordError}</p>
          )}
        </div>

        {/* Campo de Telefone */}
        <div style={styles.field}>
          <label htmlFor="phone" style={styles.label}>
            Número de telefone:
          </label>
          <input
            id="phone"
            placeholder="(XX) XXXXX-XXXX"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            style={{
              ...styles.input,
              borderColor: phoneError ? "red" : "#ccc",
            }}
          />
          {phoneError && <p style={styles.errorText}>{phoneError}</p>}
        </div>

        <button type="submit" style={styles.button}>
          Confirmar
        </button>
      </form>

      {/* Mensagem de Sucesso */}
      {successMessage && <p style={styles.successText}>{successMessage}</p>}
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
  successText: {
    marginTop: "15px",
    color: "green",
    fontSize: "14px",
    textAlign: "center" as const,
  },
};

export default CadastroForm;
