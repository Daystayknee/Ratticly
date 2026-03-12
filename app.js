const STORAGE_KEY = 'ratticly-store-v1';
const state = { ratQuery: '', ratStatus: 'all', rosterView: 'cards', currentRatId: null, currentProfileTab: 'Overview' };

const seed = {
  rats: [
    { id:'r1', name:'Nova', call:'Novie', reg:'Ratticly Nova Bloom', sex:'Doe', variety:'Rex Dumbo', dob:'2025-04-12', status:'Pregnant', breed:'Eligible', cage:'Maternity-2', weight:391, health:'Watchlist', availability:'Holdback', line:'Velvet Aurora', traits:['dumbo','rex'], carriers:['mink'], sireId:'r2', damId:null, temperament:'Sweet, human-social', notes:'Strong maternal behavior', img:'https://images.unsplash.com/photo-1608152579902-4f9f2e4f8090?auto=format&fit=crop&w=900&q=80' },
    { id:'r2', name:'Atlas', call:'At', reg:'Ratticly Atlas Crest', sex:'Buck', variety:'Standard Top Ear', dob:'2025-02-10', status:'Active Breeder', breed:'Eligible', cage:'Buck-Alpha', weight:522, health:'Clear', availability:'Not listed', line:'Crestline', traits:['agouti'], carriers:['dumbo'], sireId:null, damId:null, temperament:'Bold, rat-social', notes:'Stable temperament', img:'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=900&q=80' },
    { id:'r3', name:'Mochi', call:'Moch', reg:'Ratticly Mochi Haze', sex:'Doe', variety:'Velveteen Dumbo', dob:'2025-09-06', status:'Holdback', breed:'Pending', cage:'Growout-F2', weight:287, health:'Clear', availability:'Keeper candidate', line:'Mintglass', traits:['dumbo','velveteen'], carriers:['rex'], sireId:'r2', damId:'r1', temperament:'Shy, gentle', notes:'Excellent coat texture', img:'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=900&q=80' }
  ],
  litters: [
    { id:'l1', code:'LIT-2603-NEB', sireId:'r2', damId:'r1', born:'2026-03-01', alive:10, status:'In Nest' }
  ],
  pairings: [
    { id:'p1', buckId:'r2', doeId:'r1', status:'Approved', goals:'Temperament stability + dumbo expression' }
  ],
  weights: [{ id:'w1', ratId:'r1', date:'2026-03-04', grams:391, notes:'Pregnancy check' }],
  healthRecords: [{ id:'h1', ratId:'r1', date:'2026-03-05', diagnosis:'Mild URI watch', treatment:'Observe + humidity support' }],
  inventory: [{ id:'i1', name:'Lab blocks', qty:1.2, reorder:2, unit:'bags' }],
  tasks: [{ id:'t1', label:'Weigh litter LIT-2603-NEB', due:'2026-03-12' }],
  reservations: [{ id:'rs1', adopter:'Harper Lane', litterId:'l1', status:'Deposit paid' }],
  events: [{ id:'e1', at:new Date().toISOString(), type:'system.seeded', summary:'Seed data loaded' }]
};

const db = {
  data: null,
  load() {
    const saved = localStorage.getItem(STORAGE_KEY);
    this.data = saved ? JSON.parse(saved) : structuredClone(seed);
    this.persist();
  },
  persist() { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data)); },
  addEvent(type, summary, entityType, entityId) {
    this.data.events.unshift({ id:`e${Date.now()}${Math.random().toString(16).slice(2,6)}`, at:new Date().toISOString(), type, summary, entityType, entityId });
    this.data.events = this.data.events.slice(0, 120);
    this.persist();
  }
};

const $ = (s) => document.querySelector(s);
const make = (tag, html, c='') => { const e = document.createElement(tag); if (c) e.className = c; e.innerHTML = html; return e; };
const byId = (collection, id) => db.data[collection].find((x) => x.id === id);
const ratName = (id) => byId('rats', id)?.name || 'Unknown';
const formatDate = (iso) => new Date(iso).toLocaleString();

