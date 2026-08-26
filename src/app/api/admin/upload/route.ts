import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import sharp from "sharp";
import { supabaseAdmin } from "@/lib/supabase-server";
import { getAdminUser } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

const BUCKET = "event-images";
const MAX_BYTES = 5 * 1024 * 1024; // 5MB — guard on the raw upload
const MAX_EDGE = 1600; // downscale so the long edge is at most this many px
const CACHE_CONTROL = "2592000"; // 30 days; browsers/CDN reuse instead of refetching

// POST /api/admin/upload — upload an event image (admin only).
// Accepts multipart form-data with a single "file" field; stores it in the
// public `event-images` Supabase Storage bucket and returns its public URL.
export async function POST(request: Request) {
  const user = await getAdminUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image must be 5MB or smaller" },
      { status: 400 },
    );
  }

  // Downscale and re-encode to WebP before storing, so we never serve a
  // multi-MB phone photo. Full-res originals are the main driver of Storage
  // egress; a resized WebP is a fraction of the bytes at display sizes.
  let webp: Buffer;
  try {
    webp = await sharp(Buffer.from(await file.arrayBuffer()))
      .rotate() // honor EXIF orientation before dropping the metadata
      .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
  } catch {
    return NextResponse.json(
      { error: "Could not process that image" },
      { status: 400 },
    );
  }

  const key = `${randomUUID()}.webp`;

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(key, webp, {
      contentType: "image/webp",
      cacheControl: CACHE_CONTROL,
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(key);
  return NextResponse.json({ url: data.publicUrl }, { status: 201 });
}
