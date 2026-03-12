const STORAGE_KEY = 'ratticly-store-v4';
const state = { ratQuery:'', ratStatus:'all', rosterView:'cards', currentRatId:null, currentProfileTab:'Overview' };

const seed = {
  auth:{currentUserId:'u1'},
  users:[{id:'u1',name:'Owner Admin',role:'owner'},{id:'u2',name:'Caretaker Jess',role:'staff'},{id:'u3',name:'Viewer Kit',role:'viewer'}],
  rats:[
    { id:'r1', name:'Nova', call:'Novie', reg:'Ratticly Nova Bloom', sex:'Doe', variety:'Rex Dumbo', dob:'2025-04-12', status:'Pregnant', breed:'Eligible', cage:'Maternity-2', weight:391, health:'Watchlist', availability:'For Sale', line:'Velvet Aurora', genotype:'Dd rr Mm', traits:['dumbo','rex'], carriers:['mink'], sireId:'r2', damId:null, temperament:'Sweet', notes:'Strong maternal behavior', photos:[], img:'https://images.unsplash.com/photo-1608152579902-4f9f2e4f8090?auto=format&fit=crop&w=900&q=80' },
    { id:'r2', name:'Atlas', call:'At', reg:'Ratticly Atlas Crest', sex:'Buck', variety:'Standard', dob:'2025-02-10', status:'Active Breeder', breed:'Eligible', cage:'Buck-Alpha', weight:522, health:'Clear', availability:'Sold', line:'Crestline', genotype:'dd Rr Mm', traits:['agouti'], carriers:['dumbo'], sireId:null, damId:null, temperament:'Bold', notes:'Stable temperament', photos:[], img:'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=900&q=80' },
    { id:'r3', name:'Mochi', call:'Moch', reg:'Ratticly Mochi Haze', sex:'Doe', variety:'Velveteen Dumbo', dob:'2025-09-06', status:'Holdback', breed:'Pending', cage:'Growout-F2', weight:287, health:'Clear', availability:'Reserved', line:'Mintglass', genotype:'Dd Rr mm', traits:['dumbo','velveteen'], carriers:['rex'], sireId:'r2', damId:'r1', temperament:'Shy', notes:'Great coat', photos:[], img:'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=900&q=80' }
  ],
  litters:[{id:'l1',code:'LIT-2603-NEB',sireId:'r2',damId:'r1',born:'2026-03-01',alive:10,status:'In Nest'}],
  pairings:[{id:'p1',buckId:'r2',doeId:'r1',status:'Approved',goals:'Temperament stability + dumbo expression'}],
  weights:[{id:'w1',ratId:'r1',date:'2026-03-04',grams:391,notes:'Pregnancy check'}],
  healthRecords:[{id:'h1',ratId:'r1',date:'2026-03-05',diagnosis:'Mild URI watch',treatment:'Observe + humidity support'}],
  cages:[{id:'c1',name:'Maternity-2',room:'North Room',occupants:['r1'],lastClean:'2026-03-10',nextClean:'2026-03-13'}],
  inventory:[{id:'i1',name:'Lab blocks',qty:1.2,reorder:2,unit:'bags'}],
  reservations:[{id:'rs1',adopter:'Harper Lane',litterId:'l1',status:'Deposit paid'}],
  expenses:[{id:'ex1',date:'2026-03-02',category:'Bedding',amount:62.4,note:'Bulk order'}],
  feedings:[{id:'fd1',date:'2026-03-10',note:'Nursing doe protein boost'}],
  tasks:[{id:'t1',label:'Weigh litter LIT-2603-NEB',due:'2026-03-12'}],
  journals:[{id:'j1',date:'2026-03-10',entry:'Observed excellent maternal behavior in Nova.'}],
  memorials:[{id:'m1',name:'Willow',date:'2025-12-02',note:'Foundation doe, deeply missed.'}],
  events:[{id:'e1',at:new Date().toISOString(),type:'system.seeded',summary:'Seed data loaded',entityType:'system',by:'system'}]
};

const db={
  data:null,
  load(){ const saved=localStorage.getItem(STORAGE_KEY); this.data=saved?JSON.parse(saved):structuredClone(seed); this.persist(); },
  persist(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data)); },
  currentUser(){ return this.data.users.find(u=>u.id===this.data.auth.currentUserId); },
  addEvent(type,summary,entityType,entityId){ this.data.events.unshift({id:`e${Date.now()}${Math.random().toString(16).slice(2,6)}`,at:new Date().toISOString(),type,summary,entityType,entityId,by:this.currentUser().name}); this.data.events=this.data.events.slice(0,220); this.persist(); }
};
const api={
  async latency(){ await new Promise(r=>setTimeout(r,70)); },
  ensureWrite(){ if(db.currentUser().role==='viewer') throw new Error('Viewer role cannot modify records.'); },
  async create(kind,payload){ await this.latency(); this.ensureWrite(); db.data[kind].push(payload); db.persist(); return payload; },
  async update(kind,id,patch){ await this.latency(); this.ensureWrite(); const it=db.data[kind].find(x=>x.id===id); if(!it) throw new Error('Record not found'); Object.assign(it,patch); db.persist(); return it; },
  async remove(kind,id){ await this.latency(); this.ensureWrite(); db.data[kind]=db.data[kind].filter(x=>x.id!==id); db.persist(); }
};

