CREATE TABLE `game_rooms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`p1_address` text NOT NULL,
	`p2_address` text NOT NULL,
	`game_address` text NOT NULL,
	`p1_timeout` integer DEFAULT false NOT NULL,
	`p2_timeout` integer DEFAULT false NOT NULL,
	`result` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
