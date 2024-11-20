"use client"
import React, { useState } from 'react';

const CadastroForm: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mensagem, setMensagem] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/api/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, email }),
    });

    if (response.ok) {
      const data = await response.json();
      setMensagem(data.mensagem);
    } else {
      setMensagem('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Cadastro</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label htmlFor="nome" style={styles.label}>Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.field}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Confirmar</button>
      </form>
      {mensagem && <p style={styles.message}>{mensagem}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f4f4f9',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center' as const,
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  label: {
    marginBottom: '5px',
    fontSize: '16px',
    color: '#555',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
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
  message: {
    marginTop: '15px',
    textAlign: 'center' as const,
    color: 'green',
  },
};

export default CadastroForm;
