# Syncify Backend

_Syncify is a tool to listen to podcasts and audio in ‘sync’ with your friends and enable real conversations around the content you love._

Listening to content is an often lonely pursuit where you just listen to things in your own world, disconnected from your friends. It is hard to talk to friends about things when they listen to something you listened to three months later (or never). Syncify allows users to listen to audio (podcasts, books, and music) in sync and encourage conversation with real people and be less lonely.

Users can listen at the exact same time (live-sync) or catch up on things the other has listened recently (). Syncing awesome 😝

## Covid-19

Due to the covid-19 crisis this app suddenly felt a more urgent priority with it's purpose of reducing feelings of isolation. As such I am making it Open source to get things moving faster and contribute to maintaining the sanity of many people going through hard times.

## Become a User

The app isn't released yet but you can signup to be a beta tester here

[Syncify Sign Up](https://syncify.landen.co)

---

## Code

This is a NodeJS project with Express, GraphQL, PSQL and Auth0 login

---

### Database

This repo is currently using a local PostgreSQL instance

This is temporarily until docker is set up

You will need to set up a local [PostgreSQL db](https://www.postgresql.org/download/) to connect to the db

The application is currently using [bookshelf.js](https://bookshelfjs.org/) and [knex.js](http://knexjs.org/)

For testing routes through postman or an equivalent feel free to remove the secured middleware on the route

---

### Environment Setup

- For Auth0 ask someone for the variables
- DB variables are form the Database section above

```
AUTH0_CLIENT_ID=
AUTH0_DOMAIN=
AUTH0_CLIENT_SECRET=
AUTH0_CALLBACK_URL=http://localhost:3000/callback

SESSION_SECRET=change_this_to_a_secret

NODE_ENV=development
PORT=3000

DB_NAME=test
DB_USER=postgres
DB_PASSWORD=
DB_HOST=127.0.0.1
```

---

### Running with DOCKER

Make sure you have DOCKER engine (with *docker-compose*) on your machine, then just play:

`docker-compose up`

---

And that should work!

Below is the old way...

### Installation

`npm install`

`knex migrate:latest` or `node_modules/.bin/knex migrate:latest`

---

### Run the app

`npm start`

---

### License

This project is licensed under the GNU License - see the LICENSE.md file for details
