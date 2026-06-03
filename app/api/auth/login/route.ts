import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-lagunaclub.onrender.com';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const response = await fetch(`${API_URL}/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[v0] API Error:', error);
    return NextResponse.json(
      { message: 'Error al conectar con el servidor' },
      { status: 500 }
    );
  }
}
