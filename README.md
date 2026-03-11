# Ratticly

Ratticly is a modern breeder management concept app for fancy rat ratteries: life records, genetics tracking, pairing planning, litter outcomes, inventory, and care operations in a polished luxury dashboard style.

## What is now included

This repository now contains a **working front-end prototype** with:

- a luxury pastel + glass dashboard shell
- left-tab navigation for key breeder modules
- dashboard quick stats + upcoming events + quick-add panel
- rat roster cards
- litter overview table
- pairing planner cards
- health, inventory, and task center snapshots

## Run locally

Because this is a static prototype, you can run it with any static file server.

Example:

```bash
python3 -m http.server 4173
```

Then open:

- `http://localhost:4173`

## Files

- `index.html` — app structure + module sections
- `app.css` — luxury pastel visual theme and responsive layout
- `app.js` — sample breeder data and tab interactions
- `docs/product-spec.md` — broader product direction and feature inventory
- `docs/data-model.md` — relational schema draft
- `docs/implementation-plan.md` — phased delivery plan

## Next build steps

- Move static sample arrays into API-backed models
- Add create/edit modal flows for Rat, Litter, Pairing, Health, Inventory
- Implement true lineage graph rendering and genetics calculators
- Add authentication, role controls, and persistence