const $=(s)=>document.querySelector(s);
const make=(tag,html,c='')=>{const e=document.createElement(tag); if(c)e.className=c; e.innerHTML=html; return e;};
const byId=(k,id)=>db.data[k].find(x=>x.id===id);
const ratName=(id)=>byId('rats',id)?.name||'Unknown';
const reservationForRat=(ratId)=>db.data.reservations.find(r=>r.ratId===ratId);
const saleTagClass=(availability)=>{ const v=(availability||'').toLowerCase(); if(v.includes('sold')||v.includes('placed')) return 'sold'; if(v.includes('reserved')) return 'reserved'; if(v.includes('sale')||v.includes('available')) return 'sale'; return ''; };
const saleState=(availability)=>{ const c=saleTagClass(availability); if(c==='sale') return 'for sale'; if(c==='reserved') return 'reserved'; if(c==='sold') return 'sold'; return 'for sale'; };
const uid=(p)=>`${p}${Date.now()}${Math.floor(Math.random()*1000)}`;
const date=(d)=>new Date(d).toLocaleString();
const daysOld=(dob)=>Math.floor((Date.now()-new Date(dob).getTime())/86400000);
const profileTabs=['Overview','Genetics','Health','Weight','Breeding','Relationships','Litters','Temperament','Photos','Notes','Placement','Timeline'];
const dailyFocusItems=['Morning health sweep for respiratory watchlist','Weigh nursery litter and update growth trend','Refresh profile photos for available pairs','Validate pairing goals against this week outcomes'];

function notify(message,type='success'){
  const stack=$('#toast-stack');
  if(!stack) return;
  const toast=make('div',message,`toast ${type}`);
  stack.appendChild(toast);
  setTimeout(()=>toast.remove(),3200);
}

function computeMilestones(r){
  const d=daysOld(r.dob), out=[];
  if(d>=21&&d<35) out.push('weaning window');
  if(d>=56&&d<84) out.push('breeding-age check');
  if(d>=540&&d<700) out.push('retirement planning');
  const ws=db.data.weights.filter(w=>w.ratId===r.id).sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,2);
  if(ws.length===2 && Math.abs(ws[0].grams-ws[1].grams)>=30) out.push('weight shift alert');
  if(r.health==='Watchlist') out.push('health watch');
  return out;
}

function computeStats(){
  const rats=db.data.rats;
  const income=db.data.reservations.filter(r=>r.status.toLowerCase().includes('paid')).length*150;
  const expense=db.data.expenses.reduce((a,b)=>a+Number(b.amount||0),0);
  return [
    ['Total Rats',rats.length],['Bucks',rats.filter(r=>r.sex==='Buck').length],['Does',rats.filter(r=>r.sex==='Doe').length],['Pregnant',rats.filter(r=>r.status==='Pregnant').length],
    ['Litters',db.data.litters.length],['Pairings',db.data.pairings.length],['Health',db.data.healthRecords.length],['Tasks',db.data.tasks.length],['Cages',db.data.cages.length],
    ['Inventory Alerts',db.data.inventory.filter(i=>i.qty<=i.reorder).length],['Reservations',db.data.reservations.length],['Milestone Alerts',rats.filter(r=>computeMilestones(r).length).length],
    ['Income',`$${income.toFixed(0)}`],['Expenses',`$${expense.toFixed(0)}`],['P/L',`$${(income-expense).toFixed(0)}`]
  ];
}

function renderStats(){ const w=$('#stats-grid'); w.innerHTML=''; computeStats().forEach(([l,v])=>w.appendChild(make('article',`<div class="label">${l}</div><div class="value">${v}</div>`,'card stat'))); }
function renderEvents(){ const ul=$('#events-list'); ul.innerHTML=''; db.data.events.slice(0,14).forEach(e=>ul.appendChild(make('li',`<strong>${e.type}</strong> — ${e.summary} <span class="rat-sub">${date(e.at)} · ${e.by}</span>`))); }
function renderQuickAdd(){ const w=$('#quick-add-buttons'); w.innerHTML=''; ['rat','litter','pairing','weight','health','inventory','task','reservation','cage','expense','feeding','journal','memorial'].forEach(k=>{ const b=make('button',`Add ${k[0].toUpperCase()+k.slice(1)}`); b.className='qa-btn'; b.dataset.kind=k; w.appendChild(b); }); }
function renderFeaturedRat(){ const wrap=$('#featured-rat'); const r=db.data.rats[0]; if(!wrap||!r) return; wrap.innerHTML=`<img class="hero-photo" src="${r.img}" alt="${r.name}"><div class="hero-meta"><p class="badge">🌟 Featured Rat</p><h3>${r.name} <span class="badge">${r.status}</span></h3><p class="hero-note">${r.call} · ${r.reg}</p><div class="hero-stats"><span class="badge">${r.sex}</span><span class="badge">${r.variety}</span><span class="badge">${r.weight}g</span><span class="badge">Line: ${r.line}</span><span class="badge">${r.genotype||'n/a'}</span></div><p class="hero-note">${r.notes||''}</p></div>`; }
function renderDailyFocus(){ const ul=$('#daily-focus'); ul.innerHTML=dailyFocusItems.map(i=>`<li>${i}</li>`).join(''); }
function renderMilestones(){ const ul=$('#milestone-watch'); ul.innerHTML=''; db.data.rats.forEach(r=>{ const ms=computeMilestones(r); if(ms.length) ul.appendChild(make('li',`<strong>${r.name}</strong>: ${ms.join(', ')}`)); }); if(!ul.children.length) ul.innerHTML='<li>No active milestone alerts today.</li>'; }

