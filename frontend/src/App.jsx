import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000/api/tasks/";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f7f7f8;
    --surface: #ffffff;
    --surface2: #f3f3f5;
    --surface3: #eaeaed;
    --border: #e4e4e8;
    --border2: #d0d0d6;
    --text: #111118;
    --text2: #5a5a72;
    --text3: #9494aa;
    --blue: #4f6ef7;
    --blue-bg: #eef1fe;
    --blue-text: #2d47c9;
    --green: #22c55e;
    --green-bg: #f0fdf4;
    --green-text: #16803c;
    --amber-bg: #fefce8;
    --amber-text: #92600a;
    --violet: #7c3aed;
    --violet-bg: #f5f3ff;
    --violet-text: #5b21b6;
    --red-bg: #fff1f2;
    --red-text: #be123c;
    --sidebar-w: 280px;
    --topbar-h: 56px;
  }

  body {
    font-family: 'Inter', -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  }

  /* ── SHELL ── */
  .shell { display: flex; min-height: 100vh; }

  /* ── SIDEBAR ── */
  .sidebar {
    width: var(--sidebar-w);
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 20;
  }

  .sidebar-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 20px;
    height: var(--topbar-h);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .brand-icon {
    width: 30px; height: 30px;
    background: var(--blue);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .brand-name { font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: -0.02em; }
  .brand-sub  { font-size: 11px; color: var(--text3); margin-top: 1px; }

  /* ── SIDEBAR NAV ── */
  .sidebar-nav { padding: 12px 10px; flex: 1; overflow-y: auto; }

  .nav-section-label {
    font-size: 11px; font-weight: 600; color: var(--text3);
    letter-spacing: 0.07em; text-transform: uppercase;
    padding: 6px 10px 4px;
  }

  .nav-item {
    display: flex; align-items: center; gap: 9px;
    padding: 7px 10px; border-radius: 7px;
    font-size: 13.5px; font-weight: 500; color: var(--text2);
    cursor: pointer; transition: background 0.12s, color 0.12s;
    margin-bottom: 1px;
  }

  .nav-item:hover { background: var(--surface2); color: var(--text); }
  .nav-item.active { background: var(--blue-bg); color: var(--blue-text); }

  .nav-item svg { flex-shrink: 0; opacity: 0.7; }
  .nav-item.active svg { opacity: 1; }

  .nav-count {
    margin-left: auto;
    font-size: 11px; font-weight: 600;
    background: var(--surface2); color: var(--text3);
    border-radius: 99px; padding: 1px 7px;
  }

  .nav-item.active .nav-count { background: #dce4fd; color: var(--blue-text); }

  /* ── SIDEBAR STATS ── */
  .sidebar-stats {
    margin: 8px 10px;
    background: var(--surface2);
    border-radius: 10px;
    padding: 14px;
  }

  .stat-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .stat-row:last-child { margin-bottom: 0; }

  .stat-label { font-size: 12px; color: var(--text3); }

  .stat-val { font-size: 13px; font-weight: 600; color: var(--text); }

  .progress-track {
    height: 4px; background: var(--surface3); border-radius: 99px; overflow: hidden; margin-bottom: 4px;
  }

  .progress-fill {
    height: 100%; background: var(--blue); border-radius: 99px;
    transition: width 0.4s ease;
  }

  .progress-fill.full { background: var(--green); }

  .stat-sub { font-size: 11px; color: var(--text3); }

  /* ── SIDEBAR BOTTOM ── */
  .sidebar-bottom {
    padding: 14px 10px;
    border-top: 1px solid var(--border);
  }

  .today-pill {
    display: flex; align-items: center; gap: 8px;
    padding: 9px 12px; border-radius: 8px;
    background: var(--surface2);
  }

  .today-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--blue); flex-shrink: 0; }
  .today-text { font-size: 12px; font-weight: 500; color: var(--text2); }
  .today-date { font-size: 11px; color: var(--text3); margin-top: 1px; }

  /* ── MAIN ── */
  .main-wrap {
    margin-left: var(--sidebar-w);
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* ── TOPBAR ── */
  .topbar {
    height: var(--topbar-h);
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 28px;
    position: sticky; top: 0; z-index: 10;
  }

  .topbar-title { font-size: 16px; font-weight: 700; color: var(--text); letter-spacing: -0.02em; }

  .topbar-right { display: flex; align-items: center; gap: 10px; }

  .topbar-date-chip {
    font-size: 12px; font-weight: 500; color: var(--text2);
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: 7px; padding: 4px 10px;
    display: flex; align-items: center; gap: 6px;
  }

  /* ── CONTENT ── */
  .content { flex: 1; display: flex; gap: 0; }

  .task-col {
    flex: 1; padding: 24px 28px;
    display: flex; flex-direction: column; gap: 28px;
    min-width: 0;
  }

  /* ── FORM PANEL ── */
  .form-panel {
    width: 320px;
    flex-shrink: 0;
    border-left: 1px solid var(--border);
    background: var(--surface);
    padding: 24px 20px;
    position: sticky;
    top: var(--topbar-h);
    max-height: calc(100vh - var(--topbar-h));
    overflow-y: auto;
  }

  .form-panel-title {
    font-size: 13px; font-weight: 700; color: var(--text);
    letter-spacing: -0.01em; margin-bottom: 18px;
    display: flex; align-items: center; gap: 8px;
  }

  .form-panel-title .mode-chip {
    font-size: 11px; font-weight: 600;
    background: var(--violet-bg); color: var(--violet-text);
    border-radius: 5px; padding: 2px 7px;
  }

  .field-label {
    display: block; font-size: 11.5px; font-weight: 600; color: var(--text3);
    text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;
  }

  .field {
    width: 100%; height: 38px; padding: 0 11px;
    border: 1px solid var(--border2); border-radius: 8px;
    font-family: inherit; font-size: 13.5px; color: var(--text);
    background: var(--surface); outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    -webkit-appearance: none; appearance: none;
  }

  .field:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(79,110,247,0.12); }
  .field::placeholder { color: var(--text3); }

  .fgroup { margin-bottom: 14px; }

  .time-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

  .time-label-row {
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 6px;
  }

  .divider { height: 1px; background: var(--border); margin: 18px 0; }

  .btn-add {
    width: 100%; height: 40px;
    background: var(--blue); color: #fff;
    border: none; border-radius: 9px;
    font-family: inherit; font-size: 13.5px; font-weight: 600;
    cursor: pointer; letter-spacing: -0.01em;
    display: flex; align-items: center; justify-content: center; gap: 7px;
    transition: background 0.15s, transform 0.1s;
  }

  .btn-add:hover { background: #3d5ce6; }
  .btn-add:active { transform: scale(0.99); }
  .btn-add.update { background: var(--violet); }
  .btn-add.update:hover { background: #6a2ccc; }

  .btn-cancel {
    width: 100%; height: 36px; margin-top: 8px;
    background: transparent; color: var(--text2);
    border: 1px solid var(--border); border-radius: 9px;
    font-family: inherit; font-size: 13px; cursor: pointer;
    transition: background 0.12s;
  }

  .btn-cancel:hover { background: var(--surface2); }

  /* ── SECTION HEADER ── */
  .section-head {
    display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
  }

  .section-head-label {
    font-size: 13px; font-weight: 700; color: var(--text); letter-spacing: -0.01em;
  }

  .section-head-sub { font-size: 12px; color: var(--text3); }

  .pill {
    font-size: 11px; font-weight: 600;
    border-radius: 99px; padding: 2px 9px;
  }

  .pill-blue { background: var(--blue-bg); color: var(--blue-text); }
  .pill-gray { background: var(--surface3); color: var(--text3); }

  /* ── PROGRESS BAR (inline) ── */
  .inline-progress {
    margin-left: auto; display: flex; align-items: center; gap: 8px;
  }

  .inline-track {
    width: 64px; height: 4px; background: var(--surface3);
    border-radius: 99px; overflow: hidden;
  }

  .inline-fill { height: 100%; border-radius: 99px; background: var(--blue); transition: width 0.4s; }
  .inline-fill.done { background: var(--green); }

  .inline-pct { font-size: 11px; font-weight: 600; color: var(--text3); min-width: 28px; text-align: right; }

  /* ── TASK CARD ── */
  .task-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
  }

  /* ── TASK ROW ── */
  .task-row {
    display: flex; align-items: center; gap: 12px;
    padding: 11px 16px;
    border-bottom: 1px solid var(--border);
    transition: background 0.1s;
    position: relative;
  }

  .task-row:last-child { border-bottom: none; }
  .task-row:hover { background: #fafafb; }
  .task-row.is-editing { background: var(--violet-bg); border-left: 3px solid var(--violet); }
  .task-row.is-done { opacity: 0.55; }

  /* ── CHECKBOX ── */
  .cb {
    width: 19px; height: 19px; border-radius: 50%;
    border: 1.5px solid var(--border2);
    background: transparent; cursor: pointer; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s; padding: 0;
  }

  .cb:hover { border-color: var(--green); background: var(--green-bg); }
  .cb.checked { border-color: var(--green); background: var(--green); }
  .cb.checked svg { display: block; }
  .cb:not(.checked) svg { display: none; }

  /* ── TASK BODY ── */
  .task-body { flex: 1; min-width: 0; }

  .task-title {
    font-size: 13.5px; font-weight: 500; color: var(--text);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .task-row.is-done .task-title { text-decoration: line-through; color: var(--text3); }

  .task-meta {
    display: flex; align-items: center; gap: 8px; margin-top: 3px; flex-wrap: wrap;
  }

  .meta-time {
    font-size: 11.5px; color: var(--text3);
    display: flex; align-items: center; gap: 3px;
  }

  .date-chip {
    font-size: 11px; font-weight: 500;
    background: var(--violet-bg); color: var(--violet-text);
    border-radius: 5px; padding: 1px 6px;
  }

  /* ── STATUS BADGE ── */
  .status-badge {
    font-size: 11px; font-weight: 600; border-radius: 6px; padding: 2px 8px; flex-shrink: 0;
  }

  .status-badge.done    { background: var(--green-bg);  color: var(--green-text); }
  .status-badge.pending { background: var(--amber-bg);  color: var(--amber-text); }

  /* ── EDIT BTN ── */
  .btn-edit {
    height: 28px; padding: 0 10px; flex-shrink: 0;
    background: transparent; border: 1px solid var(--border); border-radius: 7px;
    font-family: inherit; font-size: 12px; font-weight: 500; color: var(--text3);
    cursor: pointer; transition: all 0.12s;
  }

  .btn-edit:hover { background: var(--blue-bg); color: var(--blue-text); border-color: #b5c4fb; }
  .btn-edit.active { background: var(--violet-bg); color: var(--violet-text); border-color: #c4b5fd; }

  /* ── EMPTY STATE ── */
  .empty-state {
    padding: 32px 16px; text-align: center;
  }

  .empty-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: var(--surface2); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 10px;
  }

  .empty-text { font-size: 13px; color: var(--text3); font-weight: 500; }
  .empty-sub  { font-size: 12px; color: var(--text3); margin-top: 3px; opacity: 0.7; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .sidebar { display: none; }
    .main-wrap { margin-left: 0; }
    .form-panel { width: 100%; border-left: none; border-top: 1px solid var(--border); position: static; max-height: none; }
    .content { flex-direction: column; }
  }

  input[type="date"]::-webkit-calendar-picker-indicator,
  input[type="time"]::-webkit-calendar-picker-indicator { opacity: 0.4; cursor: pointer; }

  /* ── TOASTS ── */
  .toast-stack {
    position: fixed; bottom: 24px; right: 24px;
    display: flex; flex-direction: column; gap: 8px;
    z-index: 1000; pointer-events: none;
  }

  .toast {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 14px;
    background: #1a1a2e; color: #fff;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.08);
    font-size: 13px; font-weight: 500;
    box-shadow: 0 4px 20px rgba(0,0,0,0.18);
    pointer-events: auto;
    animation: toast-in 0.22s cubic-bezier(0.34,1.56,0.64,1) forwards;
    max-width: 320px;
    min-width: 220px;
  }

  .toast.leaving {
    animation: toast-out 0.18s ease forwards;
  }

  @keyframes toast-in {
    from { opacity: 0; transform: translateY(12px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes toast-out {
    from { opacity: 1; transform: translateY(0) scale(1); }
    to   { opacity: 0; transform: translateY(6px) scale(0.97); }
  }

  .toast-icon {
    width: 22px; height: 22px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 11px;
  }

  .toast-icon.success { background: var(--green);  }
  .toast-icon.update  { background: var(--violet); }
  .toast-icon.done    { background: var(--green);  }
  .toast-icon.undone  { background: #f59e0b; }
  .toast-icon.cancel  { background: #6b7280; }

  .toast-msg { flex: 1; line-height: 1.35; }
  .toast-msg strong { font-weight: 600; }
`;

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <polyline points="1.5,5.5 4.2,8.2 9.5,2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1"/>
    <line x1="5.5" y1="3" x2="5.5" y2="5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <line x1="5.5" y1="5.5" x2="7.4" y2="6.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const InboxIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="1.5" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M1.5 9h3l1.5 2h3l1.5-2H13.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
);

const CalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="1.5" y="2.5" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="1.5" y1="6" x2="13.5" y2="6" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="5" y1="1" x2="5" y2="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="10" y1="1" x2="10" y2="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const GridIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="1.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="8.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="1.5" y="8.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="8.5" y="8.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <line x1="7" y1="2" x2="7" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="2" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

function fmtTime(t) {
  if (!t) return null;
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

function fmtDate(d) {
  if (!d) return null;
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

let _tid = 0;
function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = (msg, type = "success") => {
    const id = ++_tid;
    setToasts(p => [...p, { id, msg, type, leaving: false }]);
    setTimeout(() => {
      setToasts(p => p.map(t => t.id === id ? { ...t, leaving: true } : t));
      setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 200);
    }, 2800);
  };
  const ToastStack = () => (
    <div className="toast-stack">
      {toasts.map(t => (
        <div key={t.id} className={`toast${t.leaving ? " leaving" : ""}`}>
          <div className={`toast-icon ${t.type}`}>
            {t.type === "undone" || t.type === "cancel"
              ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><line x1="2" y1="2" x2="8" y2="8" stroke="white" strokeWidth="1.6" strokeLinecap="round"/><line x1="8" y1="2" x2="2" y2="8" stroke="white" strokeWidth="1.6" strokeLinecap="round"/></svg>
              : <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polyline points="1.5,5 4,7.5 8.5,2" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            }
          </div>
          <span className="toast-msg" dangerouslySetInnerHTML={{ __html: t.msg }} />
        </div>
      ))}
    </div>
  );
  return { show, ToastStack };
}

export default function App() {
  const [tasks, setTasks]   = useState([]);
  const [form, setForm]     = useState({ title: "", planned_date: "", start_time: "", end_time: "" });
  const [editId, setEditId] = useState(null);

  const today     = new Date().toISOString().split("T")[0];
  const todayFull = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const fetch_ = () => fetch(API).then(r => r.json()).then(setTasks).catch(() => {});
  useEffect(() => { fetch_(); }, []);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    fetch(editId ? `${API}${editId}/` : API, {
      method: editId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => { fetch_(); setForm({ title: "", planned_date: "", start_time: "", end_time: "" }); setEditId(null); });
  };

  const onEdit = task => {
    setForm({ title: task.title, planned_date: task.planned_date, start_time: task.start_time || "", end_time: task.end_time || "" });
    setEditId(task.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onCancel = () => { setForm({ title: "", planned_date: "", start_time: "", end_time: "" }); setEditId(null); };

  const onToggle = task => {
    fetch(`${API}${task.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    }).then(fetch_);
  };

  const todayTasks = tasks.filter(t => t.planned_date === today);
  const otherTasks = tasks.filter(t => t.planned_date !== today).sort((a, b) => a.planned_date.localeCompare(b.planned_date));
  const doneToday  = todayTasks.filter(t => t.completed).length;
  const todayPct   = todayTasks.length ? Math.round((doneToday / todayTasks.length) * 100) : 0;
  const totalDone  = tasks.filter(t => t.completed).length;

  return (
    <>
      <style>{css}</style>
      <div className="shell">

        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="brand-icon">
              <GridIcon style={{ color: "#fff" }} />
            </div>
            <div>
              <div className="brand-name">Taskflow</div>
              <div className="brand-sub">Personal workspace</div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section-label">Views</div>
            <div className="nav-item active">
              <InboxIcon /> My Tasks <span className="nav-count">{tasks.length}</span>
            </div>
            <div className="nav-item">
              <CalIcon /> Today <span className="nav-count">{todayTasks.length}</span>
            </div>

            <div style={{ marginTop: 16 }}>
              <div className="nav-section-label">Overview</div>
            </div>

            <div className="sidebar-stats">
              <div className="stat-row">
                <span className="stat-label">Today's progress</span>
                <span className="stat-val">{doneToday}/{todayTasks.length}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${todayPct}%` }} />
              </div>
              <div className="stat-sub">{todayPct}% complete</div>

              <div style={{ height: 12 }} />

              <div className="stat-row">
                <span className="stat-label">All tasks</span>
                <span className="stat-val">{totalDone}/{tasks.length} done</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Upcoming</span>
                <span className="stat-val">{otherTasks.length}</span>
              </div>
            </div>
          </nav>

          <div className="sidebar-bottom">
            <div className="today-pill">
              <div className="today-dot" />
              <div>
                <div className="today-text">Today</div>
                <div className="today-date">{todayFull}</div>
              </div>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="main-wrap">

          {/* TOPBAR */}
          <div className="topbar">
            <span className="topbar-title">My Tasks</span>
            <div className="topbar-right">
              <div className="topbar-date-chip">
                <CalIcon />
                {todayFull}
              </div>
            </div>
          </div>

          <div className="content">

            {/* ── TASK COLUMN ── */}
            <div className="task-col">

              {/* TODAY SECTION */}
              <div>
                <div className="section-head">
                  <span className="section-head-label">Today</span>
                  <span className="pill pill-blue">{todayTasks.length}</span>
                  <span className="section-head-sub">{doneToday} done</span>
                  <div className="inline-progress">
                    <div className="inline-track">
                      <div className={`inline-fill${todayPct === 100 ? " done" : ""}`} style={{ width: `${todayPct}%` }} />
                    </div>
                    <span className="inline-pct">{todayPct}%</span>
                  </div>
                </div>

                <div className="task-card">
                  {todayTasks.length === 0
                    ? <EmptyState text="No tasks today" sub="Add one using the form →" icon={<InboxIcon />} />
                    : todayTasks.map(t => (
                      <TaskRow key={t.id} task={t} isEditing={editId === t.id} onEdit={onEdit} onToggle={onToggle} showDate={false} />
                    ))}
                </div>
              </div>

              {/* UPCOMING SECTION */}
              <div>
                <div className="section-head">
                  <span className="section-head-label">Upcoming</span>
                  <span className="pill pill-gray">{otherTasks.length}</span>
                </div>

                <div className="task-card">
                  {otherTasks.length === 0
                    ? <EmptyState text="No upcoming tasks" sub="Schedule tasks for future dates" icon={<CalIcon />} />
                    : otherTasks.map(t => (
                      <TaskRow key={t.id} task={t} isEditing={editId === t.id} onEdit={onEdit} onToggle={onToggle} showDate={true} />
                    ))}
                </div>
              </div>

            </div>

            {/* ── FORM PANEL ── */}
            <div className="form-panel">
              <div className="form-panel-title">
                {editId ? "Edit task" : "New task"}
                {editId && <span className="mode-chip">editing</span>}
              </div>

              <form onSubmit={onSubmit}>
                <div className="fgroup">
                  <label className="field-label">Title</label>
                  <input className="field" name="title" value={form.title} onChange={onChange} placeholder="What needs doing?" required />
                </div>

                <div className="fgroup">
                  <label className="field-label">Date</label>
                  <input className="field" type="date" name="planned_date" value={form.planned_date} onChange={onChange} required />
                </div>

                <div className="fgroup">
                  <div className="time-label-row">
                    <label className="field-label" style={{ marginBottom: 0 }}>Start</label>
                    <label className="field-label" style={{ marginBottom: 0 }}>End</label>
                  </div>
                  <div className="time-row">
                    <input className="field" type="time" name="start_time" value={form.start_time} onChange={onChange} />
                    <input className="field" type="time" name="end_time" value={form.end_time} onChange={onChange} />
                  </div>
                </div>

                <div className="divider" />

                <button type="submit" className={`btn-add${editId ? " update" : ""}`}>
                  <PlusIcon />
                  {editId ? "Update task" : "Add task"}
                </button>

                {editId && (
                  <button type="button" className="btn-cancel" onClick={onCancel}>
                    Discard changes
                  </button>
                )}
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

function TaskRow({ task, isEditing, onEdit, onToggle, showDate }) {
  const start = fmtTime(task.start_time);
  const end   = fmtTime(task.end_time);
  const time  = start && end ? `${start} – ${end}` : start || end || null;
  const date  = fmtDate(task.planned_date);

  return (
    <div className={`task-row${task.completed ? " is-done" : ""}${isEditing ? " is-editing" : ""}`}>

      <button className={`cb${task.completed ? " checked" : ""}`} onClick={() => onToggle(task)} title={task.completed ? "Unmark" : "Mark done"}>
        <CheckIcon />
      </button>

      <div className="task-body">
        <div className="task-title">{task.title}</div>
        {(time || (showDate && date)) && (
          <div className="task-meta">
            {time && <span className="meta-time"><ClockIcon />{time}</span>}
            {showDate && date && <span className="date-chip">{date}</span>}
          </div>
        )}
      </div>

      <span className={`status-badge ${task.completed ? "done" : "pending"}`}>
        {task.completed ? "Done" : "Pending"}
      </span>

      <button className={`btn-edit${isEditing ? " active" : ""}`} onClick={() => onEdit(task)}>
        Edit
      </button>
    </div>
  );
}

function EmptyState({ text, sub, icon }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <div className="empty-text">{text}</div>
      <div className="empty-sub">{sub}</div>
    </div>
  );
}