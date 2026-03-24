const STORAGE_KEY = 'ratticly-store-v6';

const state = {
  animalQuery: '',
  animalStatus: 'all',
  animalSpecies: 'all',
  rosterView: 'cards',
  currentAnimalId: null,
  currentProfileTab: 'Overview'
};

const SPECIES_PROFILES = {
  rat: {
    key: 'rat',
    label: 'Fancy Rats',
    shortLabel: 'Rat',
    accent: 'species-rat',
    terminology: { group: 'Litter', offspring: 'Pups', breeding: 'Pairing', enclosure: 'Cage' },
    trackingFocus: ['Respiratory watch', 'Tumor mapping', 'Maternal score', 'Litter growth curve']
  },
  snake: {
    key: 'snake',
    label: 'Snakes',
    shortLabel: 'Snake',
    accent: 'species-snake',
    terminology: { group: 'Clutch', offspring: 'Hatchlings', breeding: 'Lock', enclosure: 'Rack' },
    trackingFocus: ['Shed quality', 'Feeding response', 'Ovulation timeline', 'Incubation parameters']
  },
  horse: {
    key: 'horse',
    label: 'Horses',
    shortLabel: 'Horse',
    accent: 'species-horse',
    terminology: { group: 'Foaling', offspring: 'Foals', breeding: 'Covering', enclosure: 'Stall' },
    trackingFocus: ['Body condition score', 'Farrier schedule', 'Cycle tracking', 'Foaling readiness']
  }
};

const profileTabs = [
  'Overview',
  'Identity & Phenotype',
  'Physical Tracking',
  'Reproduction',
  'Genetics & Pedigree',
  'Health',
  'Husbandry',
  'Feeding & Output',
  'Behavior & Temperament',
  'Offspring',
  'Sales/Performance',
  'Files & Timeline'
];

