import { denied, isAdmin, json, type Ctx } from '../../_lib';

export const onRequestDelete = async ({ request, env, params }: Ctx) => {
  if (!isAdmin(request, env)) return denied();
  await env.DB.prepare('DELETE FROM registrations WHERE id=?').bind(params.id).run();
  return json({ ok: true });
};
