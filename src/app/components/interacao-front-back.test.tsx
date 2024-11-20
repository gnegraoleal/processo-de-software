// InteracaoFrontBack.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import InteracaoFrontBack from './Interacao-front-back';

jest.mock('node-fetch', () => jest.fn());

const fetchMock = require('node-fetch');

describe('<InteracaoFrontBack />', () => {
  it('should display success message on successful API call', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ mensagem: 'Sucesso' }),
    });

    render(<InteracaoFrontBack />);
    fireEvent.click(screen.getByText('Enviar Requisição'));

    expect(await screen.findByText('Mensagem do BackEnd: Sucesso')).toBeInTheDocument();
  });

  it('should display error message on failed API call', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
    });

    render(<InteracaoFrontBack />);
    fireEvent.click(screen.getByText('Enviar Requisição'));

    expect(await screen.findByText('Erro ao se comunicar com o backend.')).toBeInTheDocument();
  });

  it('should display error message on network error', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Network Error'));

    render(<InteracaoFrontBack />);
    fireEvent.click(screen.getByText('Enviar Requisição'));

    expect(await screen.findByText('Erro ao se comunicar com o backend: Network Error')).toBeInTheDocument();
  });
});
