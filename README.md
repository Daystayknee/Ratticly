# Ratticly

Ratticly is a modern breeder management concept app for fancy rat ratteries: life records, genetics tracking, pairing planning, litter outcomes, inventory, placements, finance, and care operations in a polished luxury dashboard style.

## Current Prototype Scope

This repository contains a runnable static luxury dashboard prototype with:

- clean white card panels on ambient pastel glows
- glass-style overlays, rounded corners, soft shadows, elegant status badges
- left sidebar tabbed navigation for full ecosystem modules
- dashboard widgets (stats, timeline, pregnancy rings, growth charts, alerts, quick-add)
- rat roster profile cards with filter chips
- litter, pairing, lineage, health, housing, inventory, placements, finance, tasks, reports, memorials, and settings tabs
- built-in theme modes:
  - Cloudmilk
  - Berry Pastel
  - Mint Glass
  - Cream Candy
  - Dark Luxe Breeder Mode

## Run locally

```bash
python3 -m http.server 4173 --directory /workspace/Ratticly
```

Open `http://localhost:4173`.

## Files

- `index.html` — dashboard layout + all major tabs
- `app.css` — luxury theme system, responsive layout, cards, badges, rings, spark charts
- `app.js` — seeded breeder data + rendering for widgets and tab interactions
- `docs/product-spec.md` — product direction and feature inventory
- `docs/data-model.md` — relational schema draft
- `docs/implementation-plan.md` — phased roadmap
