"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link href="/">Upload de Vídeos</Link>
      </div>
      <button
        style={styles.hamburger}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>
      <ul style={{ 
          ...styles.menu, 
          ...(isMenuOpen ? styles.menuOpen : {}) 
        }}>
        <li style={styles.menuItem}>
          <Link href="/">Página Inicial</Link>
        </li>
        <li style={styles.menuItem}>
          <Link href="/cadastro">Cadastro</Link>
        </li>
        <li style={styles.menuItem}>
          <Link href="/login">Login</Link>
        </li>
        <li style={styles.menuItem}>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: '#fff',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  hamburger: {
    display: 'none', // Inicialmente escondido
    fontSize: '24px', // Corrigido para incluir 'px'
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
  menu: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'row' as const,
    gap: '20px',
    margin: 0,
    padding: 0,
    transition: 'all 0.3s',
  },
  menuOpen: {
    flexDirection: 'column' as const,
    position: 'absolute' as const,
    top: '50px',
    right: '20px',
    backgroundColor: '#0070f3',
    borderRadius: '8px',
    padding: '10px',
    zIndex: 1000, // Garante que o menu fique acima de outros elementos
  },
  menuItem: {
    cursor: 'pointer',
  },
};

// Estilos responsivos aplicados diretamente no JSX
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  if (mediaQuery.matches) {
    styles.hamburger.display = 'block'; // Mostra o hamburger em telas pequenas
  }
}

export default NavBar;