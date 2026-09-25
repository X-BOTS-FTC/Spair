import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { listings, items, teams } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  const [listing] = await db
    .select({
      id: listings.id,
      description: listings.description,
      quantity: listings.quantity,
      item_name: items.name,
      team_name: teams.team_name
    })
    .from(listings)
    .leftJoin(items, eq(listings.item_id, items.id))
    .leftJoin(teams, eq(listings.team_id, teams.id))
    .where(eq(listings.id, params.listingId));

  if (!listing) {
    throw error(404, "Listing not found");
  }

  return { listing };
};