const seed = {
  auth: { currentUserId: 'u1' },
  users: [
    { id: 'u1', name: 'Owner Admin', role: 'owner' },
    { id: 'u2', name: 'Caretaker Jess', role: 'staff' },
    { id: 'u3', name: 'Viewer Kit', role: 'viewer' }
  ],
  animals: [
    {
      id: 'a1',
      species: 'rat',
      name: 'Nova',
      reg: 'Ratticly Nova Bloom',
      sex: 'Doe',
      breed: 'Fancy Rat',
      variety: 'Rex Dumbo',
      line: 'Velvet Aurora',
      genotype: 'Dd rr Mm',
      traits: ['dumbo', 'rex'],
      carriers: ['mink'],
      dob: '2025-04-12',
      status: 'Pregnant',
      role: 'Active breeder',
      breedingStatus: 'Pregnant',
      health: 'Watchlist',
      availability: 'Reserved',
      location: 'Maternity-2',
      weight: 391,
      metricUnit: 'g',
      conditionScore: 'Good',
      dueDate: '2026-03-26',
      img: 'https://images.unsplash.com/photo-1608152579902-4f9f2e4f8090?auto=format&fit=crop&w=900&q=80',
      notes: 'Excellent maternal behavior.',
      temperament: 'Sweet',
      sireId: 'a2',
      damId: null,
      tracking: {
        identity: ['Call name: Novie', 'Markings: white blaze', 'Microchip: n/a'],
        physical: ['Respiratory signs: mild intermittent sneeze', 'Tumor map: none', 'Hydration: normal'],
        reproduction: ['Pairing date: 2026-02-28', 'Expected litter window: this week', 'Maternal score: 9/10'],
        health: ['URI watch started 2026-03-05'],
        husbandry: ['Deep clean cadence: every 3 days', 'Roommate status: solo maternity setup'],
        feeding: ['Protein support feed', 'Output normal'],
        behavior: ['Nest-building active', 'Handling tolerance high'],
        sales: ['Holdback candidate with optional reservation backup'],
        files: ['Registration PDF pending upload']
      }
    },
    {
      id: 'a2',
      species: 'rat',
      name: 'Atlas',
      reg: 'Ratticly Atlas Crest',
      sex: 'Buck',
      breed: 'Fancy Rat',
      variety: 'Standard Agouti',
      line: 'Crestline',
      genotype: 'dd Rr Mm',
      traits: ['agouti'],
      carriers: ['dumbo'],
      dob: '2025-02-10',
      status: 'Active Breeder',
      role: 'Foundation sire',
      breedingStatus: 'Ready',
      health: 'Clear',
      availability: 'Placed',
      location: 'Buck-Alpha',
      weight: 522,
      metricUnit: 'g',
      conditionScore: 'Excellent',
      dueDate: '',
      img: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=900&q=80',
      notes: 'Stable temperament and consistent conformation.',
      temperament: 'Bold',
      sireId: null,
      damId: null,
      tracking: {
        identity: ['Call name: At', 'Band/tag: n/a'],
        physical: ['Coat quality excellent', 'Incisor alignment normal'],
        reproduction: ['Sire success rate: high'],
        health: ['No chronic issues logged'],
        husbandry: ['Enrichment rotation: 48h'],
        feeding: ['High-protein block + fresh mix'],
        behavior: ['Confident with handling'],
        sales: ['Placed; breeder contract archived'],
        files: ['Transfer record complete']
      }
    },
    {
      id: 'a3',
      species: 'snake',
      name: 'Khaleesi',
      reg: 'Khaleesi of Mossglass',
      sex: 'Female',
      breed: 'Ball Python',
      variety: 'Pastel Het Clown',
      line: 'Mossglass',
      genotype: 'Pp Cc',
      traits: ['pastel'],
      carriers: ['clown'],
      dob: '2022-08-17',
      status: 'Gravid Watch',
      role: 'Active breeder',
      breedingStatus: 'Pre-lay shed window',
      health: 'Watchlist',
      availability: 'Not for sale',
      location: 'Rack-B12',
      weight: 1820,
      metricUnit: 'g',
      conditionScore: 'Stable',
      dueDate: '2026-04-02',
      img: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?auto=format&fit=crop&w=900&q=80',
      notes: 'Watching for clutch timeline trigger after pre-lay shed.',
      temperament: 'Calm',
      sireId: null,
      damId: null,
      tracking: {
        identity: ['Morph confirmation: pastel het clown'],
        physical: ['Shed quality: complete last cycle', 'Retained shed: none'],
        reproduction: ['Lock dates recorded', 'Pre-lay shed pending'],
        health: ['Feed refusal streak monitor'],
        husbandry: ['Humidity target: 65-70%', 'Hotspot: 88°F'],
        feeding: ['Frozen-thawed small rat', 'Recent refusals: 2'],
        behavior: ['Activity elevated in evening'],
        sales: ['Breeding hold'],
        files: ['Mite screen negative report']
      }
    },
    {
      id: 'a4',
      species: 'horse',
      name: 'Marigold',
      reg: 'Marigold Ember Lane',
      sex: 'Mare',
      breed: 'Warmblood',
      variety: 'Chestnut',
      line: 'Ember Lane',
      genotype: '',
      traits: ['scope', 'rideability'],
      carriers: [],
      dob: '2019-05-04',
      status: 'In Foal',
      role: 'Broodmare',
      breedingStatus: 'Foaling prep',
      health: 'Clear',
      availability: 'Retained',
      location: 'Foaling Stall 3',
      weight: 548,
      metricUnit: 'kg',
      conditionScore: 'BCS 5/9',
      dueDate: '2026-04-18',
      img: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=900&q=80',
      notes: 'Farrier due this week; foaling camera checks scheduled.',
      temperament: 'Forward but kind',
      sireId: null,
      damId: null,
      tracking: {
        identity: ['Discipline: dressage'],
        physical: ['Topline: improving', 'Hoof status: due trim'],
        reproduction: ['Foaling alarm active', 'Ultrasound confirmed'],
        health: ['Routine broodmare exam normal'],
        husbandry: ['Turnout split schedule', 'Night stall'],
        feeding: ['Broodmare ration + supplements'],
        behavior: ['Calm in foaling stall'],
        sales: ['Program foundation mare'],
        files: ['Registration + breeding contract scanned']
      }
    }
  ],
  offspringGroups: [
    { id: 'g1', species: 'rat', code: 'LIT-2603-NEB', sireId: 'a2', damId: 'a1', date: '2026-03-01', count: 10, status: 'In Nest' },
    { id: 'g2', species: 'snake', code: 'CLT-2604-KHA', sireId: null, damId: 'a3', date: '2026-04-02', count: 7, status: 'Expected' },
    { id: 'g3', species: 'horse', code: 'FOL-2604-MAR', sireId: null, damId: 'a4', date: '2026-04-18', count: 1, status: 'Expected' }
  ],
  pairings: [
    { id: 'p1', species: 'rat', sireId: 'a2', damId: 'a1', status: 'Approved', goals: 'Temperament stability + dumbo expression' },
    { id: 'p2', species: 'snake', sireId: 'a3', damId: null, status: 'Monitor', goals: 'Track gravid progression and clutch readiness' },
    { id: 'p3', species: 'horse', sireId: null, damId: 'a4', status: 'Monitor', goals: 'Foaling prep and postpartum plan' }
  ],
  measurements: [
    { id: 'm1', animalId: 'a1', date: '2026-03-04', value: 391, unit: 'g', label: 'Weight', notes: 'Pregnancy check' },
    { id: 'm2', animalId: 'a3', date: '2026-03-08', value: 1820, unit: 'g', label: 'Weight', notes: 'Post-feed body condition' },
    { id: 'm3', animalId: 'a4', date: '2026-03-09', value: 548, unit: 'kg', label: 'Weight', notes: 'Tape estimate' }
  ],
  healthRecords: [
    { id: 'h1', animalId: 'a1', date: '2026-03-05', diagnosis: 'Mild URI watch', treatment: 'Observe + humidity support' },
    { id: 'h2', animalId: 'a3', date: '2026-03-11', diagnosis: 'Feed refusal streak', treatment: 'Monitor weight and offer in 7 days' },
    { id: 'h3', animalId: 'a4', date: '2026-03-13', diagnosis: 'Routine broodmare exam', treatment: 'Continue nutrition plan' }
  ],
  facilities: [
    { id: 'f1', name: 'Maternity-2', kind: 'Cage', room: 'North Room', species: 'rat', occupants: ['a1'], nextCare: '2026-03-26' },
    { id: 'f2', name: 'Rack-B12', kind: 'Rack Tub', room: 'Reptile Room', species: 'snake', occupants: ['a3'], nextCare: '2026-03-24' },
    { id: 'f3', name: 'Foaling Stall 3', kind: 'Stall', room: 'Barn A', species: 'horse', occupants: ['a4'], nextCare: '2026-03-29' }
  ],
  inventory: [
    { id: 'i1', name: 'Lab blocks', qty: 1.2, reorder: 2, unit: 'bags' },
    { id: 'i2', name: 'Frozen rodents', qty: 3, reorder: 4, unit: 'packs' },
    { id: 'i3', name: 'Broodmare supplement', qty: 1, reorder: 1, unit: 'tubs' }
  ],
  sales: [
    { id: 's1', animalId: 'a2', customer: 'Harper Lane', status: 'Placed', amount: 150 },
    { id: 's2', animalId: 'a1', customer: 'Elena Moore', status: 'Reserved', amount: 50 },
    { id: 's3', animalId: 'a4', customer: 'Internal Program', status: 'Retained', amount: 0 }
  ],
  expenses: [
    { id: 'ex1', date: '2026-03-02', category: 'Bedding', amount: 62.4, note: 'Bulk order' },
    { id: 'ex2', date: '2026-03-06', category: 'Rodent feed', amount: 48, note: 'Protein restock' },
    { id: 'ex3', date: '2026-03-12', category: 'Farrier', amount: 165, note: 'Marigold trim cycle' }
  ],
  feedings: [
    { id: 'fd1', animalId: 'a1', date: '2026-03-15', note: 'Nursing support ration', response: 'Great appetite' },
    { id: 'fd2', animalId: 'a3', date: '2026-03-18', note: 'Offered small rat', response: 'Refused' },
    { id: 'fd3', animalId: 'a4', date: '2026-03-20', note: 'Broodmare concentrate', response: 'Complete intake' }
  ],
  behaviorLogs: [
    { id: 'b1', animalId: 'a1', date: '2026-03-19', note: 'Nest guarding increased but manageable' },
    { id: 'b2', animalId: 'a3', date: '2026-03-20', note: 'More exploratory movement at dusk' },
    { id: 'b3', animalId: 'a4', date: '2026-03-21', note: 'Calm stall behavior, responsive to handler' }
  ],
  reproductiveEvents: [
    { id: 'r1', animalId: 'a1', date: '2026-02-28', event: 'Pairing completed', detail: 'Observed successful mating' },
    { id: 'r2', animalId: 'a3', date: '2026-03-22', event: 'Pre-lay shed watch', detail: 'Window open' },
    { id: 'r3', animalId: 'a4', date: '2026-03-16', event: 'Foaling prep', detail: 'Alarm and kit checked' }
  ],
  tasks: [
    { id: 't1', label: 'Weigh litter LIT-2603-NEB', due: '2026-03-24', species: 'rat' },
    { id: 't2', label: 'Check Khaleesi humidity + pre-lay behavior', due: '2026-03-24', species: 'snake' },
    { id: 't3', label: 'Confirm Marigold foaling kit + camera', due: '2026-03-27', species: 'horse' }
  ],
  journals: [
    { id: 'j1', date: '2026-03-10', entry: 'Observed excellent maternal behavior in Nova.' },
    { id: 'j2', date: '2026-03-12', entry: 'Khaleesi skipped meal again; no weight loss yet.' },
    { id: 'j3', date: '2026-03-15', entry: 'Marigold moved into foaling barn and settled well.' }
  ],
  memorials: [{ id: 'mm1', name: 'Willow', date: '2025-12-02', note: 'Foundation doe, deeply missed.' }],
  events: [{ id: 'e1', at: new Date().toISOString(), type: 'system.seeded', summary: 'Seed data loaded', entityType: 'system', by: 'system' }]
};

