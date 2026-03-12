const state = { ratQuery: '', ratStatus: 'all', rosterView: 'cards' };

const stats = [
  ['Total Rats', 124], ['Bucks', 42], ['Does', 51], ['Pups', 31], ['Retired Breeders', 12], ['Available', 17],
  ['Reserved', 14], ['Pregnant Does', 5], ['Litters in Nest', 4], ['Litters Weaned', 22], ['Observation Hold', 3], ['Medical Attention', 2],
  ['Upcoming Pairings', 6], ['Due Dates Soon', 4], ["Today's Tasks", 11], ['Low-Stock Alerts', 3], ['Feed/Water Reminders', 5], ['Cage Cleaning', 7],
  ['Weight Alerts', 2], ['Age Milestones', 9], ['Birthdays', 3], ['Near Breeding Age', 8], ['Near Retirement', 4], ['Ready for Homing', 10],
  ['Memorial Notices', 1], ['Adoption Income', '$2,960'], ['Supply Expenses', '$1,120'], ['Vet Costs', '$480'], ['Profit/Loss', '+$1,360'],
];

const rats = [
  { name: 'Nova', call: 'Novie', reg: 'Ratticly Nova Bloom', sex: 'Doe', variety: 'Rex Dumbo', age: '11m', dob: '2025-04-12', status: 'Pregnant', breed: 'Eligible', cage: 'Maternity-2', weight: '391g', health: 'Watchlist', availability: 'Holdback', line: 'Velvet Aurora', img: 'https://images.unsplash.com/photo-1608152579902-4f9f2e4f8090?auto=format&fit=crop&w=900&q=80' },
  { name: 'Atlas', call: 'At', reg: 'Ratticly Atlas Crest', sex: 'Buck', variety: 'Standard Top Ear', age: '1y', dob: '2025-02-10', status: 'Active Breeder', breed: 'Eligible', cage: 'Buck-Alpha', weight: '522g', health: 'Clear', availability: 'Not listed', line: 'Crestline', img: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=900&q=80' },
  { name: 'Mochi', call: 'Moch', reg: 'Ratticly Mochi Haze', sex: 'Doe', variety: 'Velveteen Dumbo', age: '6m', dob: '2025-09-06', status: 'Holdback', breed: 'Pending', cage: 'Growout-F2', weight: '287g', health: 'Clear', availability: 'Keeper candidate', line: 'Mintglass', img: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=900&q=80' },
];

const events = ['Tomorrow: Basil × Nova due date check', 'Today 5:00pm: Deep clean Nursery A + sanitize water bottles', 'Thu: Weigh litter LIT-2603-NEB (Day 14 milestone)', 'Fri: Reserve confirmations for 3 approved homes', 'Sat: Retirement review for Luna'];
const pregnancy = [{ name: 'Nova', pct: 82, due: 'Due in 4 days' }, { name: 'Ivy', pct: 57, due: 'Due in 9 days' }, { name: 'Peony', pct: 33, due: 'Due in 14 days' }];
const alerts = ['<span class="badge warn">Low stock</span> Lab blocks below reorder point', '<span class="badge danger">Health</span> Basil URI recheck due tomorrow', '<span class="badge warn">Expiry</span> Doxycycline expires in 18 days'];
const growth = [{ rat: 'Mochi', points: [45, 50, 57, 62, 66, 71] }, { rat: 'Clover', points: [42, 47, 53, 58, 61, 64] }, { rat: 'Basil', points: [52, 51, 50, 48, 49, 50] }];
const litterRows = [['LIT-2603-NEB', 'Atlas', 'Nova', '2026-03-01', 10, '2026-03-30', 'In Nest'], ['LIT-2602-MNT', 'Basil', 'Ivy', '2026-02-17', 11, '2026-03-17', 'Weaning'], ['LIT-2601-CRM', 'Clover', 'Luna', '2026-01-21', 9, '2026-02-20', 'Placed']];
const pairings = [{ title: 'Atlas × Mochi', score: 84, coi: '6.2%', risks: 'Gen3 repeated ancestor', goals: 'Dumbo rex temperament consistency', outcomes: 'Blue/agouti split, 62% dumbo carrier', status: 'Under Review' }, { title: 'Basil × Nova', score: 92, coi: '3.4%', risks: 'Mild respiratory line sensitivity', goals: 'Velveteen expression + maternal stability', outcomes: 'Rex 50%, velveteen carrier 75%', status: 'Approved' }];
const housing = [{ cage: 'Maternity-2', occupants: 'Nova + litter (10)', clean: 'Today 6pm', alert: 'Nesting top-up needed' }, { cage: 'Buck-Alpha', occupants: 'Atlas, Clover', clean: 'Tomorrow', alert: 'Monitor intro tension' }, { cage: 'Quarantine-1', occupants: 'Basil', clean: 'Done this morning', alert: 'Recheck after URI meds' }, { cage: 'Nursery-A', occupants: 'LIT-2602-MNT', clean: 'Tonight', alert: 'Add climbing toy set' }];
const inventory = ['Lab blocks / food — 1.2 bags on hand (reorder point 2)', 'Bedding — low stock alert (8 units left)', 'Supplements — omega drops in stock', 'Medications — doxycycline expires in 18 days', 'Nesting material — healthy stock', 'PPE gloves — 2 boxes'];
const placements = ['Waitlist: 9 approved homes', 'Deposits paid: 5 reservations confirmed', 'Pickup scheduled: Saturday 11:00 AM (2 pups)', 'Transport plan pending for out-of-state adopter'];
const finance = [{ title: 'Monthly Financial Snapshot', lines: ['Adoption income: $2,960', 'Supply expenses: $1,120', 'Vet costs: $480', 'Net: +$1,360'] }, { title: 'Trend Notes', lines: ['Medical spending up 8% this month', 'Bedding usage up 12% (winter)', 'Litter profitability avg: $420/litter'] }];

const tasks = ['Weigh litter LIT-2603-NEB', 'Sex pups from LIT-2602-MNT', 'Reorder bedding + lab blocks', 'Medication dose: Nova PM', 'Upload updated profile photos', 'Follow-up with adopter: Harper Lane', 'Deep clean nursery cage', 'Retirement review: Luna'];
const reports = ['Litter survival rate: 94%', 'Average litter size: 10.2', 'Doe productivity trend: +6% QoQ', 'Health issue frequency highest in Aurora branch', 'Inventory usage trend: bedding +12%', 'Average age at death: 27.4 months'];
const memorials = ['Willow (2023-2025) — gentle matriarch, 4 litters, legacy line: Aurora', 'Retired: Luna — recurrent postpartum stress, now pet placement plan'];
const settings = ['Theme mode: Cloudmilk / Berry / Mint / Cream / Dark', 'Custom status tags: enabled', 'Trait list customization: enabled', 'Export options: CSV / JSON / pedigree PDF', 'Permissions: owner + two staff accounts', 'Notifications: meds, due dates, low stock, rechecks'];

const $ = (s) => document.querySelector(s);
const make = (tag, html, c = '') => { const e = document.createElement(tag); if (c) e.className = c; e.innerHTML = html; return e; };

function renderStats() { const wrap = $('#stats-grid'); wrap.innerHTML = ''; stats.forEach(([l, v]) => wrap.appendChild(make('article', `<div class="label">${l}</div><div class="value">${v}</div>`, 'card stat'))); }
function renderList(id, items, html = false) {
  const ul = document.getElementById(id);
  ul.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    if (html) li.innerHTML = item;
    else li.textContent = item;
    ul.appendChild(li);
  });
}

