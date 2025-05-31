import { client } from "@/lib/sanity/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
  }

  try {
    const data = await client.fetch(query);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return NextResponse.json({ error: "Failed to fetch data from Sanity" }, { status: 500 });
  }
}