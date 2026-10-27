import { denied, isAdmin, json, type Ctx } from '../_lib';

const MAX = 6 * 1024 * 1024;

/** Detect the real image type from the first bytes (never trust the browser's Content-Type). */
function sniff(b: Uint8Array): { ext: string; type: string } | null {
  const at = (i: number, s: string) => [...s].every((c, j) => b[i + j] === c.charCodeAt(0));
  if (b[0] === 0x89 && at(1, 'PNG')) return { ext: 'png', type: 'image/png' };
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { ext: 'jpg', type: 'image/jpeg' };
  if (at(0, 'RIFF') && at(8, 'WEBP')) return { ext: 'webp', type: 'image/webp' };
  if (at(0, 'GIF8')) return { ext: 'gif', type: 'image/gif' };
  return null;
}

/** POST /api/upload (admin only): multipart form with one "file" → stored in R2, returns { url }. */
export const onRequestPost = async ({ request, env }: Ctx) => {
  if (!isAdmin(request, env)) return denied();
  if (!env.IMAGES) return json({ error: 'storage-not-configured' }, 500);
  let file: unknown;
  try { file = (await request.formData()).get('file'); } catch { return json({ error: 'invalid' }, 400); }
  if (!file || typeof file === 'string') return json({ error: 'invalid' }, 400);
  const blob = file as Blob;
  if (blob.size === 0 || blob.size > MAX) return json({ error: 'too-large' }, 413);
  const bytes = new Uint8Array(await blob.arrayBuffer());
  const kind = sniff(bytes);
  if (!kind) return json({ error: 'unsupported' }, 415);
  const key = `${crypto.randomUUID()}.${kind.ext}`;
  await env.IMAGES.put(key, bytes, { httpMetadata: { contentType: kind.type } });
  return json({ url: `/api/img/${key}` });
};
