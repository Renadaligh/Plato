/** Thin client for the Cloudflare Pages Functions API (/api/*). `key` = admin password, only for admin calls. */
export async function api<T>(path: string, init: RequestInit & { key?: string } = {}): Promise<T> {
  const { key, headers, ...rest } = init;
  const res = await fetch(`/api${path}`, {
    ...rest,
    headers: { ...(rest.body ? { 'content-type': 'application/json' } : {}), ...(key ? { authorization: `Bearer ${key}` } : {}), ...headers },
  });
  if (!res.ok) throw new Error(String(res.status));
  return (await res.json()) as T;
}
