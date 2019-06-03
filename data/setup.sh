#!/bin/bash

sudo -u postgres createuser tokens_user
sudo -u postgres psql
psql=# alter user tokens_user with encrypted password 'Password$1234';
psql -U tokens_user -a -f init.sql
