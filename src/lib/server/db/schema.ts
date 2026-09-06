import { text, integer, varchar, pgTable, timestamp, doublePrecision, uuid, } from "drizzle-orm/pg-core";

export const teams = pgTable('teams', {
  id: uuid('id').defaultRandom().primaryKey(),
  team_number: integer().notNull(),
  team_name: text('team_name'),
  team_email: varchar({ length: 255 }).notNull().unique(),
});


export const competitions = pgTable('competitions', {
  id: uuid('id').defaultRandom().primaryKey(),
  competition_name: text('competition_name').notNull(),
  start_time: timestamp('start_time', { withTimezone: true }).notNull(),
  end_time: timestamp('end_time', { withTimezone: true }).notNull(),
  latitude: doublePrecision('latitude'),
  longitude: doublePrecision('longitude'),
})

