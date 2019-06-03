
\c tokens_db

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

INSERT INTO badges( id, name_en, name_fr, description_en, description_fr )
  VALUES ( 1, 'Big Spender', 'Grand Dépensier', 'Spend 10 tokens in one day.', 'Dépensez 10 jetons en une journée.' )
  , ( 2, 'Merchant', 'Marchand(e)', 'Trade a total of 10 tokens.', 'Échangez un total de 10 jetons.' )
  , ( 3, 'Innovation Guru', 'Gourou de l''innovation', 'Spend a total of 100 tokens.', 'Dépense un total de 100 jetons.' );