function renderPregnancy() {
  const wrap = $('#pregnancy-rings'); wrap.innerHTML = '';
  pregnancy.forEach((p) => wrap.appendChild(make('div', `<div class="ring" style="--progress:${p.pct}%"><span>${p.pct}%</span></div><div><strong>${p.name}</strong><div class="rat-sub">${p.due}</div></div>`, 'ring-item')));
}
function renderGrowth() {
  const wrap = $('#growth-charts'); wrap.innerHTML = '';
  growth.forEach((g) => { const max = Math.max(...g.points); const bars = g.points.map((p) => `<b style="height:${Math.max(8, Math.round((p / max) * 42))}px"></b>`).join(''); wrap.appendChild(make('div', `<strong>${g.rat}</strong><div class="sparkline">${bars}</div>`, 'spark')); });
}

function getFilteredRats() {
  return rats.filter((r) => {
    const text = `${r.name} ${r.call} ${r.reg} ${r.variety} ${r.line} ${r.cage}`.toLowerCase();
    const qMatch = !state.ratQuery || text.includes(state.ratQuery);
    const sMatch = state.ratStatus === 'all' || r.status === state.ratStatus;
    return qMatch && sMatch;
  });
}

function openRatDrawer(r) {
  $('#drawer-body').innerHTML = `
    <h3>${r.name} <span class="badge">${r.status}</span></h3>
    <p class="rat-sub">${r.call} · ${r.reg}</p>
    <img src="${r.img}" alt="${r.name}" style="width:100%;border-radius:12px;aspect-ratio:4/3;object-fit:cover;"/>
    <p><strong>Sex:</strong> ${r.sex}</p><p><strong>Variety:</strong> ${r.variety}</p><p><strong>DOB:</strong> ${r.dob}</p>
    <p><strong>Breeding:</strong> ${r.breed}</p><p><strong>Cage:</strong> ${r.cage}</p><p><strong>Weight:</strong> ${r.weight}</p>
    <p><strong>Health:</strong> ${r.health}</p><p><strong>Availability:</strong> ${r.availability}</p><p><strong>Line:</strong> ${r.line}</p>
  `;
  $('#rat-drawer').classList.remove('hidden');
}

