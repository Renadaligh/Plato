import { body, denied, isAdmin, json, type Ctx } from '../../_lib';
import { parse } from './index';

export const onRequestPut = async ({ request, env, params }: Ctx) => {
  if (!isAdmin(request, env)) return denied();
  const v = parse(await body(request));
  if (!v) return json({ error: 'invalid' }, 400);
  await env.DB.prepare('UPDATE tournaments SET game_id=?,name_en=?,name_ar=?,format_en=?,format_ar=?,prize_en=?,prize_ar=?,starts_at=?,ends_at=?,filled=?,total=?,mode=?,register_url=?,image=?,winner_en=?,winner_ar=?,published=? WHERE id=?')
    .bind(v.game_id, v.name.en, v.name.ar, v.format.en, v.format.ar, v.prize.en, v.prize.ar, v.startsAt, v.endsAt, v.filled, v.total, v.mode, v.register_url, v.image, v.winner.en, v.winner.ar, v.published, params.id).run();
  return json({ ok: true });
};

export const onRequestDelete = async ({ request, env, params }: Ctx) => {
  if (!isAdmin(request, env)) return denied();
  await env.DB.prepare('DELETE FROM tournaments WHERE id=?').bind(params.id).run();
  return json({ ok: true });
};