const db = {
  data: null,
  load() {
    const saved = localStorage.getItem(STORAGE_KEY);
    this.data = saved ? JSON.parse(saved) : structuredClone(seed);
    this.persist();
  },
  persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  },
  currentUser() {
    return this.data.users.find((user) => user.id === this.data.auth.currentUserId);
  },
  addEvent(type, summary, entityType, entityId) {
    this.data.events.unshift({
      id: `e${Date.now()}${Math.random().toString(16).slice(2, 6)}`,
      at: new Date().toISOString(),
      type,
      summary,
      entityType,
      entityId,
      by: this.currentUser().name
    });
    this.data.events = this.data.events.slice(0, 250);
    this.persist();
  }
};

const api = {
  async latency() {
    await new Promise((resolve) => setTimeout(resolve, 60));
  },
  ensureWrite() {
    if (db.currentUser().role === 'viewer') throw new Error('Viewer role cannot modify records.');
  },
  async create(kind, payload) {
    await this.latency();
    this.ensureWrite();
    db.data[kind].push(payload);
    db.persist();
    return payload;
  },
  async update(kind, id, patch) {
    await this.latency();
    this.ensureWrite();
    const item = db.data[kind].find((entry) => entry.id === id);
    if (!item) throw new Error('Record not found.');
    Object.assign(item, patch);
    db.persist();
    return item;
  }
};