function stats() {
  const rats = db.data.rats;
  return [
    ['Total Rats', rats.length], ['Bucks', rats.filter(r=>r.sex==='Buck').length], ['Does', rats.filter(r=>r.sex==='Doe').length],
    ['Pregnant', rats.filter(r=>r.status==='Pregnant').length], ['Litters', db.data.litters.length], ['Pairings', db.data.pairings.length],
    ['Health Records', db.data.healthRecords.length], ['Tasks', db.data.tasks.length], ['Inventory Alerts', db.data.inventory.filter(i=>i.qty<=i.reorder).length],
    ['Reservations', db.data.reservations.length], ['Events', db.data.events.length], ['Profile Tabs', 12]
  ];
}

function renderStats() {
  const wrap = $('#stats-grid'); wrap.innerHTML = '';
  stats().forEach(([l,v]) => wrap.appendChild(make('article', `<div class="label">${l}</div><div class="value">${v}</div>`, 'card stat')));
}
function renderEvents() {
  const ul = $('#events-list'); ul.innerHTML = '';
  db.data.events.slice(0, 12).forEach((e) => ul.appendChild(make('li', `<strong>${e.type}</strong> — ${e.summary} <span class="rat-sub">(${formatDate(e.at)})</span>`)));
}
function renderQuickAddButtons() {
  const wrap = $('#quick-add-buttons'); wrap.innerHTML = '';
  ['Rat','Litter','Pairing','Weight','Health','Inventory','Task','Reservation'].forEach((k)=> {
    const b = make('button', `Add ${k}`); b.className='qa-btn'; b.dataset.kind=k.toLowerCase(); wrap.appendChild(b);
  });
}

function filteredRats() {
  return db.data.rats.filter((r) => {
    const text = `${r.name} ${r.call} ${r.reg} ${r.variety} ${r.line} ${r.cage}`.toLowerCase();
    const q = !state.ratQuery || text.includes(state.ratQuery);
    const s = state.ratStatus === 'all' || r.status === state.ratStatus;
    return q && s;
  });
}

function renderRats() {
  const cards = $('#rat-cards'); cards.innerHTML = '';
  const tBody = $('#rat-table-body'); tBody.innerHTML = '';
  filteredRats().forEach((r) => {
    const card = make('article', `<img src="${r.img}" alt="${r.name}"/><div class="rat-head"><h3>${r.name}</h3><span class="badge">${r.status}</span></div><p class="rat-sub">${r.call} • ${r.reg}</p><p class="rat-sub">${r.sex} • ${r.variety} • DOB ${r.dob}</p><p class="rat-sub">Cage ${r.cage} • ${r.weight}g • ${r.line}</p><div class="rat-tags"><span class="badge">Breeding: ${r.breed}</span><span class="badge ${r.health === 'Watchlist' ? 'warn':'good'}">Health: ${r.health}</span><span class="badge">${r.availability}</span></div>`, 'card rat-card');
    card.addEventListener('click', ()=>openRatDrawer(r.id));
    cards.appendChild(card);
    tBody.appendChild(make('tr', `<td><button class="chip open-rat" data-id="${r.id}">${r.name}</button></td><td>${r.sex}</td><td>${r.variety}</td><td>${r.status}</td><td>${r.cage}</td><td>${r.weight}g</td>`));
  });
  document.querySelectorAll('.open-rat').forEach((b)=>b.addEventListener('click',(e)=>{e.preventDefault(); openRatDrawer(b.dataset.id);}));
}

function renderLitters() {
  const tb = $('#litter-table'); tb.innerHTML = '';
  db.data.litters.forEach((l) => tb.appendChild(make('tr', `<td>${l.code}</td><td>${ratName(l.sireId)}</td><td>${ratName(l.damId)}</td><td>${l.born}</td><td>${l.alive}</td><td>${l.status}</td>`)));
}

