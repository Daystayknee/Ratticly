const STORAGE_KEY = 'ratticly-store-v2';
const state = { ratQuery:'', ratStatus:'all', rosterView:'cards', currentRatId:null, currentProfileTab:'Overview' };

const seed = {
  auth: { currentUserId: 'u1' },
  users: [
    { id:'u1', name:'Owner Admin', role:'owner' },
    { id:'u2', name:'Caretaker Jess', role:'staff' },
    { id:'u3', name:'Viewer Kit', role:'viewer' }
  ],
  rats: [
    { id:'r1', name:'Nova', call:'Novie', reg:'Ratticly Nova Bloom', sex:'Doe', variety:'Rex Dumbo', dob:'2025-04-12', status:'Pregnant', breed:'Eligible', cage:'Maternity-2', weight:391, health:'Watchlist', availability:'Holdback', line:'Velvet Aurora', genotype:'Dd rr Mm', traits:['dumbo','rex'], carriers:['mink'], sireId:'r2', damId:null, temperament:'Sweet', notes:'Strong maternal behavior', photos:[], img:'https://images.unsplash.com/photo-1608152579902-4f9f2e4f8090?auto=format&fit=crop&w=900&q=80' },
    { id:'r2', name:'Atlas', call:'At', reg:'Ratticly Atlas Crest', sex:'Buck', variety:'Standard', dob:'2025-02-10', status:'Active Breeder', breed:'Eligible', cage:'Buck-Alpha', weight:522, health:'Clear', availability:'Not listed', line:'Crestline', genotype:'dd Rr Mm', traits:['agouti'], carriers:['dumbo'], sireId:null, damId:null, temperament:'Bold', notes:'Stable temperament', photos:[], img:'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=900&q=80' },
    { id:'r3', name:'Mochi', call:'Moch', reg:'Ratticly Mochi Haze', sex:'Doe', variety:'Velveteen Dumbo', dob:'2025-09-06', status:'Holdback', breed:'Pending', cage:'Growout-F2', weight:287, health:'Clear', availability:'Keeper candidate', line:'Mintglass', genotype:'Dd Rr mm', traits:['dumbo','velveteen'], carriers:['rex'], sireId:'r2', damId:'r1', temperament:'Shy', notes:'Great coat', photos:[], img:'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=900&q=80' }
  ],
  litters:[{ id:'l1', code:'LIT-2603-NEB', sireId:'r2', damId:'r1', born:'2026-03-01', alive:10, status:'In Nest' }],
  pairings:[{ id:'p1', buckId:'r2', doeId:'r1', status:'Approved', goals:'Temperament stability + dumbo expression' }],
  weights:[{ id:'w1', ratId:'r1', date:'2026-03-04', grams:391, notes:'Pregnancy check' }],
  healthRecords:[{ id:'h1', ratId:'r1', date:'2026-03-05', diagnosis:'Mild URI watch', treatment:'Observe + humidity support' }],
  inventory:[{ id:'i1', name:'Lab blocks', qty:1.2, reorder:2, unit:'bags' }],
  tasks:[{ id:'t1', label:'Weigh litter LIT-2603-NEB', due:'2026-03-12' }],
  reservations:[{ id:'rs1', adopter:'Harper Lane', litterId:'l1', status:'Deposit paid' }],
  events:[{ id:'e1', at:new Date().toISOString(), type:'system.seeded', summary:'Seed data loaded', entityType:'system' }]
};

const db = {
  data:null,
  load(){ const saved=localStorage.getItem(STORAGE_KEY); this.data=saved?JSON.parse(saved):structuredClone(seed); this.persist(); },
  persist(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data)); },
  addEvent(type, summary, entityType, entityId){
    this.data.events.unshift({ id:`e${Date.now()}${Math.random().toString(16).slice(2,6)}`, at:new Date().toISOString(), type, summary, entityType, entityId, by:this.currentUser().name });
    this.data.events=this.data.events.slice(0,140); this.persist();
  },
  currentUser(){ return this.data.users.find(u=>u.id===this.data.auth.currentUserId); }
};

