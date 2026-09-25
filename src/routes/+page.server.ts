import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { competitions } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
  const allCompetitions = await db.select().from(competitions);
  console.log('Competitions found:', allCompetitions);
  return { competitions: allCompetitions };
};
