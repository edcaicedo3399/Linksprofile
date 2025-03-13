import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    const data = await req.json();

    const { name, username, avatarUrl, links, typeUser } = data;
    console.log("Auth data:", getAuth(req));
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await db.user.update({
      where: { id: userId },
      data: {
        name,
        username,
        avatarUrl,
        firstLogin: false,
        typeUser,
        links: {
          create: links,
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error creating user",
        errror: error,
      },
      { status: 500 }
    );
  }
}