const api = {
  async latency(){ await new Promise(r=>setTimeout(r,90)); },
  ensureWrite(){ if(db.currentUser().role==='viewer') throw new Error('Viewer role cannot modify records.'); },
  async create(kind,payload){ await this.latency(); this.ensureWrite(); db.data[kind].push(payload); db.persist(); return payload; },
  async update(kind,id,patch){ await this.latency(); this.ensureWrite(); const item=db.data[kind].find(x=>x.id===id); if(!item) throw new Error('Record not found'); Object.assign(item, patch); db.persist(); return item; },
  async remove(kind,id){ await this.latency(); this.ensureWrite(); db.data[kind]=db.data[kind].filter(x=>x.id!==id); db.persist(); },
};

const $ = (s)=>document.querySelector(s);
const make=(tag,html,c='')=>{const e=document.createElement(tag); if(c)e.className=c; e.innerHTML=html; return e;};
const byId=(kind,id)=>db.data[kind].find(x=>x.id===id);
const ratName=(id)=>byId('rats',id)?.name||'Unknown';
const uid=(p)=>`${p}${Date.now()}${Math.floor(Math.random()*1000)}`;
const date=(d)=>new Date(d).toLocaleString();

const dailyFocusItems = [
  'Morning health sweep for respiratory watchlist',
  'Weigh nursery litter and update growth trend',
  'Refresh profile photos for available pairs',
  'Validate pairing goals against this week outcomes'
];

function renderFeaturedRat(){
  const wrap = $('#featured-rat');
  const featured = db.data.rats[0];
  if(!wrap || !featured) return;
  wrap.innerHTML = `
    <img class="hero-photo" src="${featured.img}" alt="${featured.name}" />
    <div class="hero-meta">
      <p class="badge">🌟 Featured Rat</p>
      <h3>${featured.name} <span class="badge">${featured.status}</span></h3>
      <p class="hero-note">${featured.call} · ${featured.reg}</p>
      <div class="hero-stats">
        <span class="badge">${featured.sex}</span>
        <span class="badge">${featured.variety}</span>
        <span class="badge">${featured.weight}g</span>
        <span class="badge">Line: ${featured.line}</span>
        <span class="badge">Genotype: ${featured.genotype || 'n/a'}</span>
      </div>
      <p class="hero-note">${featured.notes || 'No notes yet.'}</p>
    </div>
  `;
}

function renderDailyFocus(){
  const ul = $('#daily-focus');
  if(!ul) return;
  ul.innerHTML = dailyFocusItems.map((item)=>`<li>${item}</li>`).join('');
}

function computeStats(){
  const rats=db.data.rats;
  return [['Total Rats',rats.length],['Bucks',rats.filter(r=>r.sex==='Buck').length],['Does',rats.filter(r=>r.sex==='Doe').length],['Pregnant',rats.filter(r=>r.status==='Pregnant').length],['Litters',db.data.litters.length],['Pairings',db.data.pairings.length],['Health',db.data.healthRecords.length],['Tasks',db.data.tasks.length],['Inventory Alerts',db.data.inventory.filter(i=>i.qty<=i.reorder).length],['Reservations',db.data.reservations.length],['Events',db.data.events.length],['Users',db.data.users.length]];
}
function renderStats(){ const w=$('#stats-grid'); w.innerHTML=''; computeStats().forEach(([l,v])=>w.appendChild(make('article',`<div class="label">${l}</div><div class="value">${v}</div>`,'card stat'))); }
function renderEvents(){ const ul=$('#events-list'); ul.innerHTML=''; db.data.events.slice(0,14).forEach(e=>ul.appendChild(make('li',`<strong>${e.type}</strong> — ${e.summary} <span class="rat-sub">${date(e.at)} · ${e.by||'system'}</span>`))); }
function renderQuickAdd(){ const w=$('#quick-add-buttons'); w.innerHTML=''; ['rat','litter','pairing','weight','health','inventory','task','reservation'].forEach(k=>{ const b=make('button',`Add ${k[0].toUpperCase()+k.slice(1)}`); b.className='qa-btn'; b.dataset.kind=k; w.appendChild(b); }); }

