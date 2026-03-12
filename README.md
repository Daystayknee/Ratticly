# Ratticly

Ratticly is a modern breeder management concept app for fancy rat ratteries: life records, genetics tracking, pairing planning, litter outcomes, inventory, placements, finance, and day-to-day operations in a luxury dashboard style.

## Implemented now (expanded)

This build extends the prototype to cover nearly all breeder workflow categories in-app:

- Dashboard with quick stats, milestone watch, daily focus, featured rat, and event timeline
- Rats roster with card/table views + deep profile drawer (12 tabs)
- Litters, Pairings, Lineage graph, Health, Housing, Inventory, Placements, Finance, Tasks, Journal, Reports, Memorials, and Settings tabs
- Simulated API layer + multi-user roles (`owner`, `staff`, `viewer`) + mutation audit events
- Create/edit/delete lifecycle for key records via quick-add forms and drawer controls
- Multi-image memory uploads per rat profile (stored in local datastore) with timeline media events
- Milestone tracking (weaning, breeding-age, retirement planning, health/weight watch)
- Genetics tools:
  - genotype parser
  - per-locus Punnett-style odds
  - pairing COI estimate
  - trait probability badges
- Backup controls:
  - export datastore as JSON
  - import datastore JSON

## Run locally

```bash
python3 -m http.server 4173 --directory /workspace/Ratticly
```

Open `http://localhost:4173`.

## Core files

- `index.html` — app shell, tabs, modal, drawer, graph controls
- `app.css` — luxury visual system, cards, overlays, graph/gallery styling, responsive behavior
- `app.js` — datastore, simulated API/auth, CRUD logic, lineage graph, genetics tools, milestones, memory uploads
- `docs/product-spec.md` — product direction and feature inventory
- `docs/data-model.md` — relational schema draft
- `docs/implementation-plan.md` — phased roadmap
