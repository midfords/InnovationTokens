CREATE DATABASE tokens;

\c tokens

CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 first VARCHAR NOT NULL,
 last VARCHAR NOT NULL,
 public_key BYTEA UNIQUE NOT NULL
);

CREATE TABLE badges (
 id PRIMARY KEY,
 name_en VARCHAR NOT NULL,
 name_fr VARCHAR NOT NULL,
 description_en VARCHAR NOT NULL,
 description_fr VARCHAR NOT NULL,
);

CREATE TABLE user_badges (
 user_id INT CONSTRAINT REFERENCES users(id),
 badge_id INT CONSTRAINT REFERENCES badges(id),
);

\i badges.sql