function filteredRats(){ return db.data.rats.filter(r=>{ const text=`${r.name} ${r.call} ${r.reg} ${r.variety} ${r.line} ${r.cage}`.toLowerCase(); return (!state.ratQuery||text.includes(state.ratQuery)) && (state.ratStatus==='all'||r.status===state.ratStatus); }); }
function renderRats(){
  const cards=$('#rat-cards'), tb=$('#rat-table-body'); cards.innerHTML=''; tb.innerHTML='';
  filteredRats().forEach(r=>{
    const card=make('article',`<img src="${r.img}" alt="${r.name}"/><div class="rat-head"><h3>${r.name}</h3><span class="badge">${r.status}</span></div><p class="rat-sub">${r.call} • ${r.reg}</p><p class="rat-sub">${r.sex} • ${r.variety} • DOB ${r.dob}</p><p class="rat-sub">Cage ${r.cage} • ${r.weight}g • ${r.line}</p><div class="rat-tags"><span class="badge">${r.breed}</span><span class="badge ${r.health==='Watchlist'?'warn':'good'}">${r.health}</span><span class="badge">${r.availability}</span></div>`,'card rat-card');
    card.addEventListener('click',()=>openRatDrawer(r.id)); cards.appendChild(card);
    tb.appendChild(make('tr',`<td><button class="chip open-rat" data-id="${r.id}">${r.name}</button></td><td>${r.sex}</td><td>${r.variety}</td><td>${r.status}</td><td>${r.cage}</td><td>${r.weight}g</td>`));
  });
  document.querySelectorAll('.open-rat').forEach(b=>b.addEventListener('click',(e)=>{e.preventDefault(); openRatDrawer(b.dataset.id);}));
}
function renderLitters(){ const tb=$('#litter-table'); tb.innerHTML=''; db.data.litters.forEach(l=>tb.appendChild(make('tr',`<td>${l.code}</td><td>${ratName(l.sireId)}</td><td>${ratName(l.damId)}</td><td>${l.born}</td><td>${l.alive}</td><td>${l.status}</td>`))); }

function parseGenotype(input){
  const parts=input.trim().split(/\s+/).filter(Boolean);
  const map={};
  parts.forEach(p=>{ if(p.length===2){ const locus=p[0].toUpperCase(); map[locus]=p; }});
  return map;
}
function locusOdds(a,b){
  const gamA=[a[0],a[1]], gamB=[b[0],b[1]]; const counts={};
  gamA.forEach(x=>gamB.forEach(y=>{ const g=[x,y].sort((m,n)=>m===m.toUpperCase()?-1:1).join(''); counts[g]=(counts[g]||0)+1; }));
  return Object.entries(counts).map(([g,c])=>({g,pct:Math.round((c/4)*100)}));
}
function runGenetics(){
  const a=parseGenotype($('#geno-a').value), b=parseGenotype($('#geno-b').value); const loci=[...new Set([...Object.keys(a),...Object.keys(b)])];
  const out=$('#genetics-results'); out.innerHTML='';
  loci.forEach(l=>{
    if(!a[l]||!b[l]) return out.appendChild(make('li',`${l}: insufficient data`));
    const odds=locusOdds(a[l],b[l]);
    out.appendChild(make('li',`${l}: ${odds.map(o=>`${o.g} ${o.pct}%`).join(' · ')}`));
  });
}

function sharedAncestors(aId,bId,depth=3){
  const anc=(id,d,set=new Set())=>{ if(!id||d===0) return set; const r=byId('rats',id); if(!r) return set; [r.sireId,r.damId].forEach(pid=>{ if(pid){ set.add(pid); anc(pid,d-1,set);} }); return set; };
  const a=anc(aId,depth), b=anc(bId,depth); return [...a].filter(x=>b.has(x));
}
function coiEstimate(pair){ return Number((sharedAncestors(pair.buckId,pair.doeId,4).length*1.8).toFixed(1)); }
function traitProb(pair){
  const b=byId('rats',pair.buckId), d=byId('rats',pair.doeId); if(!b||!d) return [];
  const t=[...new Set([...(b.traits||[]),...(d.traits||[]),...(b.carriers||[]),...(d.carriers||[])])];
  return t.slice(0,5).map(x=>({trait:x,pct:(b.traits?.includes(x)&&d.traits?.includes(x))?75:(b.traits?.includes(x)||d.traits?.includes(x))?50:25}));
}
function renderPairings(){
  const w=$('#pairing-cards'); w.innerHTML='';
  db.data.pairings.forEach(p=>w.appendChild(make('article',`<h3>${ratName(p.buckId)} × ${ratName(p.doeId)}</h3><p><span class="badge">${p.status}</span> <span class="badge">COI ~${coiEstimate(p)}%</span></p><p>${p.goals}</p><p>${traitProb(p).map(t=>`<span class="badge">${t.trait} ${t.pct}%</span>`).join(' ')}</p>`,'card')));
}

