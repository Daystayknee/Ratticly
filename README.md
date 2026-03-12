# Ratticly

Ratticly is a modern breeder management concept app for fancy rat ratteries: life records, genetics tracking, pairing planning, litter outcomes, inventory, placements, finance, and care operations in a polished luxury dashboard style.

## Current Prototype Scope

This repository contains a runnable **interactive** luxury dashboard prototype with:

- clean white card panels on ambient pastel glows
- glass-style overlays, rounded corners, soft shadows, elegant status badges
- full left-sidebar ecosystem tabs (Dashboard through Settings)
- dashboard widgets: quick stats, events timeline, pregnancy rings, alert feed, mini growth charts, quick-add panel
- rat roster with search, status filtering, card/table view toggle, and click-to-open profile drawer
- quick-add modal interactions and lineage chip interactions
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

- `index.html` — dashboard layout + all major tabs + modal/drawer containers
- `app.css` — luxury theme system, responsive layout, cards, badges, rings, charts, and interactive states
- `app.js` — seeded breeder data + rendering, filtering, view toggles, tab/theme wiring, modal/drawer behavior
- `docs/product-spec.md` — product direction and feature inventory
- `docs/data-model.md` — relational schema draft
- `docs/implementation-plan.md` — phased roadmap

## What to Perfect Next (Detailed)

1. **Data architecture and persistence**
   - Move seeded arrays to real entities (`Rat`, `Litter`, `Pairing`, `HealthRecord`, `InventoryItem`, `Task`, `Reservation`, `Expense`).
   - Implement API + database reads/writes and timeline event logging for all mutations.
   - Add import/export (CSV/JSON) and auto-backup strategy.

2. **Real forms and validation**
   - Replace placeholder quick-add modal with production forms (add/edit rat, litter, pairing, weight, health, inventory, reservation).
   - Add validation rules (required fields, DOB logic, breeding age constraints, low-stock threshold bounds).
   - Support relational linking in forms (parents, offspring, cagemates, pairings, litters).

3. **Rat profile depth**
   - Build full profile tabs: Overview, Genetics, Health, Weight, Breeding, Relationships, Litters, Temperament, Photos, Notes, Placement, Timeline.
   - Add timeline UI with event grouping and filter chips (health, breeding, weight, ownership).
   - Implement photo gallery and profile hero cards.

4. **Genetics and lineage intelligence**
   - Replace static lineage mock with graph/tree renderer and ancestor depth controls.
   - Add COI calculations, trait probability outputs, and incompatible pairing warnings.
   - Add phenotypes/genotypes and carrier trait management.

5. **Operational automation**
   - Implement recurring reminders (feed/water, cage cleaning, medication, rechecks, due dates).
   - Add notification center and alert severities.
   - Add inventory usage trends and restock suggestions.

6. **Analytics and reporting**
   - Build report cards and charts from real data: survival rate, litter size trends, line health trends, cost trends, profitability.
   - Add printable/exportable pedigree sheets and monthly summaries.

7. **UX polish and accessibility**
   - Keyboard navigation across tabs/cards/modals.
   - Focus states, contrast checks across all theme modes.
   - Smooth transitions and micro-animations for premium feel.
