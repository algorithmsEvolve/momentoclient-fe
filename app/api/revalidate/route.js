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
  const slug = typeof body.slug === "string" ? body.slug : "home";

  if (body.secret !== secret) {
    return unauthorized();
  }

  const targets = {
    home: {
      path: "/",
      tags: ["site-page:home", "site-pages"],
    },
    pricing: {
      path: "/harga",
      tags: ["site-page:pricing", "site-pages"],
    },
  };

  const selected = targets[slug];
  if (!selected) {
    return NextResponse.json({ message: "Invalid slug" }, { status: 422 });
  }

  selected.tags.forEach((tag) => revalidateTag(tag));
  revalidatePath(selected.path);

  return NextResponse.json({ revalidated: true, slug, now: Date.now() });
}