function filteredRats(){ return db.data.rats.filter(r=>{ const t=`${r.name} ${r.call} ${r.reg} ${r.variety} ${r.line} ${r.cage}`.toLowerCase(); return (!state.ratQuery||t.includes(state.ratQuery))&&(state.ratStatus==='all'||r.status===state.ratStatus); }); }
function renderRats(){
  const cards=$('#rat-cards'), tb=$('#rat-table-body'); cards.innerHTML=''; tb.innerHTML='';
  filteredRats().forEach(r=>{
    const ms=computeMilestones(r);
    const card=make('article',`<img src="${r.img}" alt="${r.name}"><div class="rat-head"><h3>${r.name}</h3><span class="badge">${r.status}</span></div><p class="rat-sub">${r.call} • ${r.reg}</p><p class="rat-sub">${r.sex} • ${r.variety} • DOB ${r.dob}</p><p class="rat-sub">Cage ${r.cage} • ${r.weight}g • ${r.line}</p><div class="rat-tags"><span class="badge">${r.breed}</span><span class="badge ${r.health==='Watchlist'?'warn':'good'}">${r.health}</span><span class="badge sale-tag ${saleTagClass(r.availability)}">${r.availability}</span>${ms.length?`<span class="badge warn">${ms[0]}</span>`:''}</div>`,'card rat-card');
    card.dataset.id=r.id;
    card.addEventListener('click',()=>openRatDrawer(r.id));
    cards.appendChild(card);
    tb.appendChild(make('tr',`<td><button class="chip open-rat" data-id="${r.id}">${r.name}</button></td><td>${r.sex}</td><td>${r.variety}</td><td>${r.status}</td><td>${r.cage}</td><td>${r.weight}g</td>`));
  });
  document.querySelectorAll('.open-rat').forEach(b=>b.addEventListener('click',e=>{e.preventDefault(); openRatDrawer(b.dataset.id);}));
}

function renderLitters(){ const tb=$('#litter-table'); tb.innerHTML=''; db.data.litters.forEach(l=>tb.appendChild(make('tr',`<td>${l.code}</td><td>${ratName(l.sireId)}</td><td>${ratName(l.damId)}</td><td>${l.born}</td><td>${l.alive}</td><td>${l.status}</td>`))); }
function renderGenericLists(){
  $('#health-list').innerHTML=db.data.healthRecords.map(h=>`<li>${ratName(h.ratId)} — ${h.diagnosis} (${h.date})</li>`).join('');
  $('#housing-list').innerHTML=db.data.cages.map(c=>`<li>${c.name} (${c.room}) · occupants ${c.occupants.map(ratName).join(', ')||'none'} · clean ${c.nextClean}</li>`).join('');
  $('#inventory-list').innerHTML=db.data.inventory.map(i=>`<li>${i.name}: ${i.qty} ${i.unit} (reorder ${i.reorder})</li>`).join('');
  const saleRats=db.data.rats;
  const available=saleRats.filter(r=>saleState(r.availability)==='for sale');
  const reserved=saleRats.filter(r=>saleState(r.availability)==='reserved');
  const sold=saleRats.filter(r=>saleState(r.availability)==='sold');
  const mapPlacement=(r,next)=>{ const res=reservationForRat(r.id); const placementMeta=res?` · ${res.adopter}`:''; return `<li><span class="placement-meta"><span class="badge sale-tag ${saleTagClass(r.availability)}">${r.availability}</span> <strong>${r.name}</strong> · ${r.variety} · ${r.sex}${placementMeta}</span><span class="placement-actions"><button class="tiny-btn open-rat" data-id="${r.id}">Profile</button><button class="tiny-btn placement-move" data-id="${r.id}" data-next="${next}">Move to ${next}</button></span></li>`; };
  $('#placements-available').innerHTML=available.map(r=>mapPlacement(r,'Reserved')).join('')||'<li>No rats currently listed.</li>';
  $('#placements-reserved').innerHTML=reserved.map(r=>mapPlacement(r,'Sold')).join('')||'<li>No reserved rats.</li>';
  $('#placements-sold').innerHTML=sold.map(r=>mapPlacement(r,'For Sale')).join('')||'<li>No sold rats yet.</li>';
  const soldIncome=sold.length*150;
  $('#placements-summary').innerHTML=[['For Sale',available.length],['Reserved',reserved.length],['Sold / Placed',sold.length],['Placement Revenue (est.)',`$${soldIncome.toFixed(0)}`]].map(([k,v])=>`<div class="kpi"><span class="rat-sub">${k}</span><strong>${v}</strong></div>`).join('');

  const income=db.data.reservations.filter(r=>r.status.toLowerCase().includes('paid')).length*150;
  const expense=db.data.expenses.reduce((a,b)=>a+Number(b.amount||0),0);
  $('#finance-list').innerHTML=[`Income from placements: $${income.toFixed(2)}`,`Expenses logged: $${expense.toFixed(2)}`,`Profit/Loss: $${(income-expense).toFixed(2)}`,...db.data.expenses.slice(-4).map(e=>`${e.date} ${e.category}: $${Number(e.amount).toFixed(2)} (${e.note||''})`)].map(x=>`<li>${x}</li>`).join('');
  $('#task-list').innerHTML=db.data.tasks.map(t=>`<li>${t.label} — due ${t.due}</li>`).join('');
  $('#journal-list').innerHTML=db.data.journals.map(j=>`<li>${j.date}: ${j.entry}</li>`).join('');
  $('#reports-list').innerHTML=[`Average litter size: ${(db.data.litters.reduce((a,b)=>a+b.alive,0)/Math.max(1,db.data.litters.length)).toFixed(1)}`,`Health records count: ${db.data.healthRecords.length}`,`Inventory low-stock count: ${db.data.inventory.filter(i=>i.qty<=i.reorder).length}`,`Milestone alerts active: ${db.data.rats.filter(r=>computeMilestones(r).length).length}`].map(x=>`<li>${x}</li>`).join('');
  $('#memorials-list').innerHTML=db.data.memorials.map(m=>`<li>${m.name} — ${m.date}: ${m.note}</li>`).join('');
  $('#settings-list').innerHTML=[`Current user role: ${db.currentUser().role}`,`Theme: ${document.body.dataset.theme}`,`Storage key: ${STORAGE_KEY}`,`Rats tracked: ${db.data.rats.length}`,`Events stored: ${db.data.events.length}`,`Rat-linked reservations: ${db.data.reservations.filter(r=>r.ratId).length}`].map(x=>`<li>${x}</li>`).join('');
}