function ancestorsToDepth(rootId, depth){
  const nodes=[]; const links=[];
  function walk(id,level,xHint){ if(!id||level>depth) return; const r=byId('rats',id); if(!r) return; nodes.push({id:r.id,name:r.name,level,health:r.health,traits:r.traits||[],xHint});
    [r.sireId,r.damId].forEach((pid,i)=>{ if(pid){ links.push({from:pid,to:r.id}); walk(pid,level+1,xHint+(i?1:-1)*(220/level)); }});
  }
  walk(rootId,1,480); return {nodes,links};
}
function renderLineageGraph(){
  const svg=$('#lineage-graph'); const depth=Number($('#lineage-depth').value); const showHealth=$('#overlay-health').checked; const showTraits=$('#overlay-traits').checked;
  const root=state.currentRatId || db.data.rats[0]?.id; if(!root){ svg.innerHTML=''; return; }
  const {nodes,links}=ancestorsToDepth(root, depth); svg.innerHTML='';
  const pos={};
  nodes.forEach(n=>{ const x=Math.max(70,Math.min(890,n.xHint)); const y=60+(n.level-1)*85; pos[n.id]={x,y}; });
  links.forEach(l=>{ const a=pos[l.from], b=pos[l.to]; if(!a||!b) return; svg.appendChild(make('line','', 'graph-line')).setAttribute('d',''); const line=svg.lastChild; line.setAttribute('x1',a.x); line.setAttribute('y1',a.y); line.setAttribute('x2',b.x); line.setAttribute('y2',b.y); });
  nodes.forEach(n=>{ const g=document.createElementNS('http://www.w3.org/2000/svg','g'); g.setAttribute('class','graph-node'); g.style.cursor='pointer';
    const c=document.createElementNS('http://www.w3.org/2000/svg','circle'); c.setAttribute('cx',pos[n.id].x); c.setAttribute('cy',pos[n.id].y); c.setAttribute('r',22); c.setAttribute('fill',showHealth && n.health==='Watchlist' ? '#ffd7df' : '#eaf0ff'); c.setAttribute('stroke','#8ea0d8');
    const t=document.createElementNS('http://www.w3.org/2000/svg','text'); t.setAttribute('x',pos[n.id].x); t.setAttribute('y',pos[n.id].y+4); t.setAttribute('text-anchor','middle'); t.setAttribute('font-size','10'); t.textContent=n.name;
    g.appendChild(c); g.appendChild(t);
    if(showTraits){ const trait=document.createElementNS('http://www.w3.org/2000/svg','text'); trait.setAttribute('x',pos[n.id].x); trait.setAttribute('y',pos[n.id].y+34); trait.setAttribute('text-anchor','middle'); trait.setAttribute('font-size','9'); trait.textContent=(n.traits||[]).slice(0,2).join(','); g.appendChild(trait); }
    g.addEventListener('click',()=>openRatDrawer(n.id)); svg.appendChild(g);
  });
}

function renderLists(){
  $('#health-list').innerHTML=db.data.healthRecords.map(h=>`<li>${ratName(h.ratId)} — ${h.diagnosis} (${h.date})</li>`).join('');
  $('#inventory-list').innerHTML=db.data.inventory.map(i=>`<li>${i.name}: ${i.qty} ${i.unit} (reorder ${i.reorder})</li>`).join('');
  $('#task-list').innerHTML=db.data.tasks.map(t=>`<li>${t.label} — ${t.due}</li>`).join('');
}

