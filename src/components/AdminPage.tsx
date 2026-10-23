import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { GAMES } from '../data/games';
import type { NewsItem, NewsTag } from '../data/news';
import type { Tournament } from '../data/tournaments';
import { api } from '../services/api';

/** Dashboard (#/admin). Arabic-only on purpose: it is a tool for the team, not for visitors. */
type Adm<T> = T & { published?: boolean };
type Reg = { id: number; tournament_id: string; tournament_name: string; mode: string; plato_id: string; team_name: string; members: string; lang: string; created_at: string };
type Tab = 'news' | 'tournaments' | 'regs';

const KEY = 'plato-admin-key';
const TAG_AR: Record<NewsTag, string> = { update: 'تحديث', tournament: 'بطولة', community: 'مجتمع', event: 'فعالية' };
const inp = 'w-full rounded-xl border bg-transparent px-3 py-2.5 text-[.92rem] outline-none focus:border-[var(--link-on)]';
const bd = { borderColor: 'var(--glass-b)', color: 'var(--text)' };

const getKey = () => { try { return sessionStorage.getItem(KEY) ?? ''; } catch { return ''; } };

function Field({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  return <label className={`flex flex-col gap-1.5 text-[.85rem] font-semibold ${wide ? 'sm:col-span-2' : ''}`}>{label}{children}</label>;
}
const Box = ({ children }: { children: ReactNode }) => <div className="rounded-2xl border p-5" style={{ background: 'var(--glass)', borderColor: 'var(--glass-b)' }}>{children}</div>;

/* ---------- Riyadh date-time helpers (stored as ISO with +03:00) ---------- */
const toInput = (iso: string) => {
  if (!iso) return '';
  if (/\+03:00$/.test(iso)) return iso.slice(0, 16);
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleString('sv-SE', { timeZone: 'Asia/Riyadh' }).replace(' ', 'T').slice(0, 16);
};
const fromInput = (v: string) => (v ? `${v}:00+03:00` : '');

/* ---------- News ---------- */
const emptyNews = (): Adm<NewsItem> => ({ id: '', date: new Date().toISOString().slice(0, 10), tag: 'update', title: { ar: '', en: '' }, summary: { ar: '', en: '' }, image: '', href: '', published: true });

function NewsTab({ k, onAuthFail }: { k: string; onAuthFail: () => void }) {
  const [rows, setRows] = useState<Adm<NewsItem>[]>([]);
  const [f, setF] = useState<Adm<NewsItem> | null>(null);
  const [msg, setMsg] = useState('');
  const load = useCallback(() => { api<Adm<NewsItem>[]>('/news', { key: k }).then(setRows).catch(() => setMsg('تعذّر تحميل الأخبار')); }, [k]);
  useEffect(load, [load]);

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!f) return;
    try {
      await api(f.id ? `/news/${f.id}` : '/news', { method: f.id ? 'PUT' : 'POST', body: JSON.stringify(f), key: k });
      setF(null); setMsg('تم الحفظ'); load();
    } catch (err) { if ((err as Error).message === '401') onAuthFail(); else setMsg('تحقق من التاريخ والعنوان'); }
  }
  async function del(id: string) {
    if (!window.confirm('حذف هذا الخبر؟')) return;
    await api(`/news/${id}`, { method: 'DELETE', key: k }).catch(() => undefined);
    load();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between"><h2 className="text-xl font-extrabold">الأخبار ({rows.length})</h2><button className="btn-primary !px-5 !py-2.5" onClick={() => { setMsg(''); setF(emptyNews()); }}>+ خبر جديد</button></div>
      {msg && <p role="status" style={{ color: 'var(--muted)' }}>{msg}</p>}
      {f && (
        <Box>
          <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
            <Field label="العنوان (عربي)"><input className={inp} style={bd} value={f.title.ar} onChange={(e) => setF({ ...f, title: { ...f.title, ar: e.target.value } })} /></Field>
            <Field label="Title (English)"><input dir="ltr" className={inp} style={bd} value={f.title.en} onChange={(e) => setF({ ...f, title: { ...f.title, en: e.target.value } })} /></Field>
            <Field label="الملخص (عربي)"><textarea rows={3} className={inp} style={bd} value={f.summary.ar} onChange={(e) => setF({ ...f, summary: { ...f.summary, ar: e.target.value } })} /></Field>
            <Field label="Summary (English)"><textarea dir="ltr" rows={3} className={inp} style={bd} value={f.summary.en} onChange={(e) => setF({ ...f, summary: { ...f.summary, en: e.target.value } })} /></Field>
            <Field label="التاريخ"><input type="date" className={inp} style={bd} value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} required /></Field>
            <Field label="التصنيف">
              <select className={inp} style={bd} value={f.tag} onChange={(e) => setF({ ...f, tag: e.target.value as NewsTag })}>
                {(Object.keys(TAG_AR) as NewsTag[]).map((x) => <option key={x} value={x}>{TAG_AR[x]}</option>)}
              </select>
            </Field>
            <Field label="رابط الصورة (اختياري)"><input dir="ltr" className={inp} style={bd} value={f.image ?? ''} placeholder="https://… أو /images/x.jpg" onChange={(e) => setF({ ...f, image: e.target.value })} /></Field>
            <Field label="رابط الخبر (اختياري)"><input dir="ltr" className={inp} style={bd} value={f.href ?? ''} placeholder="https://…" onChange={(e) => setF({ ...f, href: e.target.value })} /></Field>
            <label className="flex items-center gap-2 text-[.9rem] sm:col-span-2"><input type="checkbox" checked={f.published !== false} onChange={(e) => setF({ ...f, published: e.target.checked })} /> منشور (يظهر في الموقع)</label>
            <div className="flex gap-3 sm:col-span-2"><button className="btn-primary !px-6 !py-2.5" type="submit">حفظ</button><button type="button" className="btn-glass !px-6 !py-2.5" onClick={() => setF(null)}>إلغاء</button></div>
          </form>
        </Box>
      )}
      <div className="flex flex-col gap-2">
        {rows.map((r) => (
          <Box key={r.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0"><b>{r.title.ar || r.title.en}</b><div className="text-[.82rem]" style={{ color: 'var(--muted)' }}>{r.date} · {TAG_AR[r.tag]}{r.published === false ? ' · مسودة' : ''}</div></div>
              <div className="flex gap-2"><button className="btn-glass !px-4 !py-2 !text-[.85rem]" onClick={() => { setMsg(''); setF({ ...r, image: r.image ?? '', href: r.href ?? '' }); window.scrollTo({ top: 0 }); }}>تعديل</button><button className="btn-glass !px-4 !py-2 !text-[.85rem]" onClick={() => del(r.id)}>حذف</button></div>
            </div>
          </Box>
        ))}
        {!rows.length && <p style={{ color: 'var(--muted)' }}>ما فيه أخبار بعد.</p>}
      </div>
    </div>
  );
}

