// scripts/seed.ts
// One-off dev seed script — not part of the app. Run manually, re-run only
// after clearing the relevant tables yourself (not idempotent, by design).

import { db } from '../src/lib/server/db';
import { teams, competitions, items, listings, requests, requestItems } from '../src/lib/server/db/schema';

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

  const [listing] = await db
    .insert(listings)
    .values({
      item_id: neo.id,
      team_id: teamA.id,
      competition_id: competition.id,
      description: 'Spare NEO motor, barely used',
      quantity: '1',
    })
    .returning();

    const [request] = await db
      .insert(requests)
      .values({
        team_id: teamB.id,
        competition_id: competition.id,
        description: 'Need a 1/4-20 tap to fix a stripped hole',
        soft_deadline: new Date('2026-09-10T14:00:00-05:00'),
        hard_deadline: new Date('2026-09-10T16:00:00-05:00'),
      })
      .returning();

  // 6. Link the request to the tap item via request_items
  await db.insert(requestItems).values({
    request_id: request.id,
    item_id: driver.id,
  });


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