function renderRats() {
  const filterTags = ['Sex', 'Age Group', 'Variety', 'Coat Type', 'Ear Type', 'Markings', 'Color', 'Status', 'Breeding', 'Availability', 'Cage', 'Health Flag', 'Carrier Traits'];
  const fWrap = $('#filters'); fWrap.innerHTML = ''; filterTags.forEach((f) => fWrap.appendChild(make('span', f, 'filter-pill')));

  const filtered = getFilteredRats();
  const cards = $('#rat-cards'); const tBody = $('#rat-table-body'); cards.innerHTML = ''; tBody.innerHTML = '';

  filtered.forEach((r) => {
    const card = make('article', `<img src="${r.img}" alt="${r.name}"/><div class="rat-head"><h3>${r.name}</h3><span class="badge">${r.status}</span></div><p class="rat-sub">${r.call} • ${r.reg}</p><p class="rat-sub">${r.sex} • ${r.variety} • ${r.age} • DOB ${r.dob}</p><p class="rat-sub">Cage ${r.cage} • ${r.weight} • ${r.line}</p><div class="rat-tags"><span class="badge">Breeding: ${r.breed}</span><span class="badge ${r.health === 'Watchlist' ? 'warn' : 'good'}">Health: ${r.health}</span><span class="badge">${r.availability}</span></div>`, 'card rat-card');
    card.addEventListener('click', () => openRatDrawer(r)); cards.appendChild(card);
    tBody.appendChild(make('tr', `<td><button class="chip open-rat" data-name="${r.name}">${r.name}</button></td><td>${r.sex}</td><td>${r.variety}</td><td>${r.status}</td><td>${r.cage}</td><td>${r.weight}</td>`));
  });
  document.querySelectorAll('.open-rat').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); openRatDrawer(rats.find((r) => r.name === b.dataset.name)); }));
}

function renderTable() {
  const tb = $('#litter-table');
  tb.innerHTML = '';
  litterRows.forEach((r) => tb.appendChild(make('tr', r.map((c) => `<td>${c}</td>`).join(''))));
}
function renderCards() {
  const pWrap = $('#pairing-cards'); pWrap.innerHTML = '';
  pairings.forEach((p) => pWrap.appendChild(make('article', `<h3>${p.title}</h3><p><span class="badge">Status: ${p.status}</span> <span class="badge">COI ${p.coi}</span> <span class="badge">Score ${p.score}/100</span></p><p><strong>Risk flags:</strong> ${p.risks}</p><p><strong>Trait goals:</strong> ${p.goals}</p><p><strong>Predicted outcomes:</strong> ${p.outcomes}</p>`, 'card')));
  const hWrap = $('#housing-cards'); hWrap.innerHTML = '';
  housing.forEach((h) => hWrap.appendChild(make('article', `<h3>${h.cage}</h3><p class="rat-sub">Occupants: ${h.occupants}</p><p><strong>Next clean:</strong> ${h.clean}</p><p><span class="badge warn">${h.alert}</span></p>`, 'card')));
  const fWrap = $('#finance-cards'); fWrap.innerHTML = '';
  finance.forEach((f) => fWrap.appendChild(make('article', `<h3>${f.title}</h3><ul class="list">${f.lines.map((l) => `<li>${l}</li>`).join('')}</ul>`, 'card')));
  const bars = $('#finance-bars'); bars.innerHTML = '<b style="height:46px" data-label="Income"></b><b style="height:28px" data-label="Supply"></b><b style="height:20px" data-label="Vet"></b><b style="height:36px" data-label="Net"></b>';
}

