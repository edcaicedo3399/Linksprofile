import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const username = req.nextUrl.pathname.split("/").pop(); // Extrae el username de la URL

    if (!username) {
      return NextResponse.json(
          { message: "Username is required" },
          { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        username,
      },
      include: { links: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
        { message: "Error getting user", error: errorMessage },
        { status: 500 }
    );
  }
}