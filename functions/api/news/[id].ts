import { body, denied, isAdmin, json, type Ctx } from '../../_lib';
import { parse } from './index';

export const onRequestPut = async ({ request, env, params }: Ctx) => {
  if (!isAdmin(request, env)) return denied();
  const v = parse(await body(request));
  if (!v) return json({ error: 'invalid' }, 400);
  await env.DB.prepare('UPDATE news SET date=?,tag=?,title_en=?,title_ar=?,summary_en=?,summary_ar=?,image=?,link=?,published=? WHERE id=?')
    .bind(v.date, v.tag, v.title_en, v.title_ar, v.summary_en, v.summary_ar, v.image, v.link, v.published, params.id).run();
  return json({ ok: true });
};

export const onRequestDelete = async ({ request, env, params }: Ctx) => {
  if (!isAdmin(request, env)) return denied();
  await env.DB.prepare('DELETE FROM news WHERE id=?').bind(params.id).run();
  return json({ ok: true });
};