function parseGenotype(input){ const map={}; input.trim().split(/\s+/).filter(Boolean).forEach(p=>{ if(p.length===2) map[p[0].toUpperCase()]=p; }); return map; }
function locusOdds(a,b){ const gamA=[a[0],a[1]], gamB=[b[0],b[1]], counts={}; gamA.forEach(x=>gamB.forEach(y=>{ const g=[x,y].sort((m,n)=>m===m.toUpperCase()?-1:1).join(''); counts[g]=(counts[g]||0)+1; })); return Object.entries(counts).map(([g,c])=>({g,pct:Math.round((c/4)*100)})); }
function runGenetics(){ const a=parseGenotype($('#geno-a').value), b=parseGenotype($('#geno-b').value); const loci=[...new Set([...Object.keys(a),...Object.keys(b)])]; const out=$('#genetics-results'); out.innerHTML=''; if(!loci.length){ notify('Enter at least one locus for each parent.','warn'); return; } loci.forEach(l=>{ if(!a[l]||!b[l]) return out.appendChild(make('li',`${l}: insufficient data`)); out.appendChild(make('li',`${l}: ${locusOdds(a[l],b[l]).map(o=>`${o.g} ${o.pct}%`).join(' · ')}`)); }); }
function sharedAncestors(aId,bId,depth=3){ const anc=(id,d,s=new Set())=>{ if(!id||d===0) return s; const r=byId('rats',id); if(!r) return s; [r.sireId,r.damId].forEach(pid=>{ if(pid){ s.add(pid); anc(pid,d-1,s); } }); return s; }; const a=anc(aId,depth), b=anc(bId,depth); return [...a].filter(x=>b.has(x)); }
function coiEstimate(pair){ return Number((sharedAncestors(pair.buckId,pair.doeId,4).length*1.8).toFixed(1)); }
function traitProb(pair){ const b=byId('rats',pair.buckId), d=byId('rats',pair.doeId); if(!b||!d) return []; const t=[...new Set([...(b.traits||[]),...(d.traits||[]),...(b.carriers||[]),...(d.carriers||[])])]; return t.slice(0,5).map(x=>({trait:x,pct:(b.traits?.includes(x)&&d.traits?.includes(x))?75:(b.traits?.includes(x)||d.traits?.includes(x))?50:25})); }
function renderPairings(){ const w=$('#pairing-cards'); w.innerHTML=''; db.data.pairings.forEach(p=>w.appendChild(make('article',`<h3>${ratName(p.buckId)} × ${ratName(p.doeId)}</h3><p><span class="badge">${p.status}</span> <span class="badge">COI ~${coiEstimate(p)}%</span></p><p>${p.goals}</p><p>${traitProb(p).map(t=>`<span class="badge">${t.trait} ${t.pct}%</span>`).join(' ')}</p>`,'card'))); }

function ancestorsToDepth(rootId,depth){ const nodes=[],links=[]; function walk(id,l,x){ if(!id||l>depth) return; const r=byId('rats',id); if(!r) return; nodes.push({id:r.id,name:r.name,level:l,health:r.health,traits:r.traits||[],xHint:x}); [r.sireId,r.damId].forEach((pid,i)=>{ if(pid){ links.push({from:pid,to:r.id}); walk(pid,l+1,x+(i?1:-1)*(220/l)); } }); } walk(rootId,1,480); return {nodes,links}; }
function renderLineageGraph(){ const svg=$('#lineage-graph'); if(!svg) return; const depth=Number($('#lineage-depth').value), showHealth=$('#overlay-health').checked, showTraits=$('#overlay-traits').checked; const root=state.currentRatId||db.data.rats[0]?.id; if(!root){ svg.innerHTML=''; return; } const {nodes,links}=ancestorsToDepth(root,depth); svg.innerHTML=''; const pos={}; nodes.forEach(n=>pos[n.id]={x:Math.max(70,Math.min(890,n.xHint)), y:60+(n.level-1)*85}); links.forEach(l=>{ const a=pos[l.from],b=pos[l.to]; if(!a||!b) return; const line=document.createElementNS('http://www.w3.org/2000/svg','line'); line.setAttribute('x1',a.x); line.setAttribute('y1',a.y); line.setAttribute('x2',b.x); line.setAttribute('y2',b.y); svg.appendChild(line); }); nodes.forEach(n=>{ const g=document.createElementNS('http://www.w3.org/2000/svg','g'); g.style.cursor='pointer'; const c=document.createElementNS('http://www.w3.org/2000/svg','circle'); c.setAttribute('cx',pos[n.id].x); c.setAttribute('cy',pos[n.id].y); c.setAttribute('r',22); c.setAttribute('fill',showHealth&&n.health==='Watchlist'?'#ffd7df':'#eaf0ff'); c.setAttribute('stroke','#8ea0d8'); const t=document.createElementNS('http://www.w3.org/2000/svg','text'); t.setAttribute('x',pos[n.id].x); t.setAttribute('y',pos[n.id].y+4); t.setAttribute('text-anchor','middle'); t.setAttribute('font-size','10'); t.textContent=n.name; g.append(c,t); if(showTraits){ const tx=document.createElementNS('http://www.w3.org/2000/svg','text'); tx.setAttribute('x',pos[n.id].x); tx.setAttribute('y',pos[n.id].y+34); tx.setAttribute('text-anchor','middle'); tx.setAttribute('font-size','9'); tx.textContent=(n.traits||[]).slice(0,2).join(','); g.append(tx);} g.addEventListener('click',()=>openRatDrawer(n.id)); svg.appendChild(g); }); }

