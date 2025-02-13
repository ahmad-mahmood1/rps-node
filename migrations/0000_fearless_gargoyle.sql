CREATE TABLE `game_results` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`p1_move` text DEFAULT '',
	`game_address` text NOT NULL,
	`result` text DEFAULT '',
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
