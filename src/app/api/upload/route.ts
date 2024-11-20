import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json(); // Captura os dados enviados no corpo da requisição

  // Lógica para processar os dados
  return NextResponse.json({ mensagem: 'Seja bem vindo ao Sistema de Upload de Vídeo!!' }, { status: 200 });
}