const profileTabs=['Overview','Genetics','Health','Weight','Breeding','Relationships','Litters','Temperament','Photos','Notes','Placement','Timeline'];
function openRatDrawer(id){ state.currentRatId=id; state.currentProfileTab='Overview'; $('#rat-drawer').classList.remove('hidden'); renderDrawer(); renderLineageGraph(); }
function drawerTabContent(r){
  const litters=db.data.litters.filter(l=>l.sireId===r.id||l.damId===r.id); const weights=db.data.weights.filter(w=>w.ratId===r.id); const health=db.data.healthRecords.filter(h=>h.ratId===r.id);
  const events=db.data.events.filter(e=>e.entityId===r.id);
  const map={
    Overview:`<p><strong>${r.name}</strong> · ${r.sex} · ${r.variety}</p><p>${r.notes||''}</p>`,
    Genetics:`<p>Genotype: <strong>${r.genotype||'n/a'}</strong></p><p>Traits: ${(r.traits||[]).join(', ')||'n/a'}</p><p>Carriers: ${(r.carriers||[]).join(', ')||'n/a'}</p>`,
    Health:health.length?`<ul class="list">${health.map(h=>`<li>${h.date}: ${h.diagnosis}</li>`).join('')}</ul>`:'<p>No records.</p>',
    Weight:weights.length?`<ul class="list">${weights.map(w=>`<li>${w.date}: ${w.grams}g</li>`).join('')}</ul><p>Avg: ${Math.round(weights.reduce((a,b)=>a+b.grams,0)/weights.length)}g</p>`:'<p>No entries.</p>',
    Breeding:`<p>Eligibility: ${r.breed}</p><p>Pairings: ${db.data.pairings.filter(p=>p.buckId===r.id||p.doeId===r.id).length}</p>`,
    Relationships:`<p>Sire: ${ratName(r.sireId)}</p><p>Dam: ${ratName(r.damId)}</p>`,
    Litters:litters.length?`<ul class="list">${litters.map(l=>`<li>${l.code} (${l.status})</li>`).join('')}</ul>`:'<p>No litters.</p>',
    Temperament:`<p>${r.temperament||'No temperament notes.'}</p>`,
    Photos:`<img src="${r.img}" alt="${r.name}" style="width:100%;border-radius:12px;aspect-ratio:4/3;object-fit:cover;"><div class="field"><label>Add photo URL</label><input id="photo-url" placeholder="https://..."/><button class="chip" id="add-photo" type="button">Add</button></div><ul class="list">${(r.photos||[]).map(p=>`<li><a href="${p}" target="_blank">${p}</a></li>`).join('')}</ul>`,
    Notes:`<textarea id="notes-edit" rows="5">${r.notes||''}</textarea><button id="save-notes" class="chip" type="button">Save Notes</button>`,
    Placement:`<p>${r.availability}</p>`,
    Timeline:`<label>Filter: <select id="timeline-filter"><option value="all">All</option><option value="weight">Weight</option><option value="health">Health</option><option value="rat">Rat changes</option></select></label><ul id="timeline-list" class="timeline"></ul>`
  };
  return map[state.currentProfileTab] || '<p>Empty.</p>';
}
function renderTimelineFiltered(r){
  const filter=$('#timeline-filter')?.value||'all'; const ul=$('#timeline-list'); if(!ul) return;
  let events=db.data.events.filter(e=>e.entityId===r.id||e.entityType==='rat');
  if(filter==='weight') events=events.filter(e=>e.type.includes('weight'));
  if(filter==='health') events=events.filter(e=>e.type.includes('health'));
  if(filter==='rat') events=events.filter(e=>e.type.includes('rat'));
  ul.innerHTML=events.slice(0,20).map(e=>`<li>${e.type} — ${e.summary} <span class="rat-sub">${date(e.at)}</span></li>`).join('');
}
function renderDrawer(){
  const r=byId('rats',state.currentRatId); if(!r) return;
  $('#drawer-body').innerHTML=`<h3>${r.name} <span class="badge">${r.status}</span></h3><div class="profile-tabs">${profileTabs.map(t=>`<button data-tab="${t}" class="${t===state.currentProfileTab?'active':''}">${t}</button>`).join('')}</div><div class="drawer-actions"><button class="chip" id="edit-rat">Edit</button><button class="chip" id="delete-rat">Delete</button></div>${drawerTabContent(r)}`;
  document.querySelectorAll('.profile-tabs button').forEach(b=>b.addEventListener('click',()=>{state.currentProfileTab=b.dataset.tab; renderDrawer();}));
  $('#edit-rat')?.addEventListener('click',()=>openForm('rat',r));
  $('#delete-rat')?.addEventListener('click',()=>deleteRat(r.id));
  $('#save-notes')?.addEventListener('click',async ()=>{ await api.update('rats',r.id,{notes:$('#notes-edit').value}); db.addEvent('rat.updated',`Updated notes for ${r.name}`,'rat',r.id); rerender(); });
  $('#add-photo')?.addEventListener('click',async ()=>{ const url=$('#photo-url').value.trim(); if(!url) return; const photos=[...(r.photos||[]), url]; await api.update('rats',r.id,{photos}); db.addEvent('rat.media',`Added photo to ${r.name}`,'rat',r.id); rerender(); });
  $('#timeline-filter')?.addEventListener('change',()=>renderTimelineFiltered(r));
  renderTimelineFiltered(r);
}

