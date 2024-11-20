"use client";
import React from 'react';
import NavBar from '../components/NavBar';
import CadastroForm from '../components/CadastroForm';

const Cadastro: React.FC = () => {
  return (
    <div>
      <NavBar />
      <main>
        <CadastroForm />
      </main>
    </div>
  );
};

export default Cadastro;
