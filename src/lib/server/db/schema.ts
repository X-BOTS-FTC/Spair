import {
  pgTable,
  text,
  integer,
  varchar,
  timestamp,
  doublePrecision,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";


export const itemStatusEnum = pgEnum('item_status', ['pending', 'approved', 'rejected']);

export const itemTagEnum = pgEnum('item_tag', [
  'service',
  'part',
  'printable',
  'common',
  'set',
]);

export const teams = pgTable('teams', {
  id: uuid('id').defaultRandom().primaryKey(),
  team_number: integer('team_number').notNull(),
  team_name: text('team_name'),
  team_email: varchar('team_email', { length: 255 }).notNull().unique(),
  password_hash: text('password_hash'),
});


export const competitions = pgTable('competitions', {
  id: uuid('id').defaultRandom().primaryKey(),
  competition_name: text('competition_name').notNull(),
  start_time: timestamp('start_time', { withTimezone: true }).notNull(),
  end_time: timestamp('end_time', { withTimezone: true }).notNull(),
  latitude: doublePrecision('latitude'),
  longitude: doublePrecision('longitude'),
});


export const items = pgTable('items', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  tags: itemTagEnum('tags').array(),
  status: itemStatusEnum('status').notNull().default('pending'),
  proposed_by_team_id: uuid('proposed_by_team_id').references(() => teams.id),
  added_on: timestamp('added_on', { withTimezone: true }).notNull().defaultNow(),
});


// Item components are kits/sets containing other items.
export const itemComponents = pgTable('item_components', {
  id: uuid('id').defaultRandom().primaryKey(),
  kit_id: uuid('kit_id').notNull().references(() => items.id),
  component_item_id: uuid('component_item_id').notNull().references(() => items.id),
});


export const listings = pgTable('listings', {
  id: uuid('id').defaultRandom().primaryKey(),
  item_id: uuid('item_id').notNull().references(() => items.id),
  team_id: uuid('team_id').notNull().references(() => teams.id),
  competition_id: uuid('competition_id').notNull().references(() => competitions.id),
  description: text('description'),
  quantity: text('quantity'),
  creation_time: timestamp('creation_time', { withTimezone: true }).notNull().defaultNow(),
});


export const requests = pgTable('requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  team_id: uuid('team_id').notNull().references(() => teams.id),
  competition_id: uuid('competition_id').notNull().references(() => competitions.id),
  description: text('description'),
  creation_time: timestamp('creation_time', { withTimezone: true }).notNull().defaultNow(),
  soft_deadline: timestamp('soft_deadline', { withTimezone: true }).notNull(),
  hard_deadline: timestamp('hard_deadline', { withTimezone: true }).notNull(),
});


export const requestItems = pgTable('request_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  request_id: uuid('request_id').notNull().references(() => requests.id),
  item_id: uuid('item_id').references(() => items.id), 
  other_description: text('other_description'),
});


export const loans = pgTable('loans', {
  id: uuid('id').defaultRandom().primaryKey(),
  lending_team_id: uuid('lending_team_id').notNull().references(() => teams.id),
  borrowing_team_id: uuid('borrowing_team_id').notNull().references(() => teams.id),
  item_id: uuid('item_id').references(() => items.id),
  description: text('description'),
  competition_id: uuid('competition_id').notNull().references(() => competitions.id),
  creation_time: timestamp('creation_time', { withTimezone: true }).notNull().defaultNow(),
  return_time: timestamp('return_time', { withTimezone: true }),
  deadline: timestamp('deadline', { withTimezone: true }),
  listing_id: uuid('listing_id').references(() => listings.id),
  request_id: uuid('request_id').references(() => requests.id),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  team_id: uuid('team_id').notNull().references(() => teams.id),
  expires_at: timestamp('expires_at', { withTimezone: true }).notNull(),
});