function sharedAncestors(aId,bId,depth=3){
  const ancestors=(id,d,map=new Set())=>{ if(!id||d===0) return map; const r=byId('rats',id); if(!r) return map; [r.sireId,r.damId].forEach(pid=>{ if(pid){ map.add(pid); ancestors(pid,d-1,map);} }); return map; };
  const a=ancestors(aId,depth), b=ancestors(bId,depth); return [...a].filter(x=>b.has(x));
}
function coiEstimate(pair){ const shared=sharedAncestors(pair.buckId,pair.doeId,4); return Number((shared.length*1.8).toFixed(1)); }
function traitProb(pair){
  const buck=byId('rats',pair.buckId), doe=byId('rats',pair.doeId); if(!buck||!doe) return [];
  const union=[...new Set([...(buck.traits||[]),...(doe.traits||[]),...(buck.carriers||[]),...(doe.carriers||[])])];
  return union.slice(0,4).map(t=>({trait:t, pct: (buck.traits?.includes(t)&&doe.traits?.includes(t))?75:(buck.traits?.includes(t)||doe.traits?.includes(t))?50:25 }));
}

function renderPairings() {
  const wrap = $('#pairing-cards'); wrap.innerHTML='';
  db.data.pairings.forEach((p) => {
    const probs = traitProb(p).map(x=>`<span class="badge">${x.trait} ${x.pct}%</span>`).join(' ');
    const coi = coiEstimate(p);
    wrap.appendChild(make('article', `<h3>${ratName(p.buckId)} × ${ratName(p.doeId)}</h3><p><span class="badge">Status: ${p.status}</span> <span class="badge">COI ~ ${coi}%</span></p><p><strong>Goals:</strong> ${p.goals}</p><p><strong>Trait probabilities:</strong> ${probs || 'n/a'}</p>`, 'card'));
  });
}

function renderLineage() {
  const el = $('#lineage-tree'); el.innerHTML='';
  db.data.rats.forEach((r)=>{
    const kids = db.data.rats.filter(x=>x.sireId===r.id||x.damId===r.id).map(x=>`<button class="chip lineage-link" data-id="${x.id}">${x.name}</button>`).join(' ');
    if(!kids) return;
    el.appendChild(make('div', `<strong>${r.name}</strong> → ${kids}<p class="rat-sub">Line: ${r.line} · Traits: ${(r.traits||[]).join(', ') || 'n/a'}</p>`, 'branch'));
  });
  el.appendChild(make('div', `<strong>Compatibility signal:</strong> ${db.data.pairings.map(p=>`${ratName(p.buckId)}×${ratName(p.doeId)} COI ${coiEstimate(p)}%`).join(' | ')}`, 'branch'));
  document.querySelectorAll('.lineage-link').forEach((b)=>b.addEventListener('click', ()=>openRatDrawer(b.dataset.id)));
}

function renderSimpleLists() {
  $('#health-list').innerHTML = db.data.healthRecords.map(h=>`<li>${ratName(h.ratId)} — ${h.diagnosis} (${h.date})</li>`).join('');
  $('#inventory-list').innerHTML = db.data.inventory.map(i=>`<li>${i.name}: ${i.qty} ${i.unit} (reorder ${i.reorder})</li>`).join('');
  $('#task-list').innerHTML = db.data.tasks.map(t=>`<li>${t.label} — due ${t.due}</li>`).join('');
}

