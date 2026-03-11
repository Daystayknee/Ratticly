# Ratticly

Ratticly is a modern breeder management platform for fancy rat ratteries: life records, genetics tracking, pairing planning, litter outcomes, inventory, finance, and care operations in a polished luxury dashboard UI.

## Product Direction

- **Experience**: clean, pastel, card-first dashboard (luxury SaaS style, not kennel software).
- **Primary users**: small-to-mid sized ethical rat breeders managing active colonies and placement pipelines.
- **Core value**: combine daily husbandry + breeding genetics + business operations in one timeline-driven system.

## Design Language

- White rounded cards with soft shadows
- Ambient pastel gradient/glow background layers
- Lightweight glass overlays for top chrome
- Left-sidebar navigation + top action/search bar
- Rich profile cards, lineage graph views, health/alert badges, mini charts
- Theme presets:
  - Cloudmilk
  - Berry Pastel
  - Mint Glass
  - Cream Candy
  - Dark Luxe Breeder Mode

## Information Architecture

Primary modules:

1. Dashboard
2. Rats
3. Litters
4. Pairings
5. Lineage
6. Health
7. Housing
8. Inventory
9. Placements
10. Finance
11. Tasks
12. Reports
13. Memorials
14. Settings

See:

- [`docs/product-spec.md`](docs/product-spec.md) for feature set and UX flows.
- [`docs/data-model.md`](docs/data-model.md) for relational model and key entities.
- [`docs/implementation-plan.md`](docs/implementation-plan.md) for phased rollout.

## Suggested Tech Stack

- **Frontend**: React + TypeScript + Tailwind + component system (or Unity UI layer if native).
- **Backend**: PostgreSQL + API layer (REST or GraphQL).
- **Charts/visualization**: Recharts (dashboard), Cytoscape/D3 (lineage graph).
- **Storage**: object storage for photos + signed URLs.
- **Auth**: email/password + role-based permissions (owner, staff, viewer).

## MVP Focus

MVP should include:

- Rat roster + deep rat profile
- Weight and health logs
- Pairings + pregnancy + litter tracking
- Dashboard alerts and quick-add actions
- Core relationship graph (parents, offspring, siblings)

Then iterate to finance, placements, inventory optimization, and advanced genetics analytics.
