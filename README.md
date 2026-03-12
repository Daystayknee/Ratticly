# Ratticly

Ratticly is a modern breeder management concept app for fancy rat ratteries: life records, genetics tracking, pairing planning, litter outcomes, inventory, and operations in a luxury dashboard style.

## Implemented in this iteration

This build specifically advances the previously requested high-priority items:

1. **Real form workflows**
   - Replaced placeholder quick-add interactions with real forms for:
     - Rat
     - Litter
     - Pairing
     - Weight
     - Health
     - Inventory
     - Task
     - Reservation
   - Added validation and linked entity creation (for example sire/dam links, pairing rat links, weight/health linked to rat, reservation linked to litter).

2. **Backend-style data + event timeline (local prototype layer)**
   - Added a persisted client-side data store (localStorage) as an API/DB stand-in.
   - All mutations write to an event timeline (`events`) and immediately update widgets and views.

3. **Deep rat profile tabs**
   - Rat drawer now contains actual profile tabs:
     - Overview, Genetics, Health, Weight, Breeding, Relationships,
       Litters, Temperament, Photos, Notes, Placement, Timeline.

4. **Lineage + genetics intelligence**
   - Replaced static lineage text with interactive lineage branches.
   - Added simple COI estimation using shared ancestors.
   - Added trait probability badges on pairings.

## Run locally

```bash
python3 -m http.server 4173 --directory /workspace/Ratticly
```

Open `http://localhost:4173`.

## Files

- `index.html` — dashboard shell, tabs, profile drawer, and quick-add modal
- `app.css` — luxury visual system and interactive layout styles
- `app.js` — data store, renderers, forms, validation, linked creation, and event timeline
- `docs/product-spec.md` — product direction and feature inventory
- `docs/data-model.md` — relational schema draft
- `docs/implementation-plan.md` — phased roadmap
