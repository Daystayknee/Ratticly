const stats = [
  ['Total Rats', 86],
  ['Bucks', 28],
  ['Does', 34],
  ['Pups', 24],
  ['Pregnant Does', 4],
  ['Litters in Nest', 3],
  ['Reserved', 11],
  ['Health Flags', 2],
];

const events = [
  'Tomorrow: Basil × Nova due date check',
  'Today 5pm: Cage deep clean (Nursery A)',
  'Fri: Weigh litter LIT-2403-NEB',
  'Sat: Pickup scheduled for 2 reserved pups',
];

const rats = [
  { name: 'Nova', sex: 'Doe', age: '9m', status: 'Pregnant', coat: 'Rex Dumbo', img: 'https://images.unsplash.com/photo-1608152579902-4f9f2e4f8090?auto=format&fit=crop&w=600&q=80' },
  { name: 'Atlas', sex: 'Buck', age: '11m', status: 'Active Breeder', coat: 'Standard Top Ear', img: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80' },
  { name: 'Mochi', sex: 'Doe', age: '5m', status: 'Holdback', coat: 'Velveteen Dumbo', img: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=600&q=80' },
];

const litters = [
  ['LIT-2403-NEB', 'Atlas', 'Nova', '2026-03-01', 9, 'In Nest'],
  ['LIT-2402-MNT', 'Clover', 'Ivy', '2026-02-18', 11, 'Weaning'],
  ['LIT-2401-CRM', 'Basil', 'Luna', '2026-01-22', 8, 'Placed'],
];

const pairings = [
  {
    title: 'Atlas × Mochi',
    score: 82,
    risks: 'Mild relatedness flag (Gen3), URI history low',
    goals: 'Improve dumbo rex temperament stability',
  },
  {
    title: 'Basil × Nova',
    score: 91,
    risks: 'No major conflicts; monitor maternal age timing',
    goals: 'Increase velveteen expression and social traits',
  },
];

const inventory = [
  'Lab blocks — 1 bag left (reorder now)',
  'Paper bedding — low stock alert',
  'Doxycycline — expires in 18 days',
  'Nesting fiber — healthy stock',
];

const tasks = [
  'Separate juvenile males (LIT-2402-MNT)',
  'Record weekly weights for holdbacks',
  'Add health follow-up note for Basil',
  'Post available pup cards for weekend placements',
];

function render() {
  const statsEl = document.getElementById('stats-grid');
  stats.forEach(([label, value]) => {
    const card = document.createElement('article');
    card.className = 'card stat';
    card.innerHTML = `<div class="label">${label}</div><div class="value">${value}</div>`;
    statsEl.appendChild(card);
  });

  const eventsEl = document.getElementById('events-list');
  events.forEach((event) => {
    const li = document.createElement('li');
    li.textContent = event;
    eventsEl.appendChild(li);
  });

  const ratsEl = document.getElementById('rat-cards');
  rats.forEach((rat) => {
    const card = document.createElement('article');
    card.className = 'card rat-card';
    card.innerHTML = `
      <img src="${rat.img}" alt="${rat.name}" />
      <h3>${rat.name}</h3>
      <div class="rat-meta"><span>${rat.sex} • ${rat.age}</span><span class="badge">${rat.status}</span></div>
      <p>${rat.coat}</p>
    `;
    ratsEl.appendChild(card);
  });

  const litterEl = document.getElementById('litter-table');
  litters.forEach((row) => {
    const tr = document.createElement('tr');
    tr.innerHTML = row.map((cell) => `<td>${cell}</td>`).join('');
    litterEl.appendChild(tr);
  });

  const pairingEl = document.getElementById('pairing-cards');
  pairings.forEach((item) => {
    const article = document.createElement('article');
    article.className = 'card';
    article.innerHTML = `
      <h3>${item.title}</h3>
      <p><strong>Compatibility:</strong> ${item.score}/100</p>
      <p><strong>Risk flags:</strong> ${item.risks}</p>
      <p><strong>Goals:</strong> ${item.goals}</p>
    `;
    pairingEl.appendChild(article);
  });

  const invEl = document.getElementById('inventory-list');
  inventory.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    invEl.appendChild(li);
  });

  const taskEl = document.getElementById('task-list');
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.textContent = task;
    taskEl.appendChild(li);
  });
}

function wireTabs() {
  const navItems = document.querySelectorAll('.nav-item');
  const tabs = document.querySelectorAll('.tab-content');

  navItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      navItems.forEach((b) => b.classList.remove('active'));
      tabs.forEach((tab) => tab.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
}

render();
wireTabs();
