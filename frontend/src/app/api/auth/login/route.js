import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const API_URL =
      process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ||
      "http://localhost:5000";

    const response = await fetch(
      `${API_URL}/api/pengguna/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) throw new Error("Invalid credentials");

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
