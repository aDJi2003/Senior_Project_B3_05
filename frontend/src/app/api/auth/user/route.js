import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("http://localhost:8080/api/user", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) throw new Error("User not authenticated");

    const user = await response.json();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
}
