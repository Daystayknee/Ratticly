# Ratticly Data Model (Relational Draft)

## Core Entities

- `rats`
- `rat_relationships`
- `pairings`
- `pregnancies`
- `litters`
- `pups`
- `weight_entries`
- `health_records`
- `cages`
- `cage_assignments`
- `inventory_items`
- `inventory_movements`
- `tasks`
- `expenses`
- `placements`
- `adopters`
- `photos`
- `events`
- `trait_profiles`

## Key Tables (Suggested)

### rats
- `id` (uuid pk)
- `rat_code` (unique)
- `name`, `registered_name`, `call_name`
- `sex` (buck/doe/unknown)
- `dob`
- `status` (active, holdback, retired, etc.)
- `origin`, `breeder_source`, `acquisition_type`, `acquisition_date`, `acquisition_cost`
- phenotype fields (color, marking, coat_type, ear_type, eye_color, fur_texture, size_category)
- breeding fields (eligibility, proven_breeder, quality_rating)
- genetics fields (`genotype`, `carrier_traits`, `suspected_carrier_traits`, `coi_percent`)
- lifecycle fields (`deceased_at`, `cause_of_death`)
- timestamps

### rat_relationships
- `id`
- `rat_id` (subject)
- `related_rat_id` (target)
- `relationship_type` (mother, father, sibling, foster, mate, cagemate, etc.)
- `notes`
- timestamps

### pairings
- `id`
- `buck_id`, `doe_id`
- `status` (idea/review/approved/introduced/confirmed/cancelled/completed)
- `goal_traits` (jsonb)
- `risk_flags` (jsonb)
- `compatibility_score`
- `planned_date`, `introduced_date`
- `notes`

### pregnancies
- `id`
- `pairing_id`
- `doe_id`
- `mating_date`, `possible_conception_date`, `estimated_due_date`, `actual_birth_date`
- `status`
- `observations` (jsonb)

### litters
- `id`
- `litter_code`
- `sire_id`, `dam_id`
- `pairing_id`, `pregnancy_id`
- `born_at`
- `born_alive_count`, `stillborn_count`, `neonatal_loss_count`
- `male_count`, `female_count`, `unknown_count`
- `weaning_date`, `adoption_ready_date`
- `notes`

### pups
- `id`
- `litter_id`
- `rat_id` (nullable until promoted)
- `temp_name`
- `sex`
- `holdback_candidate`, `reserved_status`
- `development_notes`

### health_records
- `id`
- `rat_id`
- `record_type` (uri/tumor/injury/surgery/parasite/etc)
- `symptom_onset_date`, `severity`, `diagnosis`, `suspected_diagnosis`
- `medication`, `dosage`, `duration_days`
- `vet_clinic`, `vet_contact`
- `cost`
- `follow_up_date`
- `outcome`

### weight_entries
- `id`
- `rat_id`
- `recorded_at`
- `weight_grams`
- `body_condition_score`
- `appetite`, `hydration`, `notes`

### events (timeline bus)
- `id`
- `entity_type` (rat/litter/pairing/etc)
- `entity_id`
- `event_type`
- `event_at`
- `payload` (jsonb)

## Architectural Notes

- Use `jsonb` for variable genetics/observation attributes while stabilizing schema.
- Maintain normalized relationship links for lineage graph querying.
- Generate denormalized dashboard aggregates into materialized views for performance.
- Keep all critical mutations writing to `events` for auditable timeline reconstruction.
