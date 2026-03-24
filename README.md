# Ratticly

Ratticly is now a modern species-intelligent breeder management concept app: one shared dashboard framework with adaptive profiles for fancy rats, snakes, horses, and future species modules. It combines life records, genetics tracking, breeding workflows, offspring outcomes, husbandry, finance, and facility operations in a luxury dashboard style.

## Implemented now (expanded)

This build extends the prototype into a modular breeder OS:

- Dashboard with global KPIs, milestone watch, species boards, daily focus, featured animal, and event timeline
- Unified animal roster with card/table views, species filter, and adaptive profile drawer
- Offspring group tracking for litters, clutches, and foaling records
- Species-aware breeding plans, lineage graph, health, facilities, inventory, finance, tasks, journal, reports, memorials, and settings tabs
- Simulated API layer + multi-user roles (`owner`, `staff`, `viewer`) + mutation audit events
- Quick-add forms for animals, offspring groups, measurements, health, facilities, tasks, expenses, and journals
- Species profile engine with terminology, widgets, and alert logic for rats, snakes, and horses
- Adaptive milestones such as respiratory watch, pre-lay shed monitoring, and foaling prep
- Backup controls:
  - export datastore as JSON
  - import datastore JSON

## Run locally

```bash
python3 -m http.server 4173 --directory /workspace/Ratticly
```

Open `http://localhost:4173`.

## Core files

- `index.html` — multi-species app shell, tabs, filters, modal, drawer, and graph controls
- `app.css` — luxury visual system, species cards, adaptive drawer styling, graph styling, responsive behavior
- `app.js` — species profile engine, datastore, simulated API/auth, adaptive roster, quick-add flows, lineage graph, milestones, and summaries
- `docs/product-spec.md` — product direction and feature inventory
- `docs/data-model.md` — relational schema draft
- `docs/implementation-plan.md` — phased roadmap
