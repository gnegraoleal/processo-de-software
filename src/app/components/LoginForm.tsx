import React, { useState, FormEvent } from 'react';
import Link from 'next/link';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;
    setEmailError('');  // Reseta o erro de email
    setPasswordError('');  // Reseta o erro de senha

    // Verificação mais robusta para o campo de email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailError('O campo de email é obrigatório');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Por favor, insira um email válido');
      isValid = false;
    }

    // Verificação do campo de senha
    if (!password) {
      setPasswordError('O campo de senha é obrigatório');
      isValid = false;
    }

    // Se tudo estiver correto, enviar os dados
    if (isValid) {
      console.log('Email:', email);
      console.log('Password:', password);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>

        {/* Campo de email */}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            ...styles.input,
            borderColor: emailError ? 'red' : '#ccc', // Mudando a borda com base no erro
          }}
        />
        {emailError && <p style={styles.errorText}>{emailError}</p>}

        {/* Campo de senha */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            ...styles.input,
            borderColor: passwordError ? 'red' : '#ccc', // Mudando a borda com base no erro
          }}
        />
        {passwordError && <p style={styles.errorText}>{passwordError}</p>}

        {/* Botão de login */}
        <button type="submit" style={styles.button}>
          Login
        </button>

        {/* Link para a página de cadastro */}
        <Link href={"/cadastro"}>
          <button style={{ ...styles.button, marginTop: '10px' }} type="button">
            Não tem conta? Cadastre-se!
          </button>
        </Link>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: '15px',
    fontSize: '24px',
    color: '#333',
    textAlign: 'center' as const,
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  errorText: {
    color: 'red',
    fontSize: '12px',
    margin: '0 0 10px 0',
  },
};

export default LoginForm;