const profileTabs = ['Overview','Genetics','Health','Weight','Breeding','Relationships','Litters','Temperament','Photos','Notes','Placement','Timeline'];
function openRatDrawer(id) {
  state.currentRatId = id; state.currentProfileTab = 'Overview';
  $('#rat-drawer').classList.remove('hidden');
  renderDrawer();
}
function drawerContent(r) {
  const litters = db.data.litters.filter(l=>l.sireId===r.id||l.damId===r.id);
  const weights = db.data.weights.filter(w=>w.ratId===r.id);
  const health = db.data.healthRecords.filter(h=>h.ratId===r.id);
  const timeline = db.data.events.filter(e=>e.entityId===r.id || (e.entityType==='litter' && litters.some(l=>l.id===e.entityId)));
  const map = {
    Overview: `<p><strong>${r.name}</strong> · ${r.sex} · ${r.variety}</p><p>${r.notes}</p><p>Status: <span class="badge">${r.status}</span></p>`,
    Genetics: `<p>Traits: ${(r.traits||[]).join(', ') || 'n/a'}</p><p>Carriers: ${(r.carriers||[]).join(', ') || 'n/a'}</p>`,
    Health: health.length?`<ul class="list">${health.map(h=>`<li>${h.date}: ${h.diagnosis} — ${h.treatment}</li>`).join('')}</ul>`:'<p>No health records.</p>',
    Weight: weights.length?`<ul class="list">${weights.map(w=>`<li>${w.date}: ${w.grams}g (${w.notes||'no note'})</li>`).join('')}</ul>`:'<p>No weight entries.</p>',
    Breeding: `<p>Breeding eligibility: ${r.breed}</p><p>Pairings: ${db.data.pairings.filter(p=>p.buckId===r.id||p.doeId===r.id).length}</p>`,
    Relationships: `<p>Sire: ${ratName(r.sireId)}</p><p>Dam: ${ratName(r.damId)}</p>`,
    Litters: litters.length?`<ul class="list">${litters.map(l=>`<li>${l.code} — ${l.alive} alive (${l.status})</li>`).join('')}</ul>`:'<p>No litters linked.</p>',
    Temperament: `<p>${r.temperament || 'No temperament notes yet.'}</p>`,
    Photos: `<img src="${r.img}" alt="${r.name}" style="width:100%;border-radius:12px;aspect-ratio:4/3;object-fit:cover;">`,
    Notes: `<p>${r.notes || 'No notes.'}</p>`,
    Placement: `<p>Availability: ${r.availability}</p>`,
    Timeline: timeline.length?`<ul class="timeline">${timeline.slice(0,20).map(e=>`<li>${e.type} — ${e.summary} <span class="rat-sub">${formatDate(e.at)}</span></li>`).join('')}</ul>`:'<p>No timeline events.</p>'
  };
  return map[state.currentProfileTab] || '<p>Empty tab.</p>';
}
function renderDrawer() {
  const r = byId('rats', state.currentRatId); if(!r) return;
  $('#drawer-body').innerHTML = `
    <h3>${r.name} <span class="badge">${r.status}</span></h3>
    <p class="rat-sub">${r.call} · ${r.reg}</p>
    <div class="profile-tabs">${profileTabs.map(t=>`<button class="${t===state.currentProfileTab?'active':''}" data-tab="${t}">${t}</button>`).join('')}</div>
    ${drawerContent(r)}
  `;
  document.querySelectorAll('.profile-tabs button').forEach((b)=>b.addEventListener('click',()=>{state.currentProfileTab=b.dataset.tab; renderDrawer();}));
}

function uid(prefix){ return `${prefix}${Date.now()}${Math.floor(Math.random()*1000)}`; }