function openRatDrawer(id){ state.currentRatId=id; state.currentProfileTab='Overview'; $('#rat-drawer').classList.remove('hidden'); renderDrawer(); renderLineageGraph(); }
function drawerTabContent(r){ const litters=db.data.litters.filter(l=>l.sireId===r.id||l.damId===r.id), weights=db.data.weights.filter(w=>w.ratId===r.id), health=db.data.healthRecords.filter(h=>h.ratId===r.id); return { Overview:`<p><strong>${r.name}</strong> · ${r.sex} · ${r.variety}</p><p>${r.notes||''}</p><p><strong>Milestones:</strong> ${computeMilestones(r).join(', ')||'none'}</p>`, Genetics:`<p>Genotype: <strong>${r.genotype||'n/a'}</strong></p><p>Traits: ${(r.traits||[]).join(', ')||'n/a'}</p><p>Carriers: ${(r.carriers||[]).join(', ')||'n/a'}</p>`, Health:health.length?`<ul class="list">${health.map(h=>`<li>${h.date}: ${h.diagnosis}</li>`).join('')}</ul>`:'<p>No records.</p>', Weight:weights.length?`<ul class="list">${weights.map(w=>`<li>${w.date}: ${w.grams}g</li>`).join('')}</ul><p>Avg: ${Math.round(weights.reduce((a,b)=>a+b.grams,0)/weights.length)}g</p>`:'<p>No entries.</p>', Breeding:`<p>Eligibility: ${r.breed}</p><p>Pairings: ${db.data.pairings.filter(p=>p.buckId===r.id||p.doeId===r.id).length}</p>`, Relationships:`<p>Sire: ${ratName(r.sireId)}</p><p>Dam: ${ratName(r.damId)}</p>`, Litters:litters.length?`<ul class="list">${litters.map(l=>`<li>${l.code} (${l.status})</li>`).join('')}</ul>`:'<p>No litters.</p>', Temperament:`<p>${r.temperament||'No temperament notes.'}</p>`, Photos:`<img src="${r.img}" alt="${r.name}" style="width:100%;border-radius:12px;aspect-ratio:4/3;object-fit:cover;"><div class="field"><label>Upload memories (multiple images)</label><input id="photo-files" type="file" accept="image/*" multiple><button class="chip" id="upload-photos" type="button">Upload & Save</button></div><div class="gallery">${(r.photos||[]).map((p,i)=>`<figure><img src="${p.src}" alt="${r.name} memory ${i+1}"><figcaption>${p.label||('Memory '+(i+1))}</figcaption></figure>`).join('')}</div>`, Notes:`<textarea id="notes-edit" rows="5">${r.notes||''}</textarea><button id="save-notes" class="chip" type="button">Save Notes</button>`, Placement:`<p>${r.availability}</p>`, Timeline:`<label>Filter: <select id="timeline-filter"><option value="all">All</option><option value="weight">Weight</option><option value="health">Health</option><option value="rat">Rat changes</option><option value="media">Media</option></select></label><ul id="timeline-list" class="timeline"></ul>` }[state.currentProfileTab] || '<p>Empty.</p>'; }
function renderTimelineFiltered(r){ const filter=$('#timeline-filter')?.value||'all'; const ul=$('#timeline-list'); if(!ul) return; let events=db.data.events.filter(e=>e.entityId===r.id); if(filter==='weight') events=events.filter(e=>e.type.includes('weight')); if(filter==='health') events=events.filter(e=>e.type.includes('health')); if(filter==='rat') events=events.filter(e=>e.type.includes('rat.')); if(filter==='media') events=events.filter(e=>e.type.includes('media')); ul.innerHTML=events.slice(0,30).map(e=>`<li>${e.type} — ${e.summary} <span class="rat-sub">${date(e.at)}</span></li>`).join(''); }
async function uploadRatPhotos(r){ const input=$('#photo-files'); if(!input?.files?.length){ notify('Choose one or more photos first.','warn'); return; } const files=[...input.files].slice(0,15); const encoded=await Promise.all(files.map(file=>new Promise((res,rej)=>{ const fr=new FileReader(); fr.onload=()=>res({src:fr.result,label:`${new Date().toISOString().slice(0,10)} · ${file.name}`}); fr.onerror=rej; fr.readAsDataURL(file);}))); const photos=[...(r.photos||[]), ...encoded]; await api.update('rats',r.id,{photos}); db.addEvent('rat.media',`Uploaded ${encoded.length} photo(s) for ${r.name}`,'rat',r.id); rerender(); notify(`Saved ${encoded.length} photo(s) for ${r.name}.`); }
async function setRatAvailability(id,nextStatus){ const rat=byId('rats',id); if(!rat) return; const before=rat.availability||'Available'; try{ await api.update('rats',id,{availability:nextStatus}); db.addEvent('rat.placement.updated',`Placement changed for ${rat.name}: ${before} → ${nextStatus}`,'rat',id); rerender(); notify(`${rat.name} moved to ${nextStatus}.`); }catch(e){ notify(e.message,'error'); } }
async function deleteRat(id){ if(!confirm('Delete this rat?')) return; const backup=structuredClone(db.data.rats); db.data.rats=db.data.rats.filter(r=>r.id!==id); rerender(); try{ await api.remove('rats',id); db.addEvent('rat.deleted',`Deleted rat ${id}`,'rat',id); $('#rat-drawer').classList.add('hidden'); rerender(); notify('Rat deleted.','warn'); }catch(e){ db.data.rats=backup; notify(e.message,'error'); rerender(); } }
function renderDrawer(){ const r=byId('rats',state.currentRatId); if(!r) return; $('#drawer-body').innerHTML=`<h3>${r.name} <span class="badge">${r.status}</span></h3><div class="profile-tabs">${profileTabs.map(t=>`<button data-tab="${t}" class="${t===state.currentProfileTab?'active':''}">${t}</button>`).join('')}</div><div class="drawer-actions"><button class="chip" id="edit-rat">Edit</button><button class="chip" id="delete-rat">Delete</button></div>${drawerTabContent(r)}`; document.querySelectorAll('.profile-tabs button').forEach(b=>b.addEventListener('click',()=>{ state.currentProfileTab=b.dataset.tab; renderDrawer(); })); $('#edit-rat')?.addEventListener('click',()=>openForm('rat',r)); $('#delete-rat')?.addEventListener('click',()=>deleteRat(r.id)); $('#save-notes')?.addEventListener('click',async()=>{ await api.update('rats',r.id,{notes:$('#notes-edit').value}); db.addEvent('rat.updated',`Updated notes for ${r.name}`,'rat',r.id); rerender(); notify(`Notes saved for ${r.name}.`); }); $('#upload-photos')?.addEventListener('click',async()=>{ try{ await uploadRatPhotos(r);}catch(e){ alert(e.message);} }); $('#timeline-filter')?.addEventListener('change',()=>renderTimelineFiltered(r)); renderTimelineFiltered(r); }