/* ---------- Tournaments ---------- */
const emptyT = (): Adm<Tournament> => ({ id: '', gameId: GAMES[0]?.id ?? '', name: { ar: '', en: '' }, format: { ar: '', en: '' }, prize: { ar: '', en: '' }, startsAt: '', endsAt: '', slots: { filled: 0, total: 16 }, mode: 'solo', registerUrl: '', image: '', winner: { ar: '', en: '' }, published: true });

function TournamentsTab({ k, onAuthFail }: { k: string; onAuthFail: () => void }) {
  const [rows, setRows] = useState<Adm<Tournament>[]>([]);
  const [f, setF] = useState<Adm<Tournament> | null>(null);
  const [msg, setMsg] = useState('');
  const load = useCallback(() => { api<Adm<Tournament>[]>('/tournaments', { key: k }).then(setRows).catch(() => setMsg('تعذّر تحميل البطولات')); }, [k]);
  useEffect(load, [load]);

  const pair = (name: 'name' | 'format' | 'prize' | 'winner', label: string, en: string, ph = '') => f && (
    <>
      <Field label={`${label} (عربي)`}><input className={inp} style={bd} value={f[name]?.ar ?? ''} placeholder={ph} onChange={(e) => setF({ ...f, [name]: { ar: e.target.value, en: f[name]?.en ?? '' } })} /></Field>
      <Field label={`${en} (English)`}><input dir="ltr" className={inp} style={bd} value={f[name]?.en ?? ''} onChange={(e) => setF({ ...f, [name]: { en: e.target.value, ar: f[name]?.ar ?? '' } })} /></Field>
    </>
  );

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!f) return;
    try {
      await api(f.id ? `/tournaments/${f.id}` : '/tournaments', { method: f.id ? 'PUT' : 'POST', body: JSON.stringify(f), key: k });
      setF(null); setMsg('تم الحفظ'); load();
    } catch (err) { if ((err as Error).message === '401') onAuthFail(); else setMsg('تحقق من الاسم وتاريخ البداية'); }
  }
  async function del(id: string) {
    if (!window.confirm('حذف هذه البطولة؟')) return;
    await api(`/tournaments/${id}`, { method: 'DELETE', key: k }).catch(() => undefined);
    load();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between"><h2 className="text-xl font-extrabold">البطولات ({rows.length})</h2><button className="btn-primary !px-5 !py-2.5" onClick={() => { setMsg(''); setF(emptyT()); }}>+ بطولة جديدة</button></div>
      {msg && <p role="status" style={{ color: 'var(--muted)' }}>{msg}</p>}
      {f && (
        <Box>
          <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
            {pair('name', 'اسم البطولة', 'Name')}
            <Field label="اللعبة"><select className={inp} style={bd} value={f.gameId} onChange={(e) => setF({ ...f, gameId: e.target.value })}>{GAMES.map((g) => <option key={g.id} value={g.id}>{g.name.ar} — {g.name.en}</option>)}</select></Field>
            <Field label="النوع"><select className={inp} style={bd} value={f.mode ?? 'solo'} onChange={(e) => setF({ ...f, mode: e.target.value as 'solo' | 'team' })}><option value="solo">فردي (Plato ID)</option><option value="team">فرق (اسم الفريق + القائد + الأعضاء)</option></select></Field>
            {pair('format', 'النظام', 'Format', 'فردي · أسرع لفة')}
            {pair('prize', 'الجائزة', 'Prize', '5,000 ريال')}
            <Field label="البداية (توقيت الرياض)"><input type="datetime-local" className={inp} style={bd} value={toInput(f.startsAt)} onChange={(e) => setF({ ...f, startsAt: fromInput(e.target.value) })} required /></Field>
            <Field label="النهاية (توقيت الرياض)"><input type="datetime-local" className={inp} style={bd} value={toInput(f.endsAt)} onChange={(e) => setF({ ...f, endsAt: fromInput(e.target.value) })} /></Field>
            <Field label="العدد الأقصى"><input type="number" min={1} className={inp} style={bd} value={f.slots.total} onChange={(e) => setF({ ...f, slots: { ...f.slots, total: Number(e.target.value) } })} /></Field>
            <Field label="المسجّلين حالياً (يزيد تلقائياً مع كل تسجيل)"><input type="number" min={0} className={inp} style={bd} value={f.slots.filled} onChange={(e) => setF({ ...f, slots: { ...f.slots, filled: Number(e.target.value) } })} /></Field>
            <Field label="رابط تسجيل خارجي (اختياري، يلغي نموذج الموقع)" wide><input dir="ltr" className={inp} style={bd} value={f.registerUrl ?? ''} placeholder="https://…" onChange={(e) => setF({ ...f, registerUrl: e.target.value })} /></Field>
            <Field label="رابط الصورة (اختياري)" wide><input dir="ltr" className={inp} style={bd} value={f.image ?? ''} onChange={(e) => setF({ ...f, image: e.target.value })} /></Field>
            {pair('winner', 'الفائز (بعد الانتهاء)', 'Winner')}
            <label className="flex items-center gap-2 text-[.9rem] sm:col-span-2"><input type="checkbox" checked={f.published !== false} onChange={(e) => setF({ ...f, published: e.target.checked })} /> منشورة (تظهر في الموقع)</label>
            <div className="flex gap-3 sm:col-span-2"><button className="btn-primary !px-6 !py-2.5" type="submit">حفظ</button><button type="button" className="btn-glass !px-6 !py-2.5" onClick={() => setF(null)}>إلغاء</button></div>
          </form>
        </Box>
      )}
      <div className="flex flex-col gap-2">
        {rows.map((r) => (
          <Box key={r.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0"><b>{r.name.ar || r.name.en}</b><div className="text-[.82rem]" style={{ color: 'var(--muted)' }}>{toInput(r.startsAt).replace('T', ' ')} · {r.slots.filled}/{r.slots.total}{r.published === false ? ' · مسودة' : ''}</div></div>
              <div className="flex gap-2"><button className="btn-glass !px-4 !py-2 !text-[.85rem]" onClick={() => { setMsg(''); setF({ ...r, winner: r.winner ?? { ar: '', en: '' }, registerUrl: r.registerUrl ?? '', image: r.image ?? '' }); window.scrollTo({ top: 0 }); }}>تعديل</button><button className="btn-glass !px-4 !py-2 !text-[.85rem]" onClick={() => del(r.id)}>حذف</button></div>
            </div>
          </Box>
        ))}
        {!rows.length && <p style={{ color: 'var(--muted)' }}>ما فيه بطولات بعد.</p>}
      </div>
    </div>
  );
}