async function deleteRat(id){
  if(!confirm('Delete this rat?')) return;
  const backup=structuredClone(db.data.rats);
  db.data.rats=db.data.rats.filter(r=>r.id!==id); rerender();
  try{ await api.remove('rats',id); db.addEvent('rat.deleted',`Deleted rat ${id}`,'rat',id); $('#rat-drawer').classList.add('hidden'); rerender(); }
  catch(e){ db.data.rats=backup; alert(e.message); rerender(); }
}

function schema(kind, existing){
  const ratOpts=db.data.rats.map(r=>`<option value="${r.id}" ${existing?.sireId===r.id?'selected':''}>${r.name}</option>`).join('');
  const litterOpts=db.data.litters.map(l=>`<option value="${l.id}">${l.code}</option>`).join('');
  const val=(k,d='')=>existing?.[k] ?? d;
  const m={
    rat:`<div class="form-grid"><div class="field"><label>Name*</label><input name="name" value="${val('name')}" required></div><div class="field"><label>Sex*</label><select name="sex"><option ${val('sex')==='Doe'?'selected':''}>Doe</option><option ${val('sex')==='Buck'?'selected':''}>Buck</option></select></div><div class="field"><label>DOB*</label><input type="date" name="dob" value="${val('dob')}" required></div><div class="field"><label>Status*</label><input name="status" value="${val('status','Holdback')}" required></div><div class="field full"><label>Variety*</label><input name="variety" value="${val('variety')}" required></div><div class="field full"><label>Genotype</label><input name="genotype" value="${val('genotype','')}" placeholder="Dd rr Mm"/></div></div>`,
    litter:`<div class="form-grid"><div class="field"><label>Code*</label><input name="code" required></div><div class="field"><label>Born*</label><input type="date" name="born" required></div><div class="field"><label>Sire*</label><select name="sireId" required>${ratOpts}</select></div><div class="field"><label>Dam*</label><select name="damId" required>${ratOpts}</select></div><div class="field"><label>Alive*</label><input type="number" name="alive" min="0" required></div><div class="field"><label>Status*</label><input name="status" value="In Nest" required></div></div>`,
    pairing:`<div class="form-grid"><div class="field"><label>Buck*</label><select name="buckId">${ratOpts}</select></div><div class="field"><label>Doe*</label><select name="doeId">${ratOpts}</select></div><div class="field full"><label>Goals*</label><input name="goals" required></div></div>`,
    weight:`<div class="form-grid"><div class="field"><label>Rat*</label><select name="ratId">${ratOpts}</select></div><div class="field"><label>Date*</label><input type="date" name="date" required></div><div class="field"><label>Grams*</label><input type="number" name="grams" min="1" required></div><div class="field full"><label>Notes</label><input name="notes"></div></div>`,
    health:`<div class="form-grid"><div class="field"><label>Rat*</label><select name="ratId">${ratOpts}</select></div><div class="field"><label>Date*</label><input type="date" name="date" required></div><div class="field full"><label>Diagnosis*</label><input name="diagnosis" required></div><div class="field full"><label>Treatment*</label><textarea name="treatment" required></textarea></div></div>`,
    inventory:`<div class="form-grid"><div class="field"><label>Item*</label><input name="name" required></div><div class="field"><label>Unit*</label><input name="unit" value="units" required></div><div class="field"><label>Qty*</label><input type="number" step="0.1" name="qty" required></div><div class="field"><label>Reorder*</label><input type="number" step="0.1" name="reorder" required></div></div>`,
    task:`<div class="form-grid"><div class="field full"><label>Task*</label><input name="label" required></div><div class="field"><label>Due*</label><input type="date" name="due" required></div></div>`,
    reservation:`<div class="form-grid"><div class="field"><label>Adopter*</label><input name="adopter" required></div><div class="field"><label>Litter*</label><select name="litterId">${litterOpts}</select></div><div class="field"><label>Status*</label><input name="status" value="Deposit paid" required></div></div>`
  }; return m[kind];
}
function validate(kind,d){ if(kind==='litter'&&d.sireId===d.damId) return 'Sire and dam cannot be identical.'; if(kind==='pairing'&&d.buckId===d.doeId) return 'Buck and doe must differ.'; return ''; }

