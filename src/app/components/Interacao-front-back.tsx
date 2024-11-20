"use client"
import { useState } from 'react';

const InteracaoFrontBack = () => {
  const [mensagem, setMensagem] = useState('');

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/upload/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ /* dados que você deseja enviar */ }),
      });

      if (response.ok) {
        const data = await response.json();
        setMensagem(`Mensagem do BackEnd: ${data.mensagem}`);
      } else {
        setMensagem('Erro ao se comunicar com o backend.');
      }
    } catch (error) {
      if (error instanceof Error) {
        setMensagem('Erro ao se comunicar com o backend: ' + error.message);
      } else {
        setMensagem('Erro desconhecido ao se comunicar com o backend.');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Interação com o Backend</h1>
      <button onClick={handleClick}>Enviar Requisição</button>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default InteracaoFrontBack;