/* ---------- Registrations ---------- */
const csvCell = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;

function RegsTab({ k, onAuthFail }: { k: string; onAuthFail: () => void }) {
  const [rows, setRows] = useState<Reg[]>([]);
  const [tid, setTid] = useState('all');
  const [msg, setMsg] = useState('');
  const load = useCallback(() => { api<Reg[]>('/registrations', { key: k }).then(setRows).catch((e: Error) => { if (e.message === '401') onAuthFail(); else setMsg('تعذّر تحميل التسجيلات'); }); }, [k, onAuthFail]);
  useEffect(load, [load]);

  const tournaments = useMemo(() => [...new Map(rows.map((r) => [r.tournament_id, r.tournament_name])).entries()], [rows]);
  const shown = tid === 'all' ? rows : rows.filter((r) => r.tournament_id === tid);

  function exportCsv() {
    const head = ['البطولة', 'النوع', 'Plato ID', 'اسم الفريق', 'الأعضاء', 'اللغة', 'التاريخ'];
    const lines = [head, ...shown.map((r) => [r.tournament_name, r.mode === 'team' ? 'فريق' : 'فردي', r.plato_id, r.team_name, r.members, r.lang, r.created_at])];
    const blob = new Blob(['﻿' + lines.map((l) => l.map(csvCell).join(',')).join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'plato-registrations.csv'; a.click();
    URL.revokeObjectURL(a.href);
  }
  async function del(id: number) {
    if (!window.confirm('حذف هذا التسجيل؟')) return;
    await api(`/registrations/${id}`, { method: 'DELETE', key: k }).catch(() => undefined);
    load();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-extrabold">التسجيلات ({shown.length})</h2>
        <div className="flex gap-3">
          <select className={`${inp} !w-auto`} style={bd} value={tid} onChange={(e) => setTid(e.target.value)}>
            <option value="all">كل البطولات</option>
            {tournaments.map(([id, name]) => <option key={id} value={id}>{name}</option>)}
          </select>
          <button className="btn-primary !px-5 !py-2.5" onClick={exportCsv} disabled={!shown.length}>تصدير CSV</button>
        </div>
      </div>
      {msg && <p role="status" style={{ color: 'var(--muted)' }}>{msg}</p>}
      <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: 'var(--glass-b)', background: 'var(--glass)' }}>
        <table className="w-full min-w-[40rem] text-[.88rem]">
          <thead><tr className="text-start" style={{ color: 'var(--muted)' }}>{['البطولة', 'Plato ID', 'الفريق', 'الأعضاء', 'التاريخ', ''].map((h) => <th key={h} className="p-3 text-start font-semibold">{h}</th>)}</tr></thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.id} className="border-t align-top" style={{ borderColor: 'var(--glass-b)' }}>
                <td className="p-3">{r.tournament_name}</td><td className="p-3" dir="ltr">{r.plato_id}</td><td className="p-3">{r.team_name || '—'}</td>
                <td className="whitespace-pre-line p-3" dir="ltr">{r.members || '—'}</td><td className="p-3" dir="ltr">{r.created_at}</td>
                <td className="p-3"><button className="underline" onClick={() => del(r.id)}>حذف</button></td>
              </tr>
            ))}
            {!shown.length && <tr><td colSpan={6} className="p-5" style={{ color: 'var(--muted)' }}>ما فيه تسجيلات بعد.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Shell ---------- */
export default function AdminPage() {
  const [key, setKey] = useState(getKey);
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [tab, setTab] = useState<Tab>('news');

  const logout = useCallback(() => { try { sessionStorage.removeItem(KEY); } catch { /* ignore */ } setKey(''); }, []);

  async function login(e: FormEvent) {
    e.preventDefault();
    setErr('');
    try {
      await api('/registrations', { key: pw });
      try { sessionStorage.setItem(KEY, pw); } catch { /* ignore */ }
      setKey(pw); setPw('');
    } catch (x) { setErr((x as Error).message === '401' ? 'كلمة السر غير صحيحة' : 'تعذّر الاتصال بالخادم'); }
  }

  const wrap = 'min-h-[100svh] px-[clamp(1.1rem,6vw,5rem)] pb-16 pt-[clamp(6.5rem,12vw,8.5rem)]';

  if (!key) {
    return (
      <section dir="rtl" className={wrap} style={{ background: 'var(--bg)' }}>
        <form onSubmit={login} className="mx-auto flex max-w-sm flex-col gap-4">
          <h1 className="text-2xl font-extrabold">لوحة التحكم</h1>
          <input type="password" autoFocus className={inp} style={bd} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="كلمة السر" />
          {err && <p role="alert" style={{ color: '#ff6b7a' }}>{err}</p>}
          <button className="btn-primary" type="submit">دخول</button>
        </form>
      </section>
    );
  }

  const tabs: [Tab, string][] = [['news', 'الأخبار'], ['tournaments', 'البطولات'], ['regs', 'التسجيلات']];
  return (
    <section dir="rtl" className={wrap} style={{ background: 'var(--bg)' }}>
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {tabs.map(([id, label]) => (
              <button key={id} type="button" aria-pressed={tab === id} onClick={() => setTab(id)} className="rounded-full border px-5 py-2 font-semibold"
                style={{ color: tab === id ? '#fff' : 'var(--muted)', background: tab === id ? 'linear-gradient(135deg,#3b7bff,#2455e8)' : 'var(--glass)', borderColor: tab === id ? 'transparent' : 'var(--glass-b)' }}>{label}</button>
            ))}
          </div>
          <button className="btn-glass !px-5 !py-2 !text-[.85rem]" onClick={logout}>تسجيل خروج</button>
        </div>
        {tab === 'news' && <NewsTab k={key} onAuthFail={logout} />}
        {tab === 'tournaments' && <TournamentsTab k={key} onAuthFail={logout} />}
        {tab === 'regs' && <RegsTab k={key} onAuthFail={logout} />}
      </div>
    </section>
  );
}
