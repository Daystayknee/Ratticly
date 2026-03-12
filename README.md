# Ratticly

Ratticly is a modern breeder management concept app for fancy rat ratteries: life records, genetics tracking, pairing planning, litter outcomes, inventory, and operations in a luxury dashboard style.

## Implemented in this iteration

This iteration targets the next deeper roadmap items:

1. **Backend/API simulation + multi-user auth roles**
   - Added an async API layer (`api`) with create/update/remove semantics and simulated network latency.
   - Added role-based write permissions (`owner`, `staff`, `viewer`), with viewer blocked from writes.
   - Added user switcher in UI and mutation attribution in the event timeline.

2. **Edit/Delete + fuller CRUD lifecycle**
   - Added edit and delete controls for rats in the profile drawer.
   - Create/edit flows now run through validation and API mutations.
   - Includes optimistic UI behavior for rat create + rollback on failure.

3. **True lineage graph renderer**
   - Added SVG lineage graph rendering with:
     - ancestor depth slider
     - health overlay toggle
     - trait overlay toggle
   - Graph nodes are clickable and open profile drawer context.

4. **Expanded genetics engine**
   - Added genotype parser (`Dd rr Mm` style input).
   - Added per-locus offspring odds calculation using Punnett-style crosses.
   - Pairings now show both COI estimate and trait probability badges.

5. **Profile tab depth improvements**
   - Preserved 12-tab profile and expanded tab behavior with:
     - timeline filter controls
     - notes editing + save mutation
     - media URL add/list management
     - derived summaries (e.g., weight average)


6. **Aesthetic finishing pass**
   - Added a featured-rat hero card with richer visual hierarchy.
   - Added daily breeder focus checklist card for dashboard storytelling feel.
   - Added refined hover/micro-animation polish and improved graph background treatment.


7. **Milestone watch + memory gallery upgrades**
   - Improved click reliability for roster cards/profile opening through direct and delegated handlers.
   - Added milestone watcher logic (weaning windows, breeding-age check, retirement planning, health/weight shifts).
   - Added dashboard milestone panel and milestone indicators in roster cards.
   - Added multi-image upload support in profile Photos tab (saved to datastore), with per-image memory labels.
   - Added timeline/media events when photo memories are uploaded.

## Run locally

```bash
python3 -m http.server 4173 --directory /workspace/Ratticly
```

Open `http://localhost:4173`.

## Files

- `index.html` — dashboard shell, tabs, graph controls, profile drawer, quick-add modal
- `app.css` — luxury visual system, graph/drawer/form styling, responsive layout
- `app.js` — datastore, API simulation, auth roles, CRUD logic, lineage graph, genetics calculator, profile interactions
- `docs/product-spec.md` — product direction and feature inventory
- `docs/data-model.md` — relational schema draft
- `docs/implementation-plan.md` — phased roadmap