function formSchema(kind){
  const ratOpts = db.data.rats.map(r=>`<option value="${r.id}">${r.name}</option>`).join('');
  const litterOpts = db.data.litters.map(l=>`<option value="${l.id}">${l.code}</option>`).join('');
  const schemas = {
    rat: `<div class="form-grid"><div class="field"><label>Name*</label><input name="name" required></div><div class="field"><label>Sex*</label><select name="sex" required><option>Doe</option><option>Buck</option></select></div><div class="field"><label>DOB*</label><input type="date" name="dob" required></div><div class="field"><label>Status*</label><input name="status" value="Holdback" required></div><div class="field full"><label>Variety*</label><input name="variety" required></div></div>`,
    litter: `<div class="form-grid"><div class="field"><label>Litter Code*</label><input name="code" required></div><div class="field"><label>Born Date*</label><input type="date" name="born" required></div><div class="field"><label>Sire*</label><select name="sireId" required>${ratOpts}</select></div><div class="field"><label>Dam*</label><select name="damId" required>${ratOpts}</select></div><div class="field"><label>Born Alive*</label><input type="number" name="alive" min="0" required></div><div class="field"><label>Status*</label><input name="status" value="In Nest" required></div></div>`,
    pairing: `<div class="form-grid"><div class="field"><label>Buck*</label><select name="buckId" required>${ratOpts}</select></div><div class="field"><label>Doe*</label><select name="doeId" required>${ratOpts}</select></div><div class="field full"><label>Goal Traits*</label><input name="goals" required></div></div>`,
    weight: `<div class="form-grid"><div class="field"><label>Rat*</label><select name="ratId" required>${ratOpts}</select></div><div class="field"><label>Date*</label><input type="date" name="date" required></div><div class="field"><label>Weight (g)*</label><input type="number" name="grams" min="1" required></div><div class="field full"><label>Notes</label><input name="notes"></div></div>`,
    health: `<div class="form-grid"><div class="field"><label>Rat*</label><select name="ratId" required>${ratOpts}</select></div><div class="field"><label>Date*</label><input type="date" name="date" required></div><div class="field full"><label>Diagnosis*</label><input name="diagnosis" required></div><div class="field full"><label>Treatment*</label><textarea name="treatment" required></textarea></div></div>`,
    inventory: `<div class="form-grid"><div class="field"><label>Item*</label><input name="name" required></div><div class="field"><label>Unit*</label><input name="unit" value="units" required></div><div class="field"><label>Qty*</label><input type="number" step="0.1" name="qty" required></div><div class="field"><label>Reorder Point*</label><input type="number" step="0.1" name="reorder" required></div></div>`,
    task: `<div class="form-grid"><div class="field full"><label>Task*</label><input name="label" required></div><div class="field"><label>Due*</label><input type="date" name="due" required></div></div>`,
    reservation: `<div class="form-grid"><div class="field"><label>Adopter*</label><input name="adopter" required></div><div class="field"><label>Litter*</label><select name="litterId" required>${litterOpts}</select></div><div class="field"><label>Status*</label><input name="status" value="Deposit paid" required></div></div>`
  };
  return schemas[kind];
}

function validate(kind, data){
  if(kind==='litter' && data.sireId===data.damId) return 'Sire and dam cannot be the same rat.';
  if(kind==='pairing' && data.buckId===data.doeId) return 'Buck and doe must be different rats.';
  return '';
}

function saveForm(kind, data){
  if(kind==='rat'){
    const rat = { id:uid('r'), name:data.name, call:data.name, reg:data.name, sex:data.sex, dob:data.dob, status:data.status, variety:data.variety, breed:'Pending', cage:'Unassigned', weight:0, health:'Clear', availability:'Available', line:'Unassigned', traits:[], carriers:[], sireId:null, damId:null, temperament:'', notes:'', img:'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=900&q=80' };
    db.data.rats.push(rat); db.addEvent('rat.created', `Created rat ${rat.name}`, 'rat', rat.id);
  }
  if(kind==='litter'){ const x={id:uid('l'), ...data, alive:Number(data.alive)}; db.data.litters.push(x); db.addEvent('litter.created', `Added litter ${x.code}`, 'litter', x.id); }
  if(kind==='pairing'){ const x={id:uid('p'), ...data, status:'Under Review'}; db.data.pairings.push(x); db.addEvent('pairing.created', `Planned pairing ${ratName(x.buckId)}×${ratName(x.doeId)}`, 'pairing', x.id); }
  if(kind==='weight'){ const x={id:uid('w'), ...data, grams:Number(data.grams)}; db.data.weights.push(x); const r=byId('rats',x.ratId); if(r) r.weight=x.grams; db.addEvent('weight.logged', `Logged ${x.grams}g for ${ratName(x.ratId)}`, 'rat', x.ratId); }
  if(kind==='health'){ const x={id:uid('h'), ...data}; db.data.healthRecords.push(x); const r=byId('rats',x.ratId); if(r) r.health='Watchlist'; db.addEvent('health.logged', `Health record for ${ratName(x.ratId)}: ${x.diagnosis}`, 'rat', x.ratId); }
  if(kind==='inventory'){ const x={id:uid('i'), ...data, qty:Number(data.qty), reorder:Number(data.reorder)}; db.data.inventory.push(x); db.addEvent('inventory.added', `Inventory item ${x.name} added`, 'inventory', x.id); }
  if(kind==='task'){ const x={id:uid('t'), ...data}; db.data.tasks.push(x); db.addEvent('task.created', `Task created: ${x.label}`, 'task', x.id); }
  if(kind==='reservation'){ const x={id:uid('rs'), ...data}; db.data.reservations.push(x); db.addEvent('reservation.created', `Reservation for ${x.adopter}`, 'reservation', x.id); }
  db.persist();
}