function schema(kind,existing){
  const ratOpts=db.data.rats.map(r=>`<option value="${r.id}">${r.name}</option>`).join('');
  const litterOpts=db.data.litters.map(l=>`<option value="${l.id}">${l.code}</option>`).join('');
  const val=(k,d='')=>existing?.[k]??d;
  return {
    rat:`<div class="form-grid"><div class="field"><label>Name*</label><input name="name" value="${val('name')}" required></div><div class="field"><label>Sex*</label><select name="sex"><option ${val('sex')==='Doe'?'selected':''}>Doe</option><option ${val('sex')==='Buck'?'selected':''}>Buck</option></select></div><div class="field"><label>DOB*</label><input type="date" name="dob" value="${val('dob')}" required></div><div class="field"><label>Status*</label><input name="status" value="${val('status','Holdback')}" required></div><div class="field"><label>Availability*</label><select name="availability"><option ${val('availability','Available')==='Available'?'selected':''}>Available</option><option ${val('availability')==='For Sale'?'selected':''}>For Sale</option><option ${val('availability')==='Reserved'?'selected':''}>Reserved</option><option ${val('availability')==='Sold'?'selected':''}>Sold</option></select></div><div class="field"><label>Cage</label><input name="cage" value="${val('cage','Unassigned')}"></div><div class="field full"><label>Variety*</label><input name="variety" value="${val('variety')}" required></div><div class="field"><label>Line</label><input name="line" value="${val('line','Unassigned')}"></div><div class="field"><label>Temperament</label><input name="temperament" value="${val('temperament','')}"></div><div class="field full"><label>Genotype</label><input name="genotype" value="${val('genotype','')}" placeholder="Dd rr Mm"></div></div>`,
    litter:`<div class="form-grid"><div class="field"><label>Code*</label><input name="code" required></div><div class="field"><label>Born*</label><input type="date" name="born" required></div><div class="field"><label>Sire*</label><select name="sireId">${ratOpts}</select></div><div class="field"><label>Dam*</label><select name="damId">${ratOpts}</select></div><div class="field"><label>Alive*</label><input type="number" name="alive" min="0" required></div><div class="field"><label>Status*</label><input name="status" value="In Nest" required></div></div>`,
    pairing:`<div class="form-grid"><div class="field"><label>Buck*</label><select name="buckId">${ratOpts}</select></div><div class="field"><label>Doe*</label><select name="doeId">${ratOpts}</select></div><div class="field full"><label>Goals*</label><input name="goals" required></div></div>`,
    weight:`<div class="form-grid"><div class="field"><label>Rat*</label><select name="ratId">${ratOpts}</select></div><div class="field"><label>Date*</label><input type="date" name="date" required></div><div class="field"><label>Grams*</label><input type="number" name="grams" min="1" required></div><div class="field full"><label>Notes</label><input name="notes"></div></div>`,
    health:`<div class="form-grid"><div class="field"><label>Rat*</label><select name="ratId">${ratOpts}</select></div><div class="field"><label>Date*</label><input type="date" name="date" required></div><div class="field full"><label>Diagnosis*</label><input name="diagnosis" required></div><div class="field full"><label>Treatment*</label><textarea name="treatment" required></textarea></div></div>`,
    inventory:`<div class="form-grid"><div class="field"><label>Item*</label><input name="name" required></div><div class="field"><label>Unit*</label><input name="unit" value="units" required></div><div class="field"><label>Qty*</label><input type="number" step="0.1" name="qty" required></div><div class="field"><label>Reorder*</label><input type="number" step="0.1" name="reorder" required></div></div>`,
    task:`<div class="form-grid"><div class="field full"><label>Task*</label><input name="label" required></div><div class="field"><label>Due*</label><input type="date" name="due" required></div></div>`,
    reservation:`<div class="form-grid"><div class="field"><label>Adopter*</label><input name="adopter" value="${val('adopter','')}" required></div><div class="field"><label>Litter*</label><select name="litterId">${litterOpts}</select></div><div class="field"><label>Rat</label><select name="ratId"><option value="">Unassigned</option>${ratOpts}</select></div><div class="field"><label>Status*</label><select name="status"><option ${val('status','Deposit paid')==='Inquiry'?'selected':''}>Inquiry</option><option ${val('status','Deposit paid')==='Deposit paid'?'selected':''}>Deposit paid</option><option ${val('status')==='Reserved'?'selected':''}>Reserved</option><option ${val('status')==='Completed / Sold'?'selected':''}>Completed / Sold</option></select></div></div>`,
    cage:`<div class="form-grid"><div class="field"><label>Cage name*</label><input name="name" required></div><div class="field"><label>Room*</label><input name="room" required></div><div class="field"><label>Last cleaned*</label><input type="date" name="lastClean" required></div><div class="field"><label>Next clean*</label><input type="date" name="nextClean" required></div></div>`,
    expense:`<div class="form-grid"><div class="field"><label>Date*</label><input type="date" name="date" required></div><div class="field"><label>Category*</label><input name="category" required></div><div class="field"><label>Amount*</label><input type="number" step="0.01" name="amount" required></div><div class="field full"><label>Note</label><input name="note"></div></div>`,
    feeding:`<div class="form-grid"><div class="field"><label>Date*</label><input type="date" name="date" required></div><div class="field full"><label>Feeding note*</label><input name="note" required></div></div>`,
    journal:`<div class="form-grid"><div class="field"><label>Date*</label><input type="date" name="date" required></div><div class="field full"><label>Journal entry*</label><textarea name="entry" required></textarea></div></div>`,
    memorial:`<div class="form-grid"><div class="field"><label>Name*</label><input name="name" required></div><div class="field"><label>Date*</label><input type="date" name="date" required></div><div class="field full"><label>Memorial note*</label><textarea name="note" required></textarea></div></div>`
  }[kind];
}
function validate(kind,d){ if(kind==='litter'&&d.sireId===d.damId) return 'Sire and dam cannot be identical.'; if(kind==='pairing'&&d.buckId===d.doeId) return 'Buck and doe must differ.'; return ''; }
function openForm(kind,existing=null){ $('#form-error').textContent=''; $('#quick-add-title').textContent=`${existing?'Edit':'Add'} ${kind}`; $('#quick-add-form').dataset.kind=kind; $('#quick-add-form').dataset.editId=existing?.id||''; $('#quick-add-form').innerHTML=schema(kind,existing); $('#quick-add-modal').showModal(); }