const $ = (selector) => document.querySelector(selector);
const make = (tag, html, className = '') => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.innerHTML = html;
  return element;
};
const byId = (kind, id) => db.data[kind].find((item) => item.id === id);
const animalName = (id) => byId('animals', id)?.name || 'Unknown';
const uid = (prefix) => `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
const formatDate = (value) => new Date(value).toLocaleString();
const daysOld = (dob) => Math.floor((Date.now() - new Date(dob).getTime()) / 86400000);

function getProfile(animal) {
  return SPECIES_PROFILES[animal.species] || SPECIES_PROFILES.rat;
}

function notify(message, type = 'success') {
  const stack = $('#toast-stack');
  if (!stack) return;
  const toast = make('div', message, `toast ${type}`);
  stack.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

function computeMilestones(animal) {
  const out = [];
  if (animal.health === 'Watchlist') out.push('health watch');
  if (animal.dueDate) out.push('due soon');
  if ((animal.breedingStatus || '').toLowerCase().includes('shed')) out.push('pre-lay shed');
  if ((animal.breedingStatus || '').toLowerCase().includes('foaling')) out.push('foaling prep');
  return out;
}

function speciesCounts() {
  return Object.values(SPECIES_PROFILES).map((profile) => {
    const animals = db.data.animals.filter((animal) => animal.species === profile.key);
    return {
      profile,
      animals,
      urgent: animals.filter((animal) => animal.health === 'Watchlist').length,
      breeding: animals.filter((animal) => /breeder|broodmare/i.test(animal.role)).length
    };
  });
}

function computeStats() {
  const animals = db.data.animals;
  const revenue = db.data.sales.reduce((sum, sale) => sum + Number(sale.amount || 0), 0);
  const expenses = db.data.expenses.reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  return [
    ['Total animals', animals.length],
    ['Active breeders', animals.filter((animal) => /breeder|broodmare|sire/i.test(animal.role)).length],
    ['Pregnant / Gravid / In foal', animals.filter((animal) => /pregnant|gravid|foal/i.test(animal.status)).length],
    ['Due events', animals.filter((animal) => Boolean(animal.dueDate)).length],
    ['Watchlist', animals.filter((animal) => animal.health === 'Watchlist').length],
    ['Offspring groups', db.data.offspringGroups.length],
    ['Facilities', db.data.facilities.length],
    ['Tasks', db.data.tasks.length],
    ['Inventory alerts', db.data.inventory.filter((item) => item.qty <= item.reorder).length],
    ['Revenue', `$${revenue.toFixed(0)}`],
    ['Expenses', `$${expenses.toFixed(0)}`],
    ['P/L', `$${(revenue - expenses).toFixed(0)}`]
  ];
}

function renderFeaturedAnimal() {
  const animal = db.data.animals[0];
  if (!animal) return;
  const profile = getProfile(animal);
  $('#featured-rat').innerHTML = `
    <img class="hero-photo" src="${animal.img}" alt="${animal.name}">
    <div class="hero-meta">
      <p class="badge ${profile.accent}">🌟 Featured ${profile.shortLabel}</p>
      <h3>${animal.name} <span class="badge">${animal.status}</span></h3>
      <p class="hero-note">${animal.reg} · ${animal.role}</p>
      <div class="hero-stats">
        <span class="badge">${profile.label}</span>
        <span class="badge">${animal.weight}${animal.metricUnit}</span>
        <span class="badge">${profile.terminology.enclosure}: ${animal.location}</span>
        <span class="badge">${profile.terminology.group} due: ${animal.dueDate || 'n/a'}</span>
      </div>
      <p class="hero-note">${animal.notes}</p>
    </div>
  `;
}

function renderStats() {
  const wrap = $('#stats-grid');
  wrap.innerHTML = '';
  computeStats().forEach(([label, value]) => {
    wrap.appendChild(make('article', `<div class="label">${label}</div><div class="value">${value}</div>`, 'card stat'));
  });
}

function renderDailyFocus() {
  $('#daily-focus').innerHTML = [
    'Review due reproductive windows and care tasks by species.',
    'Log at least one physical metric per high-value breeder.',
    'Resolve watchlist alerts before scheduling new pairings.',
    'Update facility sanitation and environment checks.'
  ].map((item) => `<li>${item}</li>`).join('');
}

function renderMilestones() {
  const list = $('#milestone-watch');
  list.innerHTML = '';
  db.data.animals.forEach((animal) => {
    const milestones = computeMilestones(animal);
    if (!milestones.length) return;
    list.appendChild(make('li', `<strong>${animal.name}</strong> (${getProfile(animal).shortLabel}): ${milestones.join(', ')}`));
  });
  if (!list.children.length) list.innerHTML = '<li>No milestone alerts currently.</li>';
}

function renderEvents() {
  $('#events-list').innerHTML = db.data.events.slice(0, 14).map((event) => (
    `<li><strong>${event.type}</strong> — ${event.summary} <span class="rat-sub">${formatDate(event.at)} · ${event.by}</span></li>`
  )).join('');
}

function renderQuickAdd() {
  const wrap = $('#quick-add-buttons');
  wrap.innerHTML = '';
  ['animal', 'offspringGroup', 'measurement', 'health', 'reproductiveEvent', 'feeding', 'behavior', 'facility', 'task', 'expense', 'journal']
    .forEach((kind) => {
      const button = make('button', `Add ${kind}`);
      button.className = 'qa-btn';
      button.dataset.kind = kind;
      wrap.appendChild(button);
    });
}

function renderSpeciesBoards() {
  const board = $('#species-board');
  board.innerHTML = '';
  speciesCounts().forEach(({ profile, animals, urgent, breeding }) => {
    board.appendChild(make('article', `
      <div class="species-header">
        <div>
          <p class="badge ${profile.accent}">${profile.label}</p>
          <h3>${animals.length} tracked</h3>
          <p class="rat-sub">${breeding} breeding-role · ${urgent} watchlist</p>
        </div>
        <button class="chip species-filter-btn" data-species="${profile.key}">Focus</button>
      </div>
      <div class="species-metrics">${profile.trackingFocus.map((focus) => `<span class="badge">${focus}</span>`).join('')}</div>
    `, `card species-card ${profile.accent}`));
  });
  document.querySelectorAll('.species-filter-btn').forEach((button) => {
    button.addEventListener('click', () => {
      state.animalSpecies = button.dataset.species;
      $('#animal-species-filter').value = state.animalSpecies;
      renderAnimals();
      notify(`Roster focused on ${SPECIES_PROFILES[state.animalSpecies].label}.`);
    });
  });
}

function filteredAnimals() {
  return db.data.animals.filter((animal) => {
    const q = `${animal.name} ${animal.reg} ${animal.breed} ${animal.variety} ${animal.location} ${animal.notes}`.toLowerCase();
    return (!state.animalQuery || q.includes(state.animalQuery))
      && (state.animalStatus === 'all' || animal.status === state.animalStatus)
      && (state.animalSpecies === 'all' || animal.species === state.animalSpecies);
  });
}

function renderAnimals() {
  const cards = $('#rat-cards');
  const tableBody = $('#rat-table-body');
  cards.innerHTML = '';
  tableBody.innerHTML = '';
  filteredAnimals().forEach((animal) => {
    const profile = getProfile(animal);
    const milestone = computeMilestones(animal)[0];
    const card = make('article', `
      <img src="${animal.img}" alt="${animal.name}">
      <div class="rat-head"><h3>${animal.name}</h3><span class="badge ${profile.accent}">${profile.shortLabel}</span></div>
      <p class="rat-sub">${animal.reg}</p>
      <p class="rat-sub">${animal.sex} · ${animal.breed} · ${animal.variety}</p>
      <p class="rat-sub">${profile.terminology.enclosure}: ${animal.location} · ${animal.weight}${animal.metricUnit}</p>
      <div class="rat-tags">
        <span class="badge">${animal.status}</span>
        <span class="badge ${animal.health === 'Watchlist' ? 'warn' : 'good'}">${animal.health}</span>
        <span class="badge">${animal.role}</span>
        ${milestone ? `<span class="badge warn">${milestone}</span>` : ''}
      </div>
    `, 'card rat-card');
    card.dataset.id = animal.id;
    cards.appendChild(card);

    tableBody.appendChild(make('tr',
      `<td><button class="chip open-animal" data-id="${animal.id}">${animal.name}</button></td><td>${profile.shortLabel}</td><td>${animal.sex}</td><td>${animal.variety}</td><td>${animal.status}</td><td>${animal.location}</td><td>${animal.weight}${animal.metricUnit}</td>`
    ));
  });

  document.querySelectorAll('.open-animal').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      openAnimalDrawer(button.dataset.id);
    });
  });
}

function renderOffspringGroups() {
  $('#litter-table').innerHTML = db.data.offspringGroups.map((group) => {
    const profile = SPECIES_PROFILES[group.species];
    return `<tr><td>${group.code}</td><td>${profile.shortLabel}</td><td>${animalName(group.sireId)}</td><td>${animalName(group.damId)}</td><td>${group.date}</td><td>${group.count}</td><td>${group.status}</td></tr>`;
  }).join('');
}

function renderPairings() {
  const wrap = $('#pairing-cards');
  wrap.innerHTML = '';
  db.data.pairings.forEach((pairing) => {
    const species = SPECIES_PROFILES[pairing.species];
    wrap.appendChild(make('article', `
      <p class="badge ${species.accent}">${species.label}</p>
      <h3>${animalName(pairing.sireId)} × ${animalName(pairing.damId)}</h3>
      <p><span class="badge">${pairing.status}</span></p>
      <p>${pairing.goals}</p>
      <p>${species.trackingFocus.map((item) => `<span class="badge">${item}</span>`).join(' ')}</p>
    `, 'card'));
  });
}

function splitPlacements() {
  const available = [];
  const reserved = [];
  const sold = [];
  db.data.sales.forEach((sale) => {
    const status = (sale.status || '').toLowerCase();
    if (status.includes('reserved')) reserved.push(sale);
    else if (status.includes('placed') || status.includes('sold') || status.includes('retained')) sold.push(sale);
    else available.push(sale);
  });
  return { available, reserved, sold };
}

function renderPlacements() {
  const { available, reserved, sold } = splitPlacements();
  const item = (sale, next) => `
    <li>
      <span class="placement-meta"><strong>${animalName(sale.animalId)}</strong> · ${sale.customer} · <span class="badge">${sale.status}</span></span>
      ${next ? `<span class="placement-actions"><button class="tiny-btn placement-move" data-id="${sale.id}" data-next="${next}">Move to ${next}</button></span>` : ''}
    </li>
  `;
  $('#placements-available').innerHTML = available.map((sale) => item(sale, 'Reserved')).join('') || '<li>No available listings.</li>';
  $('#placements-reserved').innerHTML = reserved.map((sale) => item(sale, 'Placed')).join('') || '<li>No reserved listings.</li>';
  $('#placements-sold').innerHTML = sold.map((sale) => item(sale, '')).join('') || '<li>No sold/placed records.</li>';

  const revenue = db.data.sales.reduce((sum, sale) => sum + Number(sale.amount || 0), 0);
  $('#placements-summary').innerHTML = [
    ['Available', available.length],
    ['Reserved', reserved.length],
    ['Placed/Sold/Retained', sold.length],
    ['Revenue', `$${revenue.toFixed(0)}`]
  ].map(([label, value]) => `<div class="kpi"><span class="rat-sub">${label}</span><strong>${value}</strong></div>`).join('');
}

function renderGenericLists() {
  $('#health-list').innerHTML = db.data.healthRecords.map((record) => `<li>${animalName(record.animalId)} — ${record.diagnosis} (${record.date})</li>`).join('');
  $('#housing-list').innerHTML = db.data.facilities.map((facility) => `<li>${facility.name} · ${facility.kind} · occupants ${facility.occupants.map(animalName).join(', ') || 'none'} · next care ${facility.nextCare}</li>`).join('');
  $('#inventory-list').innerHTML = db.data.inventory.map((item) => `<li>${item.name}: ${item.qty} ${item.unit} (reorder ${item.reorder})</li>`).join('');

  const revenue = db.data.sales.reduce((sum, sale) => sum + Number(sale.amount || 0), 0);
  const expenses = db.data.expenses.reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  $('#finance-list').innerHTML = [
    `Revenue logged: $${revenue.toFixed(2)}`,
    `Expenses logged: $${expenses.toFixed(2)}`,
    `Profit/Loss: $${(revenue - expenses).toFixed(2)}`,
    ...db.data.expenses.slice(-4).map((entry) => `${entry.date} ${entry.category}: $${Number(entry.amount).toFixed(2)} (${entry.note || ''})`)
  ].map((entry) => `<li>${entry}</li>`).join('');

  $('#task-list').innerHTML = db.data.tasks.map((task) => `<li>${task.label} — due ${task.due}</li>`).join('');
  $('#journal-list').innerHTML = db.data.journals.map((entry) => `<li>${entry.date}: ${entry.entry}</li>`).join('');
  $('#reports-list').innerHTML = [
    `Offspring groups tracked: ${db.data.offspringGroups.length}`,
    `Health records count: ${db.data.healthRecords.length}`,
    `Feeding logs count: ${db.data.feedings.length}`,
    `Behavior logs count: ${db.data.behaviorLogs.length}`,
    `Reproductive events: ${db.data.reproductiveEvents.length}`
  ].map((entry) => `<li>${entry}</li>`).join('');
  $('#memorials-list').innerHTML = db.data.memorials.map((entry) => `<li>${entry.name} — ${entry.date}: ${entry.note}</li>`).join('');
  $('#settings-list').innerHTML = [
    `Current user role: ${db.currentUser().role}`,
    `Theme: ${document.body.dataset.theme}`,
    `Storage key: ${STORAGE_KEY}`,
    `Animals tracked: ${db.data.animals.length}`,
    `Species profiles: ${Object.keys(SPECIES_PROFILES).length}`
  ].map((entry) => `<li>${entry}</li>`).join('');
}

function parseGenotype(input) {
  const loci = {};
  input.trim().split(/\s+/).filter(Boolean).forEach((pair) => {
    if (pair.length === 2) loci[pair[0].toUpperCase()] = pair;
  });
  return loci;
}

function locusOdds(a, b) {
  const gametesA = [a[0], a[1]];
  const gametesB = [b[0], b[1]];
  const counts = {};
  gametesA.forEach((geneA) => {
    gametesB.forEach((geneB) => {
      const genotype = [geneA, geneB].sort((left, right) => (left === left.toUpperCase() ? -1 : 1)).join('');
      counts[genotype] = (counts[genotype] || 0) + 1;
    });
  });
  return Object.entries(counts).map(([genotype, count]) => `${genotype} ${Math.round((count / 4) * 100)}%`);
}

function runGenetics() {
  const a = parseGenotype($('#geno-a').value);
  const b = parseGenotype($('#geno-b').value);
  const loci = [...new Set([...Object.keys(a), ...Object.keys(b)])];
  const results = $('#genetics-results');
  results.innerHTML = '';
  if (!loci.length) {
    notify('Enter at least one locus for each parent.', 'warn');
    return;
  }
  loci.forEach((locus) => {
    if (!a[locus] || !b[locus]) {
      results.appendChild(make('li', `${locus}: insufficient data`));
      return;
    }
    results.appendChild(make('li', `${locus}: ${locusOdds(a[locus], b[locus]).join(' · ')}`));
  });
}

function lineageNodes(rootId, depth) {
  const nodes = [];
  const links = [];
  const walk = (id, level, xHint) => {
    if (!id || level > depth) return;
    const animal = byId('animals', id);
    if (!animal) return;
    nodes.push({ id: animal.id, name: animal.name, level, health: animal.health, traits: animal.traits || [], xHint });
    [animal.sireId, animal.damId].forEach((parentId, index) => {
      if (!parentId) return;
      links.push({ from: parentId, to: animal.id });
      walk(parentId, level + 1, xHint + (index ? 1 : -1) * (220 / level));
    });
  };
  walk(rootId, 1, 480);
  return { nodes, links };
}

function renderLineageGraph() {
  const svg = $('#lineage-graph');
  if (!svg) return;
  const rootId = state.currentAnimalId || db.data.animals[0]?.id;
  if (!rootId) {
    svg.innerHTML = '';
    return;
  }
  const depth = Number($('#lineage-depth').value);
  const showHealth = $('#overlay-health').checked;
  const showTraits = $('#overlay-traits').checked;
  const { nodes, links } = lineageNodes(rootId, depth);
  const positions = {};
  svg.innerHTML = '';

  nodes.forEach((node) => {
    positions[node.id] = { x: Math.max(70, Math.min(890, node.xHint)), y: 60 + (node.level - 1) * 85 };
  });

  links.forEach((link) => {
    const source = positions[link.from];
    const target = positions[link.to];
    if (!source || !target) return;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', source.x);
    line.setAttribute('y1', source.y);
    line.setAttribute('x2', target.x);
    line.setAttribute('y2', target.y);
    svg.appendChild(line);
  });

  nodes.forEach((node) => {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.style.cursor = 'pointer';
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', positions[node.id].x);
    circle.setAttribute('cy', positions[node.id].y);
    circle.setAttribute('r', 22);
    circle.setAttribute('fill', showHealth && node.health === 'Watchlist' ? '#ffd7df' : '#eaf0ff');
    circle.setAttribute('stroke', '#8ea0d8');
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', positions[node.id].x);
    label.setAttribute('y', positions[node.id].y + 4);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('font-size', '10');
    label.textContent = node.name;
    group.append(circle, label);

    if (showTraits) {
      const trait = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      trait.setAttribute('x', positions[node.id].x);
      trait.setAttribute('y', positions[node.id].y + 36);
      trait.setAttribute('text-anchor', 'middle');
      trait.setAttribute('font-size', '8');
      trait.textContent = node.traits.slice(0, 2).join(', ');
      group.append(trait);
    }

    group.addEventListener('click', () => openAnimalDrawer(node.id));
    svg.appendChild(group);
  });
}

function relatedGroups(animalId) {
  return db.data.offspringGroups.filter((group) => group.sireId === animalId || group.damId === animalId);
}

function timelineEventsForAnimal(animalId) {
  return [
    ...db.data.events.filter((event) => event.entityId === animalId),
    ...db.data.healthRecords.filter((record) => record.animalId === animalId).map((record) => ({ type: 'health', at: record.date, summary: `${record.diagnosis} · ${record.treatment}` })),
    ...db.data.measurements.filter((entry) => entry.animalId === animalId).map((entry) => ({ type: 'measurement', at: entry.date, summary: `${entry.label} ${entry.value}${entry.unit}` })),
    ...db.data.feedings.filter((entry) => entry.animalId === animalId).map((entry) => ({ type: 'feeding', at: entry.date, summary: `${entry.note} · ${entry.response}` })),
    ...db.data.behaviorLogs.filter((entry) => entry.animalId === animalId).map((entry) => ({ type: 'behavior', at: entry.date, summary: entry.note })),
    ...db.data.reproductiveEvents.filter((entry) => entry.animalId === animalId).map((entry) => ({ type: 'reproduction', at: entry.date, summary: `${entry.event} · ${entry.detail}` }))
  ].sort((a, b) => new Date(b.at) - new Date(a.at));
}

function drawerTabContent(animal) {
  const profile = getProfile(animal);
  const measurements = db.data.measurements.filter((entry) => entry.animalId === animal.id);
  const health = db.data.healthRecords.filter((entry) => entry.animalId === animal.id);
  const feedings = db.data.feedings.filter((entry) => entry.animalId === animal.id);
  const behavior = db.data.behaviorLogs.filter((entry) => entry.animalId === animal.id);
  const reproduction = db.data.reproductiveEvents.filter((entry) => entry.animalId === animal.id);
  const offspring = relatedGroups(animal.id);
  const sale = db.data.sales.find((entry) => entry.animalId === animal.id);
  const tracking = animal.tracking || {};
  const timeline = timelineEventsForAnimal(animal.id);

  const list = (items) => (items?.length ? `<ul class="list">${items.map((item) => `<li>${item}</li>`).join('')}</ul>` : '<p>No entries.</p>');

  return {
    Overview: `
      <div class="drawer-hero ${profile.accent}">
        <img src="${animal.img}" alt="${animal.name}">
        <div>
          <p class="badge ${profile.accent}">${profile.label}</p>
          <h4>${animal.name} · ${animal.status}</h4>
          <p>${animal.role} · ${profile.terminology.enclosure}: ${animal.location}</p>
          <p><strong>Next due:</strong> ${animal.dueDate || 'No scheduled due item'}</p>
          <p>${animal.notes}</p>
        </div>
      </div>
      <div class="drawer-grid">
        <div class="mini-card"><span class="rat-sub">Condition</span><strong>${animal.conditionScore}</strong></div>
        <div class="mini-card"><span class="rat-sub">Breeding</span><strong>${animal.breedingStatus}</strong></div>
        <div class="mini-card"><span class="rat-sub">Health</span><strong>${animal.health}</strong></div>
        <div class="mini-card"><span class="rat-sub">Alerts</span><strong>${computeMilestones(animal).join(', ') || 'None'}</strong></div>
      </div>
    `,
    'Identity & Phenotype': list([
      `Registered name: ${animal.reg}`,
      `Species: ${profile.label}`,
      `Breed: ${animal.breed}`,
      `Variety/Phenotype: ${animal.variety}`,
      `Line: ${animal.line}`,
      `Age: ${daysOld(animal.dob)} days`,
      ...(tracking.identity || [])
    ]),
    'Physical Tracking': measurements.length
      ? `<ul class="list">${measurements.map((entry) => `<li>${entry.date}: ${entry.label} ${entry.value}${entry.unit} · ${entry.notes || ''}</li>`).join('')}</ul>${list(tracking.physical || [])}`
      : `${list(tracking.physical || [])}`,
    Reproduction: `${list([
      `Breeding status: ${animal.breedingStatus}`,
      `${profile.terminology.group} groups linked: ${offspring.length}`,
      ...reproduction.map((entry) => `${entry.date}: ${entry.event} · ${entry.detail}`),
      ...(tracking.reproduction || [])
    ])}`,
    'Genetics & Pedigree': list([
      `Genotype: ${animal.genotype || 'Not entered'}`,
      `Traits: ${(animal.traits || []).join(', ') || 'None'}`,
      `Carriers: ${(animal.carriers || []).join(', ') || 'None'}`,
      `Parents: ${animalName(animal.sireId)} × ${animalName(animal.damId)}`
    ]),
    Health: health.length
      ? `<ul class="list">${health.map((entry) => `<li>${entry.date}: ${entry.diagnosis} · ${entry.treatment}</li>`).join('')}</ul>${list(tracking.health || [])}`
      : list(tracking.health || []),
    Husbandry: list([
      `${profile.terminology.enclosure}: ${animal.location}`,
      ...(tracking.husbandry || [])
    ]),
    'Feeding & Output': feedings.length
      ? `<ul class="list">${feedings.map((entry) => `<li>${entry.date}: ${entry.note} · ${entry.response}</li>`).join('')}</ul>${list(tracking.feeding || [])}`
      : list(tracking.feeding || []),
    'Behavior & Temperament': behavior.length
      ? `<ul class="list">${behavior.map((entry) => `<li>${entry.date}: ${entry.note}</li>`).join('')}</ul>${list([`Temperament: ${animal.temperament}`, ...(tracking.behavior || [])])}`
      : list([`Temperament: ${animal.temperament}`, ...(tracking.behavior || [])]),
    Offspring: offspring.length
      ? `<ul class="list">${offspring.map((group) => `<li>${group.code} · ${group.status} · ${group.count} ${profile.terminology.offspring.toLowerCase()}</li>`).join('')}</ul>`
      : '<p>No offspring groups linked.</p>',
    'Sales/Performance': list([
      `Availability: ${animal.availability}`,
      sale ? `Sale status: ${sale.status} (${sale.customer})` : 'No sale record linked',
      ...(tracking.sales || [])
    ]),
    'Files & Timeline': `${list(tracking.files || [])}<ul class="timeline">${timeline.map((entry) => `<li><strong>${entry.type}</strong> — ${entry.summary} <span class="rat-sub">${entry.at}</span></li>`).join('') || '<li>No timeline events yet.</li>'}</ul>`
  }[state.currentProfileTab];
}

function openAnimalDrawer(id) {
  state.currentAnimalId = id;
  state.currentProfileTab = 'Overview';
  $('#rat-drawer').classList.remove('hidden');
  renderDrawer();
  renderLineageGraph();
}

function renderDrawer() {
  const animal = byId('animals', state.currentAnimalId);
  if (!animal) return;
  const profile = getProfile(animal);
  $('#drawer-body').innerHTML = `
    <h3>${animal.name} <span class="badge ${profile.accent}">${profile.shortLabel}</span></h3>
    <div class="profile-tabs">${profileTabs.map((tab) => `<button data-tab="${tab}" class="${tab === state.currentProfileTab ? 'active' : ''}">${tab}</button>`).join('')}</div>
    ${drawerTabContent(animal)}
  `;
  document.querySelectorAll('.profile-tabs button').forEach((button) => {
    button.addEventListener('click', () => {
      state.currentProfileTab = button.dataset.tab;
      renderDrawer();
    });
  });
}

function schema(kind) {
  const speciesOptions = Object.values(SPECIES_PROFILES).map((profile) => `<option value="${profile.key}">${profile.label}</option>`).join('');
  const animalOptions = db.data.animals.map((animal) => `<option value="${animal.id}">${animal.name}</option>`).join('');
  return {
    animal: `<div class="form-grid"><div class="field"><label>Name*</label><input name="name" required></div><div class="field"><label>Species*</label><select name="species">${speciesOptions}</select></div><div class="field"><label>Sex*</label><input name="sex" required></div><div class="field"><label>DOB*</label><input type="date" name="dob" required></div><div class="field"><label>Status*</label><input name="status" required></div><div class="field"><label>Breed*</label><input name="breed" required></div><div class="field full"><label>Variety*</label><input name="variety" required></div></div>`,
    offspringGroup: `<div class="form-grid"><div class="field"><label>Code*</label><input name="code" required></div><div class="field"><label>Species*</label><select name="species">${speciesOptions}</select></div><div class="field"><label>Date*</label><input type="date" name="date" required></div><div class="field"><label>Count*</label><input type="number" min="0" name="count" required></div><div class="field"><label>Sire</label><select name="sireId"><option value="">Unknown</option>${animalOptions}</select></div><div class="field"><label>Dam</label><select name="damId"><option value="">Unknown</option>${animalOptions}</select></div></div>`,
    measurement: `<div class="form-grid"><div class="field"><label>Animal*</label><select name="animalId">${animalOptions}</select></div><div class="field"><label>Date*</label><input type="date" name="date" required></div><div class="field"><label>Label*</label><input name="label" value="Weight" required></div><div class="field"><label>Value*</label><input type="number" step="0.1" name="value" required></div><div class="field"><label>Unit*</label><input name="unit" value="g" required></div><div class="field full"><label>Notes</label><input name="notes"></div></div>`,
    health: `<div class="form-grid"><div class="field"><label>Animal*</label><select name="animalId">${animalOptions}</select></div><div class="field"><label>Date*</label><input type="date" name="date" required></div><div class="field full"><label>Diagnosis*</label><input name="diagnosis" required></div><div class="field full"><label>Treatment*</label><textarea name="treatment" required></textarea></div></div>`,
    reproductiveEvent: `<div class="form-grid"><div class="field"><label>Animal*</label><select name="animalId">${animalOptions}</select></div><div class="field"><label>Date*</label><input type="date" name="date" required></div><div class="field"><label>Event*</label><input name="event" required></div><div class="field full"><label>Detail*</label><input name="detail" required></div></div>`,
    feeding: `<div class="form-grid"><div class="field"><label>Animal*</label><select name="animalId">${animalOptions}</select></div><div class="field"><label>Date*</label><input type="date" name="date" required></div><div class="field full"><label>Feeding note*</label><input name="note" required></div><div class="field full"><label>Response*</label><input name="response" required></div></div>`,
    behavior: `<div class="form-grid"><div class="field"><label>Animal*</label><select name="animalId">${animalOptions}</select></div><div class="field"><label>Date*</label><input type="date" name="date" required></div><div class="field full"><label>Behavior note*</label><textarea name="note" required></textarea></div></div>`,
    facility: `<div class="form-grid"><div class="field"><label>Name*</label><input name="name" required></div><div class="field"><label>Type*</label><input name="kind" required></div><div class="field"><label>Room*</label><input name="room" required></div><div class="field"><label>Species*</label><select name="species">${speciesOptions}</select></div><div class="field"><label>Next care*</label><input type="date" name="nextCare" required></div></div>`,
    task: `<div class="form-grid"><div class="field full"><label>Task*</label><input name="label" required></div><div class="field"><label>Species*</label><select name="species">${speciesOptions}</select></div><div class="field"><label>Due*</label><input type="date" name="due" required></div></div>`,
    expense: `<div class="form-grid"><div class="field"><label>Date*</label><input type="date" name="date" required></div><div class="field"><label>Category*</label><input name="category" required></div><div class="field"><label>Amount*</label><input type="number" step="0.01" name="amount" required></div><div class="field full"><label>Note</label><input name="note"></div></div>`,
    journal: `<div class="form-grid"><div class="field"><label>Date*</label><input type="date" name="date" required></div><div class="field full"><label>Entry*</label><textarea name="entry" required></textarea></div></div>`
  }[kind];
}

function openForm(kind) {
  $('#form-error').textContent = '';
  $('#quick-add-title').textContent = `Add ${kind}`;
  $('#quick-add-form').dataset.kind = kind;
  $('#quick-add-form').innerHTML = schema(kind);
  $('#quick-add-modal').showModal();
}

async function submitForm(kind, data) {
  if (kind === 'animal') {
    const profile = SPECIES_PROFILES[data.species];
    const animal = {
      id: uid('a'),
      species: data.species,
      name: data.name,
      reg: data.name,
      sex: data.sex,
      breed: data.breed,
      variety: data.variety,
      line: 'Unassigned',
      genotype: '',
      traits: [],
      carriers: [],
      dob: data.dob,
      status: data.status,
      role: 'Prospect',
      breedingStatus: 'Under review',
      health: 'Clear',
      availability: 'Available',
      location: `New ${profile.terminology.enclosure}`,
      weight: 0,
      metricUnit: data.species === 'horse' ? 'kg' : 'g',
      conditionScore: 'Pending',
      dueDate: '',
      img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=900&q=80',
      notes: '',
      temperament: '',
      sireId: null,
      damId: null,
      tracking: { identity: [], physical: [], reproduction: [], health: [], husbandry: [], feeding: [], behavior: [], sales: [], files: [] }
    };
    await api.create('animals', animal);
    db.addEvent('animal.created', `Created animal ${animal.name}`, 'animal', animal.id);
  }
  if (kind === 'offspringGroup') {
    const group = { id: uid('g'), ...data, count: Number(data.count), status: 'Planned' };
    await api.create('offspringGroups', group);
    db.addEvent('offspringGroup.created', `Added group ${group.code}`, 'offspringGroup', group.id);
  }
  if (kind === 'measurement') {
    const measurement = { id: uid('m'), ...data, value: Number(data.value) };
    await api.create('measurements', measurement);
    await api.update('animals', measurement.animalId, { weight: measurement.value, metricUnit: measurement.unit });
    db.addEvent('measurement.created', `Logged ${measurement.label} for ${animalName(measurement.animalId)}`, 'animal', measurement.animalId);
  }
  if (kind === 'health') {
    const record = { id: uid('h'), ...data };
    await api.create('healthRecords', record);
    await api.update('animals', record.animalId, { health: 'Watchlist' });
    db.addEvent('health.created', `Health event for ${animalName(record.animalId)}`, 'animal', record.animalId);
  }
  if (kind === 'reproductiveEvent') {
    const event = { id: uid('rp'), ...data };
    await api.create('reproductiveEvents', event);
    db.addEvent('reproduction.created', `Reproductive event for ${animalName(event.animalId)}`, 'animal', event.animalId);
  }
  if (kind === 'feeding') {
    const feeding = { id: uid('fd'), ...data };
    await api.create('feedings', feeding);
    db.addEvent('feeding.created', `Feeding log for ${animalName(feeding.animalId)}`, 'animal', feeding.animalId);
  }
  if (kind === 'behavior') {
    const behavior = { id: uid('bh'), ...data };
    await api.create('behaviorLogs', behavior);
    db.addEvent('behavior.created', `Behavior log for ${animalName(behavior.animalId)}`, 'animal', behavior.animalId);
  }
  if (kind === 'facility') {
    await api.create('facilities', { id: uid('f'), ...data, occupants: [] });
    db.addEvent('facility.created', `Added facility ${data.name}`, 'facility');
  }
  if (kind === 'task') {
    await api.create('tasks', { id: uid('t'), ...data });
    db.addEvent('task.created', `Created task ${data.label}`, 'task');
  }
  if (kind === 'expense') {
    await api.create('expenses', { id: uid('ex'), ...data, amount: Number(data.amount) });
    db.addEvent('expense.created', `Logged expense ${data.category}`, 'finance');
  }
  if (kind === 'journal') {
    await api.create('journals', { id: uid('j'), ...data });
    db.addEvent('journal.created', 'Journal entry saved', 'journal');
  }
}

async function movePlacementStatus(saleId, nextStatus) {
  const sale = byId('sales', saleId);
  if (!sale) return;
  try {
    await api.update('sales', saleId, { status: nextStatus });
    db.addEvent('placement.updated', `Placement moved for ${animalName(sale.animalId)}: ${nextStatus}`, 'sale', saleId);
    rerender();
    notify(`Placement updated to ${nextStatus}.`);
  } catch (error) {
    notify(error.message, 'error');
  }
}

function renderAuth() {
  const user = db.currentUser();
  $('#auth-pill').textContent = `${user.name} (${user.role})`;
  $('#user-switcher').innerHTML = db.data.users.map((entry) => `<option value="${entry.id}" ${entry.id === user.id ? 'selected' : ''}>${entry.name}</option>`).join('');
}

function rerender() {
  renderAuth();
  renderFeaturedAnimal();
  renderDailyFocus();
  renderMilestones();
  renderStats();
  renderEvents();
  renderQuickAdd();
  renderSpeciesBoards();
  renderAnimals();
  renderOffspringGroups();
  renderPairings();
  renderPlacements();
  renderGenericLists();
  renderLineageGraph();
  if (state.currentAnimalId) renderDrawer();
}

function wire() {
  document.querySelectorAll('.nav-item').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach((item) => item.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach((tab) => tab.classList.remove('active'));
      button.classList.add('active');
      document.getElementById(button.dataset.tab).classList.add('active');
    });
  });

  $('#rat-search').addEventListener('input', (event) => {
    state.animalQuery = event.target.value.trim().toLowerCase();
    renderAnimals();
  });
  $('#global-search').addEventListener('input', (event) => {
    state.animalQuery = event.target.value.trim().toLowerCase();
    $('#rat-search').value = event.target.value;
    renderAnimals();
  });
  $('#rat-status-filter').addEventListener('change', (event) => {
    state.animalStatus = event.target.value;
    renderAnimals();
  });
  $('#animal-species-filter').addEventListener('change', (event) => {
    state.animalSpecies = event.target.value;
    renderAnimals();
  });

  $('#view-toggle').addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') return;
    state.rosterView = event.target.dataset.view;
    document.querySelectorAll('#view-toggle button').forEach((button) => button.classList.toggle('active', button.dataset.view === state.rosterView));
    $('#rat-cards').classList.toggle('hidden', state.rosterView === 'table');
    $('#rat-table-wrap').classList.toggle('hidden', state.rosterView !== 'table');
  });

  $('#rat-cards').addEventListener('click', (event) => {
    const card = event.target.closest('.rat-card');
    if (card?.dataset.id) openAnimalDrawer(card.dataset.id);
  });

  document.querySelectorAll('.placement-list').forEach((list) => {
    list.addEventListener('click', (event) => {
      const move = event.target.closest('.placement-move');
      if (!move?.dataset.id) return;
      movePlacementStatus(move.dataset.id, move.dataset.next);
    });
  });

  $('#drawer-close').addEventListener('click', () => $('#rat-drawer').classList.add('hidden'));
  $('#open-quick-add').addEventListener('click', () => openForm('animal'));
  $('#quick-add-buttons').addEventListener('click', (event) => {
    if (event.target.classList.contains('qa-btn')) openForm(event.target.dataset.kind);
  });
  $('#modal-close').addEventListener('click', () => $('#quick-add-modal').close());

  $('#quick-add-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const kind = event.currentTarget.dataset.kind;
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      await submitForm(kind, data);
      $('#quick-add-modal').close();
      rerender();
      notify(`Added ${kind} record.`);
    } catch (error) {
      $('#form-error').textContent = error.message;
      notify(error.message, 'error');
    }
  });

  $('#theme-switcher').addEventListener('change', (event) => {
    document.body.dataset.theme = event.target.value;
    localStorage.setItem('ratticly-theme', event.target.value);
  });
  const savedTheme = localStorage.getItem('ratticly-theme');
  if (savedTheme) {
    document.body.dataset.theme = savedTheme;
    $('#theme-switcher').value = savedTheme;
  }

  $('#user-switcher').addEventListener('change', (event) => {
    db.data.auth.currentUserId = event.target.value;
    db.persist();
    rerender();
  });

  $('#lineage-depth').addEventListener('input', renderLineageGraph);
  $('#overlay-health').addEventListener('change', renderLineageGraph);
  $('#overlay-traits').addEventListener('change', renderLineageGraph);
  $('#run-genetics').addEventListener('click', runGenetics);

  $('#export-json').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(db.data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ratticly-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    notify('Backup exported to JSON.');
  });

  $('#import-json').addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        db.data = JSON.parse(reader.result);
        db.persist();
        rerender();
        notify('Backup imported successfully.');
      } catch {
        notify('Invalid JSON backup.', 'error');
      }
    };
    reader.readAsText(file);
  });
}

function init() {
  db.load();
  wire();
  rerender();
}

init();