function openForm(kind){
  $('#form-error').textContent='';
  $('#quick-add-title').textContent = `Add ${kind[0].toUpperCase()+kind.slice(1)} Record`;
  $('#quick-add-form').dataset.kind = kind;
  $('#quick-add-form').innerHTML = formSchema(kind);
  $('#quick-add-modal').showModal();
}

function wireForm(){
  $('#open-quick-add').addEventListener('click', ()=>openForm('rat'));
  $('#quick-add-buttons').addEventListener('click',(e)=>{ if(e.target.classList.contains('qa-btn')) openForm(e.target.dataset.kind); });
  $('#modal-close').addEventListener('click', ()=>$('#quick-add-modal').close());
  $('#quick-add-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const kind = e.currentTarget.dataset.kind;
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const err = validate(kind, data);
    if(err){ $('#form-error').textContent = err; return; }
    saveForm(kind, data);
    $('#quick-add-modal').close();
    rerender();
  });
}

function wireControls(){
  $('#rat-search').addEventListener('input',(e)=>{ state.ratQuery=e.target.value.trim().toLowerCase(); renderRats(); });
  $('#global-search').addEventListener('input',(e)=>{ state.ratQuery=e.target.value.trim().toLowerCase(); $('#rat-search').value=e.target.value; renderRats(); });
  $('#rat-status-filter').addEventListener('change',(e)=>{ state.ratStatus=e.target.value; renderRats(); });
  $('#view-toggle').addEventListener('click',(e)=>{ if(e.target.tagName!=='BUTTON') return; state.rosterView=e.target.dataset.view; document.querySelectorAll('#view-toggle button').forEach(b=>b.classList.toggle('active', b.dataset.view===state.rosterView)); $('#rat-cards').classList.toggle('hidden', state.rosterView==='table'); $('#rat-table-wrap').classList.toggle('hidden', state.rosterView!=='table'); });
  $('#drawer-close').addEventListener('click',()=>$('#rat-drawer').classList.add('hidden'));
  const saved = localStorage.getItem('ratticly-theme'); if(saved){ document.body.dataset.theme=saved; $('#theme-switcher').value=saved; }
  $('#theme-switcher').addEventListener('change',(e)=>{ document.body.dataset.theme=e.target.value; localStorage.setItem('ratticly-theme', e.target.value); });
}
function wireTabs(){ document.querySelectorAll('.nav-item').forEach((btn)=>btn.addEventListener('click',()=>{ document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active')); document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active')); btn.classList.add('active'); document.getElementById(btn.dataset.tab).classList.add('active'); })); }

function rerender(){ renderStats(); renderEvents(); renderQuickAddButtons(); renderRats(); renderLitters(); renderPairings(); renderLineage(); renderSimpleLists(); if(state.currentRatId) renderDrawer(); }

function init(){ db.load(); wireTabs(); wireControls(); wireForm(); rerender(); }
init();
