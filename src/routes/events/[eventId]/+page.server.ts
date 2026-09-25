import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { competitions, listings, requests, items, requestItems, teams } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  const [competition] = await db
    .select()
    .from(competitions)
    .where(eq(competitions.id, params.eventId));

  if (!competition) {
    throw error(404, 'Competition not found');
  }

  const competitionListings = await db
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
    .where(eq(listings.competition_id, params.eventId));


   const competitionRequests = await db
     .select({
       id: requests.id,
       description: requests.description,
       soft_deadline: requests.soft_deadline,
       hard_deadline: requests.hard_deadline,
       team_name: teams.team_name,
     })
     .from(requests)
     .leftJoin(teams, eq(requests.team_id, teams.id))
     .where(eq(requests.competition_id, params.eventId));


  const competitionRequestItems = await db
    .select({
      request_id: requestItems.request_id,
      item_name: items.name,
      other_description: requestItems.other_description,
    })
    .from(requestItems)
    .leftJoin(items, eq(requestItems.item_id, items.id))
    .innerJoin(requests, eq(requestItems.request_id, requests.id))
    .where(eq(requests.competition_id, params.eventId));

  const requestsWithItems = competitionRequests.map((request) => {
  const itemsForThisRequest = competitionRequestItems.filter(
      (ri) => ri.request_id === request.id
    );
    return { ...request, items: itemsForThisRequest };
  });

    return { competition, listings: competitionListings, requests: requestsWithItems };
};