async function submitForm(kind,data,editId){
  const push = async (k,obj,label,etype='generic')=>{ await api.create(k,obj); db.addEvent(`${k}.created`,label,etype,obj.id); };
  if(kind==='rat'){
    const cur=byId('rats',editId);
    const payload={...(cur||{}),id:editId||uid('r'),name:data.name,call:data.name,reg:data.name,sex:data.sex,dob:data.dob,status:data.status,variety:data.variety,genotype:data.genotype||'',breed:cur?.breed||'Pending',cage:data.cage||cur?.cage||'Unassigned',weight:cur?.weight||0,health:cur?.health||'Clear',availability:data.availability||cur?.availability||'Available',line:data.line||cur?.line||'Unassigned',traits:cur?.traits||[],carriers:cur?.carriers||[],sireId:cur?.sireId||null,damId:cur?.damId||null,temperament:data.temperament||cur?.temperament||'',notes:cur?.notes||'',photos:cur?.photos||[],img:cur?.img||'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=900&q=80'};
    if(editId){ await api.update('rats',editId,payload); db.addEvent('rat.updated',`Updated rat ${payload.name}`,'rat',editId); }
    else { await api.create('rats',payload); db.addEvent('rat.created',`Created rat ${payload.name}`,'rat',payload.id); }
  }
  if(kind==='litter') await push('litters',{id:uid('l'),...data,alive:Number(data.alive)},`Added litter ${data.code}`,'litter');
  if(kind==='pairing') await push('pairings',{id:uid('p'),...data,status:'Under Review'},`Planned pairing ${ratName(data.buckId)}×${ratName(data.doeId)}`,'pairing');
  if(kind==='weight'){ const x={id:uid('w'),...data,grams:Number(data.grams)}; await push('weights',x,`Logged ${x.grams}g for ${ratName(x.ratId)}`,'rat'); await api.update('rats',x.ratId,{weight:x.grams}); }
  if(kind==='health'){ const x={id:uid('h'),...data}; await push('healthRecords',x,`Health record for ${ratName(x.ratId)}`,'rat'); await api.update('rats',x.ratId,{health:'Watchlist'}); }
  if(kind==='inventory') await push('inventory',{id:uid('i'),...data,qty:Number(data.qty),reorder:Number(data.reorder)},`Inventory item ${data.name}`,'inventory');
  if(kind==='task') await push('tasks',{id:uid('t'),...data},`Task ${data.label}`,'task');
  if(kind==='reservation'){ const payload={id:uid('rs'),...data}; await push('reservations',payload,`Reservation for ${data.adopter}`,'reservation'); if(data.ratId){ const status=(data.status==='Completed / Sold')?'Sold':'Reserved'; await api.update('rats',data.ratId,{availability:status}); db.addEvent('rat.placement.updated',`Placement synced from reservation for ${ratName(data.ratId)}: ${status}`,'rat',data.ratId); } }
  if(kind==='cage') await push('cages',{id:uid('c'),...data,occupants:[]},`Cage ${data.name} added`,'cage');
  if(kind==='expense') await push('expenses',{id:uid('ex'),...data,amount:Number(data.amount)},`Expense ${data.category} $${Number(data.amount).toFixed(2)}`,'finance');
  if(kind==='feeding') await push('feedings',{id:uid('fd'),...data},`Feeding note added`,'feeding');
  if(kind==='journal') await push('journals',{id:uid('j'),...data},`Journal entry saved`,'journal');
  if(kind==='memorial') await push('memorials',{id:uid('m'),...data},`Memorial saved for ${data.name}`,'memorial');
}