function renderLineage() {
  const el = $('#lineage-tree'); el.innerHTML = '';
  el.appendChild(make('div', '<strong>Atlas</strong> ⟶ <button class="chip lineage-link" data-name="Mochi">Mochi</button> <button class="chip lineage-link" data-name="Clover">Clover</button> <button class="chip lineage-link" data-name="Luna">Luna</button><p class="rat-sub">Health overlay: mild URI sensitivity branch</p>', 'branch'));
  el.appendChild(make('div', '<strong>Nova</strong> ⟶ <button class="chip lineage-link" data-name="Basil">Basil</button> <button class="chip lineage-link" data-name="Ivy">Ivy</button><p class="rat-sub">Trait overlay: dumbo carrier concentration 62%</p>', 'branch'));
  el.appendChild(make('div', '⚠️ COI visualization: Atlas × Mochi proposal repeats ancestor in generation 3.', 'branch'));
  document.querySelectorAll('.lineage-link').forEach((btn) => btn.addEventListener('click', () => {
    const rat = rats.find((r) => r.name === btn.dataset.name);
    if (rat) openRatDrawer(rat);
    else {
      $('#modal-copy').textContent = `${btn.dataset.name} profile is referenced in lineage and should be added to roster records next.`;
      $('#quick-add-modal').showModal();
    }
  }));
}

function wireTabs() {
  const navItems = document.querySelectorAll('.nav-item'); const tabs = document.querySelectorAll('.tab-content');
  navItems.forEach((btn) => btn.addEventListener('click', () => {
    navItems.forEach((b) => b.classList.remove('active')); tabs.forEach((tab) => tab.classList.remove('active'));
    btn.classList.add('active'); document.getElementById(btn.dataset.tab).classList.add('active');
  }));
}
function wireThemes() {
  const saved = localStorage.getItem('ratticly-theme'); if (saved) { document.body.dataset.theme = saved; $('#theme-switcher').value = saved; }
  $('#theme-switcher').addEventListener('change', (e) => { document.body.dataset.theme = e.target.value; localStorage.setItem('ratticly-theme', e.target.value); });
}
function wireRosterControls() {
  $('#rat-search').addEventListener('input', (e) => { state.ratQuery = e.target.value.trim().toLowerCase(); renderRats(); });
  $('#rat-status-filter').addEventListener('change', (e) => { state.ratStatus = e.target.value; renderRats(); });
  $('#global-search').addEventListener('input', (e) => { state.ratQuery = e.target.value.trim().toLowerCase(); $('#rat-search').value = e.target.value; renderRats(); });
  $('#view-toggle').addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return; state.rosterView = e.target.dataset.view;
    document.querySelectorAll('#view-toggle button').forEach((b) => b.classList.toggle('active', b.dataset.view === state.rosterView));
    $('#rat-cards').classList.toggle('hidden', state.rosterView === 'table'); $('#rat-table-wrap').classList.toggle('hidden', state.rosterView !== 'table');
  });
}
function wireQuickAdd() {
  const open = (label) => { $('#modal-copy').textContent = `${label} opens a focused form workflow in the next build step (validation, timeline event logging, and linked records).`; $('#quick-add-modal').showModal(); };
  $('#open-quick-add').addEventListener('click', () => open('Quick Add'));
  document.querySelectorAll('.qa-btn').forEach((b) => b.addEventListener('click', () => open(b.textContent)));
  $('#modal-close').addEventListener('click', () => $('#quick-add-modal').close());
  $('#modal-primary').addEventListener('click', () => $('#quick-add-modal').close());
}
function wireDrawer() { $('#drawer-close').addEventListener('click', () => $('#rat-drawer').classList.add('hidden')); }

function init() {
  renderStats(); renderList('events-list', events); renderPregnancy(); renderList('alerts-list', alerts, true); renderGrowth();
  renderRats(); renderTable(); renderCards(); renderLineage();
  renderList('health-list', ['URI episode log: Basil (mild), started 2026-03-04', 'Medication due: Nova PM doxycycline dose', 'Vet follow-up: Quarantine recheck tomorrow 10:00', 'Tumor watch: none active this week', 'Postpartum observation: Ivy day 3 stable']);
  renderList('inventory-list', inventory); renderList('placements-list', placements); renderList('task-list', tasks);
  renderList('reports-list', reports); renderList('memorials-list', memorials); renderList('settings-list', settings);
  wireTabs(); wireThemes(); wireRosterControls(); wireQuickAdd(); wireDrawer();
}

init();
