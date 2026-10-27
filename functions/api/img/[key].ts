import type { Ctx } from '../../_lib';

/** GET /api/img/<uuid>.<ext>: public image from R2. Names are random and never reused, so they cache forever. */
export const onRequestGet = async ({ env, params }: Ctx) => {
  const key = params.key ?? '';
  if (!env.IMAGES || !/^[0-9a-f-]{36}\.(png|jpg|webp|gif)$/.test(key)) return new Response('Not found', { status: 404 });
  const obj = await env.IMAGES.get(key);
  if (!obj) return new Response('Not found', { status: 404 });
  return new Response(obj.body, {
    headers: {
      'content-type': obj.httpMetadata?.contentType ?? 'application/octet-stream',
      'cache-control': 'public, max-age=31536000, immutable',
      'x-content-type-options': 'nosniff',
    },
  });
};