function resetDemoData(){ if(!confirm('Reset all local data back to seeded demo records?')) return; db.data=structuredClone(seed); db.persist(); notify('Demo data reset complete.','warn'); rerender(); }
function exportJson(){ const blob=new Blob([JSON.stringify(db.data,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`ratticly-backup-${new Date().toISOString().slice(0,10)}.json`; a.click(); URL.revokeObjectURL(a.href); notify('Backup exported to JSON.'); }
function importJson(file){ const fr=new FileReader(); fr.onload=()=>{ try{ const obj=JSON.parse(fr.result); db.data=obj; db.persist(); db.addEvent('system.import','Imported backup JSON','system'); rerender(); notify('Backup imported successfully.'); }catch(e){ notify('Invalid JSON backup.','error'); } }; fr.readAsText(file); }

function renderAuth(){ const u=db.currentUser(); $('#auth-pill').textContent=`${u.name} (${u.role})`; $('#user-switcher').innerHTML=db.data.users.map(x=>`<option value="${x.id}" ${x.id===u.id?'selected':''}>${x.name}</option>`).join(''); }
function rerender(){ renderAuth(); renderFeaturedRat(); renderDailyFocus(); renderMilestones(); renderStats(); renderEvents(); renderQuickAdd(); renderRats(); renderLitters(); renderPairings(); renderLineageGraph(); renderGenericLists(); if(state.currentRatId) renderDrawer(); }

function wire(){
  document.querySelectorAll('.nav-item').forEach(btn=>btn.addEventListener('click',()=>{ document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active')); document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active')); btn.classList.add('active'); document.getElementById(btn.dataset.tab).classList.add('active'); }));
  $('#rat-search').addEventListener('input',e=>{ state.ratQuery=e.target.value.trim().toLowerCase(); renderRats(); });
  $('#global-search').addEventListener('input',e=>{ state.ratQuery=e.target.value.trim().toLowerCase(); $('#rat-search').value=e.target.value; renderRats(); });
  document.addEventListener('keydown',e=>{ if(e.key==='/' && document.activeElement?.tagName!=='INPUT' && document.activeElement?.tagName!=='TEXTAREA'){ e.preventDefault(); $('#global-search').focus(); } });
  $('#rat-status-filter').addEventListener('change',e=>{ state.ratStatus=e.target.value; renderRats(); });
  $('#view-toggle').addEventListener('click',e=>{ if(e.target.tagName!=='BUTTON') return; state.rosterView=e.target.dataset.view; document.querySelectorAll('#view-toggle button').forEach(b=>b.classList.toggle('active',b.dataset.view===state.rosterView)); $('#rat-cards').classList.toggle('hidden',state.rosterView==='table'); $('#rat-table-wrap').classList.toggle('hidden',state.rosterView!=='table'); });
  $('#rat-cards').addEventListener('click',e=>{ const card=e.target.closest('.rat-card'); if(card?.dataset?.id) openRatDrawer(card.dataset.id); });
  document.querySelectorAll('.placement-list').forEach(list=>list.addEventListener('click',e=>{ const open=e.target.closest('.open-rat'); if(open?.dataset?.id){ e.preventDefault(); openRatDrawer(open.dataset.id); return; } const move=e.target.closest('.placement-move'); if(move?.dataset?.id){ e.preventDefault(); setRatAvailability(move.dataset.id,move.dataset.next); } }));
  $('#drawer-close').addEventListener('click',()=>$('#rat-drawer').classList.add('hidden'));
  $('#open-quick-add').addEventListener('click',()=>openForm('rat'));
  $('#quick-add-buttons').addEventListener('click',e=>{ if(e.target.classList.contains('qa-btn')) openForm(e.target.dataset.kind); });
  $('#modal-close').addEventListener('click',()=>$('#quick-add-modal').close());
  $('#quick-add-form').addEventListener('submit',async e=>{ e.preventDefault(); const kind=e.currentTarget.dataset.kind, editId=e.currentTarget.dataset.editId||null; const data=Object.fromEntries(new FormData(e.currentTarget).entries()); const err=validate(kind,data); if(err){ $('#form-error').textContent=err; return; } let optimisticId=null; try{ if(!editId&&kind==='rat'){ optimisticId=uid('rtmp'); db.data.rats.push({id:optimisticId,name:data.name,call:data.name,reg:data.name,sex:data.sex,dob:data.dob,status:data.status,variety:data.variety,genotype:data.genotype||'',breed:'Pending',cage:'Unassigned',weight:0,health:'Clear',availability:'Available',line:'Unassigned',traits:[],carriers:[],sireId:null,damId:null,temperament:'',notes:'',photos:[],img:'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=900&q=80'}); rerender(); }
      await submitForm(kind,data,editId); if(optimisticId) db.data.rats=db.data.rats.filter(r=>r.id!==optimisticId); $('#quick-add-modal').close(); rerender(); notify(`${editId?'Updated':'Added'} ${kind} record.`);
    }catch(ex){ if(optimisticId) db.data.rats=db.data.rats.filter(r=>r.id!==optimisticId); $('#form-error').textContent=ex.message; notify(ex.message,'error'); rerender(); }
  });
  $('#theme-switcher').addEventListener('change',e=>{ document.body.dataset.theme=e.target.value; localStorage.setItem('ratticly-theme',e.target.value); });
  const saved=localStorage.getItem('ratticly-theme'); if(saved){ document.body.dataset.theme=saved; $('#theme-switcher').value=saved; }
  $('#user-switcher').addEventListener('change',e=>{ db.data.auth.currentUserId=e.target.value; db.persist(); rerender(); });
  $('#lineage-depth').addEventListener('input',renderLineageGraph); $('#overlay-health').addEventListener('change',renderLineageGraph); $('#overlay-traits').addEventListener('change',renderLineageGraph); $('#run-genetics').addEventListener('click',runGenetics);
  $('#export-json').addEventListener('click',exportJson);
  $('#import-json').addEventListener('change',e=>{ const f=e.target.files?.[0]; if(f) importJson(f); });
  $('#reset-demo').addEventListener('click',resetDemoData);
}

function init(){ db.load(); wire(); rerender(); }
init();
