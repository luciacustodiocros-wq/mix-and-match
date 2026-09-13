:root {
  --putty: #eee7d8;
  --paper: #f8f4ea;
  --ink: #292220;
  --ink-soft: #6b6058;
  --line: #d9cfbb;
  --wine: #7c2e3b;
  --wine-deep: #5e2129;
  --sage: #75845f;
  --sage-soft: #e2e6d6;
  --amber: #b9843f;
  --radius-s: 3px;
  --radius-m: 6px;
  font-size: 16px;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: var(--putty);
  color: var(--ink);
  font-family: "Work Sans", -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  font-family: "Fraunces", Georgia, serif;
  font-weight: 500;
  letter-spacing: -0.01em;
  margin: 0;
}

a { color: var(--wine); }

button {
  font-family: inherit;
}

/* ---------- layout shell ---------- */

.app {
  display: grid;
  grid-template-columns: 232px 1fr;
  min-height: 100vh;
}

.rail {
  background: var(--ink);
  color: var(--putty);
  padding: 28px 22px 22px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  position: sticky;
  top: 0;
  height: 100vh;
}

.rail-top {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mark {
  font-family: "Fraunces", serif;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.1;
}

.mark-sub {
  font-size: 0.8rem;
  color: #b8ac9c;
}

.rail-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.rail-btn {
  text-align: left;
  background: none;
  border: none;
  color: #cfc4b3;
  font-size: 0.92rem;
  padding: 10px 10px;
  border-radius: var(--radius-s);
  cursor: pointer;
  border-left: 2px solid transparent;
  transition: background 0.15s ease, color 0.15s ease;
}

.rail-btn:hover {
  background: rgba(255,255,255,0.06);
  color: var(--putty);
}

.rail-btn.is-active {
  color: var(--putty);
  border-left: 2px solid var(--amber);
  background: rgba(255,255,255,0.05);
  font-weight: 500;
}

.rail-stats {
  margin-top: auto;
  border-top: 1px solid rgba(255,255,255,0.14);
  padding-top: 16px;
  font-size: 0.78rem;
  color: #a89c8c;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rail-stats b {
  color: var(--putty);
  font-weight: 500;
}

.stage {
  padding: 44px 56px 80px;
  max-width: 1100px;
}

.view-head {
  margin-bottom: 30px;
  max-width: 640px;
}

.view-head h1 {
  font-size: 2.1rem;
  margin-bottom: 8px;
}

.view-head p {
  color: var(--ink-soft);
  font-size: 0.98rem;
  line-height: 1.5;
  margin: 0;
}

/* ---------- explorar: closet groups ---------- */

.group-block {
  margin-bottom: 40px;
}

.group-title {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 14px;
  border-bottom: 1px solid var(--line);
  padding-bottom: 8px;
}

.group-title h2 {
  font-size: 1.2rem;
}

.group-title .count {
  color: var(--ink-soft);
  font-size: 0.82rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(148px, 1fr));
  gap: 14px;
}

.item-card {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--radius-m);
  overflow: hidden;
  cursor: default;
  transition: border-color 0.15s ease, transform 0.15s ease;
}

.item-card.is-clickable { cursor: pointer; }
.item-card.is-clickable:hover {
  border-color: var(--wine);
}

.item-photo {
  aspect-ratio: 3/4;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.item-photo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
}

.item-photo.no-photo {
  background: var(--sage-soft);
  color: var(--sage);
  font-size: 0.72rem;
  text-align: center;
  padding: 10px;
  line-height: 1.4;
}

.item-label {
  padding: 8px 10px 10px;
  font-size: 0.84rem;
  line-height: 1.3;
}

/* ---------- combinar ---------- */

.combinar-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 32px;
  align-items: start;
}

.picker {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pick-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--radius-m);
  padding: 8px 10px;
  cursor: pointer;
  font-size: 0.86rem;
}

.pick-btn img {
  width: 34px;
  height: 44px;
  object-fit: contain;
  background: #fff;
  mix-blend-mode: multiply;
  flex: none;
}

.pick-swatch {
  width: 34px;
  height: 44px;
  flex: none;
  background: var(--sage-soft);
  border-radius: var(--radius-s);
}