function openForm(kind, existing=null){ $('#form-error').textContent=''; $('#quick-add-title').textContent=`${existing?'Edit':'Add'} ${kind}`; $('#quick-add-form').dataset.kind=kind; $('#quick-add-form').dataset.editId=existing?.id||''; $('#quick-add-form').innerHTML=schema(kind, existing); $('#quick-add-modal').showModal(); }

async function submitForm(kind,data,editId){
  if(kind==='rat'){
    const payload={ ...byId('rats',editId)||{}, id: editId||uid('r'), name:data.name, call:data.name, reg:data.name, sex:data.sex, dob:data.dob, status:data.status, variety:data.variety, genotype:data.genotype||'', breed:'Pending', cage:(byId('rats',editId)?.cage)||'Unassigned', weight:(byId('rats',editId)?.weight)||0, health:(byId('rats',editId)?.health)||'Clear', availability:(byId('rats',editId)?.availability)||'Available', line:(byId('rats',editId)?.line)||'Unassigned', traits:(byId('rats',editId)?.traits)||[], carriers:(byId('rats',editId)?.carriers)||[], sireId:(byId('rats',editId)?.sireId)||null, damId:(byId('rats',editId)?.damId)||null, temperament:(byId('rats',editId)?.temperament)||'', notes:(byId('rats',editId)?.notes)||'', photos:(byId('rats',editId)?.photos)||[], img:(byId('rats',editId)?.img)||'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=900&q=80' };
    if(editId){ await api.update('rats',editId,payload); db.addEvent('rat.updated',`Updated rat ${payload.name}`,'rat',editId); }
    else { await api.create('rats',payload); db.addEvent('rat.created',`Created rat ${payload.name}`,'rat',payload.id); }
  }
  if(kind==='litter'){ const x={id:uid('l'), ...data, alive:Number(data.alive)}; await api.create('litters',x); db.addEvent('litter.created',`Added litter ${x.code}`,'litter',x.id); }
  if(kind==='pairing'){ const x={id:uid('p'), ...data, status:'Under Review'}; await api.create('pairings',x); db.addEvent('pairing.created',`Planned pairing ${ratName(x.buckId)}×${ratName(x.doeId)}`,'pairing',x.id); }
  if(kind==='weight'){ const x={id:uid('w'), ...data, grams:Number(data.grams)}; await api.create('weights',x); await api.update('rats',x.ratId,{weight:x.grams}); db.addEvent('weight.logged',`Logged ${x.grams}g for ${ratName(x.ratId)}`,'rat',x.ratId); }
  if(kind==='health'){ const x={id:uid('h'), ...data}; await api.create('healthRecords',x); await api.update('rats',x.ratId,{health:'Watchlist'}); db.addEvent('health.logged',`Health record for ${ratName(x.ratId)}`,'rat',x.ratId); }
  if(kind==='inventory'){ const x={id:uid('i'), ...data, qty:Number(data.qty), reorder:Number(data.reorder)}; await api.create('inventory',x); db.addEvent('inventory.added',`Inventory item ${x.name}`,'inventory',x.id); }
  if(kind==='task'){ const x={id:uid('t'), ...data}; await api.create('tasks',x); db.addEvent('task.created',`Task ${x.label}`,'task',x.id); }
  if(kind==='reservation'){ const x={id:uid('rs'), ...data}; await api.create('reservations',x); db.addEvent('reservation.created',`Reservation for ${x.adopter}`,'reservation',x.id); }
}

