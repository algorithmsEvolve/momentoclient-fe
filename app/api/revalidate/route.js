import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

function unauthorized() {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export async function POST(request) {
  const secret = process.env.MOMENTO_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: "Revalidation is not configured" },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => ({}));

  if (body.secret !== secret) {
    return unauthorized();
  }

  revalidateTag("site-page:home");
  revalidateTag("site-pages");
  revalidatePath("/");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
