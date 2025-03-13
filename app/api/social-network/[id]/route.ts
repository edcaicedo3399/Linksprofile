import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { link } = await req.json();

    if (!id || !link) {
      return NextResponse.json(
        {
          error: "ID and link are required",
        },
        { status: 400 }
      );
    }

    const updatedLink = await db.link.update({
      where: { id },
      data: {
        link: link,
      },
    });

    return NextResponse.json(updatedLink, { status: 200 });
  } catch (error) {
    console.error("PATCH LINK ERROR", error);
    return NextResponse.json(
      {
        error: "Failed to update the link",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "ID are required" }, { status: 400 });
    }

    const deleteLink = await db.link.delete({
      where: { id },
    });

    return NextResponse.json(deleteLink);
  } catch (error) {
    console.error("DELETE LINK ERROR", error);
    return NextResponse.json(
      { error: "Failed to delete the link" },
      { status: 500 }
    );
  }
}
