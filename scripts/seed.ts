// scripts/seed.ts
// One-off dev seed script — not part of the app. Run manually, re-run only
// after clearing the relevant tables yourself (not idempotent, by design).

import { db } from '../src/lib/server/db';
import { teams, competitions, items } from '../src/lib/server/db/schema';

async function seed() {
  // 1. A fake competition
  const [competition] = await db
    .insert(competitions)
    .values({
      competition_name: 'Test Regional 2026',
      start_time: new Date('2026-09-10T08:00:00-05:00'),
      end_time: new Date('2026-09-12T18:00:00-05:00'),
      latitude: 44.9778,
      longitude: -93.2650,
    })
    .returning();

  // 2. A couple of fake teams
  const [teamA] = await db
    .insert(teams)
    .values({
      team_number: 254,
      team_name: 'The Cheesy Poofs',
      team_email: 'coach@team254.example.com',
    })
    .returning();

  const [teamB] = await db
    .insert(teams)
    .values({
      team_number: 118,
      team_name: 'Robonauts',
      team_email: 'coach@team118.example.com',
    })
    .returning();

  // 3. A few catalog items — approved, so they show up normally
  const [driver] = await db
    .insert(items)
    .values({
      name: '1/4-20 Tap',
      tags: ['part', 'common'],
      status: 'approved',
    })
    .returning();

  const [neo] = await db
    .insert(items)
    .values({
      name: 'NEO Motor',
      tags: ['part'],
      status: 'approved',
    })
    .returning();

  console.log('Seeded:', { competition, teamA, teamB, driver, neo });
}

seed()
  .then(() => {
    console.log('Done.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