.pick-btn.is-active {
  border-color: var(--wine);
  background: #fbeeee;
}

.empty-hint {
  color: var(--ink-soft);
  font-size: 0.92rem;
}

.combo-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
}

.combo-header img {
  width: 70px;
  height: 92px;
  object-fit: contain;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-s);
  mix-blend-mode: multiply;
}

.combo-note {
  background: var(--sage-soft);
  border-left: 3px solid var(--sage);
  padding: 12px 14px;
  font-size: 0.86rem;
  line-height: 1.5;
  border-radius: 0 var(--radius-s) var(--radius-s) 0;
  margin-bottom: 24px;
  max-width: 560px;
}

.match-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

.match-card {
  border: 1px solid var(--line);
  border-radius: var(--radius-m);
  background: var(--paper);
  padding: 10px;
  font-size: 0.82rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.match-card.is-verified {
  border-color: var(--sage);
  background: var(--sage-soft);
}

.match-card.is-custom {
  border-color: var(--amber);
}

.match-check {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid var(--line);
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: #fff;
}

.match-card.is-verified .match-check { background: var(--sage); border-color: var(--sage); }
.match-card.is-custom .match-check { background: var(--amber); border-color: var(--amber); }

.legend {
  display: flex;
  gap: 18px;
  font-size: 0.78rem;
  color: var(--ink-soft);
  margin: 18px 0 22px;
}

.legend span { display: flex; align-items: center; gap: 6px; }
.legend .dot { width: 10px; height: 10px; border-radius: 50%; }
.legend .dot.verif { background: var(--sage); }
.legend .dot.custom { background: var(--amber); }

/* ---------- matriz ---------- */

.matrix-wrap {
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: var(--radius-m);
  background: var(--paper);
}

table.matrix {
  border-collapse: collapse;
  font-size: 0.78rem;
  min-width: 720px;
  width: 100%;
}

table.matrix th, table.matrix td {
  border: 1px solid var(--line);
  padding: 7px 8px;
  text-align: center;
}

table.matrix thead th {
  background: var(--ink);
  color: var(--putty);
  font-weight: 500;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  padding: 10px 6px;
  font-size: 0.74rem;
}

table.matrix thead th:first-child {
  writing-mode: horizontal-tb;
  transform: none;
  text-align: left;
  background: var(--ink);
}

table.matrix tbody th {
  text-align: left;
  background: var(--paper);
  font-weight: 500;
  position: sticky;
  left: 0;
  white-space: nowrap;
}

table.matrix td.yes { color: var(--sage); font-weight: 600; }
table.matrix td.custom { color: var(--amber); font-weight: 600; }
table.matrix td.no { color: var(--line); }

/* ---------- aÃ±adir ---------- */

.add-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 420px;
  margin-bottom: 40px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.86rem;
}

.field span {
  color: var(--ink-soft);
}

.field input[type="text"],
.field select {
  font-family: inherit;
  font-size: 0.95rem;
  padding: 9px 10px;
  border: 1px solid var(--line);
  border-radius: var(--radius-s);
  background: var(--paper);
  color: var(--ink);
}

.field input[type="file"] {
  font-size: 0.85rem;
}

.field-preview img {
  width: 90px;
  height: 118px;
  object-fit: contain;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-s);
  mix-blend-mode: multiply;
}

.btn-primary {
  align-self: flex-start;
  background: var(--wine);
  color: #fff;
  border: none;
  padding: 11px 20px;
  border-radius: var(--radius-s);
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s ease;
}

.btn-primary:hover { background: var(--wine-deep); }

.added-list h2 {
  font-size: 1rem;
  margin-bottom: 12px;
}

/* ---------- responsive ---------- */

@media (max-width: 860px) {
  .app { grid-template-columns: 1fr; }
  .rail {
    position: static;
    height: auto;
    flex-direction: row;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
    padding: 16px 20px;
  }
  .rail-nav { flex-direction: row; flex-wrap: wrap; }
  .rail-stats { display: none; }
  .stage { padding: 28px 20px 60px; }
  .combinar-layout { grid-template-columns: 1fr; }
  .picker { flex-direction: row; flex-wrap: wrap; }
  .pick-btn { flex: 1 1 140px; }
}
