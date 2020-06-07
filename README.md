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

This repo is currently using DOCKER-COMPOSE with two services:

app: NodeServer

db: PostgreSQL

The application is currently using [bookshelf.js](https://bookshelfjs.org/) and [knex.js](http://knexjs.org/)

---

### GraphQL

Testing GraphQL querys/mutations can be done through GraphIQL.

- Examples of how to build queries and mutations: https://graphql.org/learn/queries/
- The endpoint for passing the bearing token in the request is: http://localhost:3000/graphql
- The endpoint for authentication through passport is: http://localhost:3000/graphql-passport

Testing endpoints with your context in GraphIQL:

- You can get your bearer token if you console.log(extraParams.id_token) in app.js during the Auth0Strategy set up.
- After that click "edit HTTP Headers" in graphiql.
- Add "Bearer " to the beginning of the jwt string
- Add a new header name:authorization value:_from the step above_

---

### Environment Setup (.env file)

- For Auth0 ask someone for the variables

```
AUTH0_CLIENT_ID=
AUTH0_DOMAIN=
AUTH0_CLIENT_SECRET=
AUTH0_CALLBACK_URL=http://localhost:3000/callback
AUTH0_ISSUER=

SESSION_SECRET=change_this_to_a_secret

NODE_ENV=development
APP_PORT=3000

DB_NAME=testDB
DB_USER=syncifyDbUser
DB_PASSWORD=somePassw0rD
DB_HOST=db
DB_PORT=5432
```

---

### Running with DOCKER

Make sure you have DOCKER engine (with _docker-compose_) on your machine, then just play:

For the first run:

1. Make sure you don't have ./pgdata directory
2. Build - `docker-compose up` (Wait for the database to full initialize: "_LOG: database system is ready to accept connections_")
3. Migrate - `docker exec {nodejs-app-container-name} sh -c "npm run migrate"` - Check your running instance of docker for the name. It is likey: 'syncify-back-end_app_1' or 'server-syncify_app_1'

And you should be good to test on a browser or other testing tool.

Future running just build with docker. (run migrate if you create a new table)

1. Build - `docker-compose up`

---

### Running without docker

#### Installation

`npm install`

`npm run migrate`

#### Run the app

`npm start`

---

### License

This project is licensed under the GNU License - see the LICENSE.md file for details