function rerender(){ renderAuth(); renderFeaturedRat(); renderDailyFocus(); renderStats(); renderEvents(); renderQuickAdd(); renderRats(); renderLitters(); renderPairings(); renderLineageGraph(); renderLists(); if(state.currentRatId) renderDrawer(); }

function renderAuth(){
  const u=db.currentUser(); $('#auth-pill').textContent=`${u.name} (${u.role})`;
  const sw=$('#user-switcher'); sw.innerHTML=db.data.users.map(x=>`<option value="${x.id}" ${x.id===u.id?'selected':''}>${x.name}</option>`).join('');
}

function wire(){
  document.querySelectorAll('.nav-item').forEach(btn=>btn.addEventListener('click',()=>{ document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active')); document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active')); btn.classList.add('active'); document.getElementById(btn.dataset.tab).classList.add('active'); }));
  $('#rat-search').addEventListener('input',e=>{ state.ratQuery=e.target.value.trim().toLowerCase(); renderRats(); });
  $('#global-search').addEventListener('input',e=>{ state.ratQuery=e.target.value.trim().toLowerCase(); $('#rat-search').value=e.target.value; renderRats(); });
  $('#rat-status-filter').addEventListener('change',e=>{ state.ratStatus=e.target.value; renderRats(); });
  $('#view-toggle').addEventListener('click',e=>{ if(e.target.tagName!=='BUTTON') return; state.rosterView=e.target.dataset.view; document.querySelectorAll('#view-toggle button').forEach(b=>b.classList.toggle('active',b.dataset.view===state.rosterView)); $('#rat-cards').classList.toggle('hidden',state.rosterView==='table'); $('#rat-table-wrap').classList.toggle('hidden',state.rosterView!=='table'); });
  $('#drawer-close').addEventListener('click',()=>$('#rat-drawer').classList.add('hidden'));
  $('#open-quick-add').addEventListener('click',()=>openForm('rat'));
  $('#quick-add-buttons').addEventListener('click',e=>{ if(e.target.classList.contains('qa-btn')) openForm(e.target.dataset.kind); });
  $('#modal-close').addEventListener('click',()=>$('#quick-add-modal').close());
  $('#quick-add-form').addEventListener('submit',async e=>{ e.preventDefault(); const kind=e.currentTarget.dataset.kind; const editId=e.currentTarget.dataset.editId||null; const data=Object.fromEntries(new FormData(e.currentTarget).entries()); const err=validate(kind,data); if(err){ $('#form-error').textContent=err; return; }
    try {
      if(!editId && kind==='rat'){ const optimistic={ id:uid('rtmp'), name:data.name, call:data.name, reg:data.name, sex:data.sex, dob:data.dob, status:data.status, variety:data.variety, breed:'Pending', cage:'Unassigned', weight:0, health:'Clear', availability:'Available', line:'Unassigned', genotype:data.genotype||'', traits:[], carriers:[], sireId:null, damId:null, temperament:'', notes:'', photos:[], img:'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=900&q=80' }; db.data.rats.push(optimistic); rerender(); }
      await submitForm(kind,data,editId); $('#quick-add-modal').close(); rerender();
    } catch(err2){ $('#form-error').textContent=err2.message; db.load(); rerender(); }
  });
  $('#theme-switcher').addEventListener('change',e=>{ document.body.dataset.theme=e.target.value; localStorage.setItem('ratticly-theme',e.target.value); });
  const saved=localStorage.getItem('ratticly-theme'); if(saved){ document.body.dataset.theme=saved; $('#theme-switcher').value=saved; }
  $('#user-switcher').addEventListener('change',e=>{ db.data.auth.currentUserId=e.target.value; db.persist(); rerender(); });
  $('#lineage-depth').addEventListener('input',renderLineageGraph); $('#overlay-health').addEventListener('change',renderLineageGraph); $('#overlay-traits').addEventListener('change',renderLineageGraph);
  $('#run-genetics').addEventListener('click',runGenetics);
}

function init(){ db.load(); wire(); rerender(); }
init();
