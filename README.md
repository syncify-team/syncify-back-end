# Syncify Backend

_Syncify is a tool to listen to podcasts and audio in ‘sync’ with your friends and enable real conversations around the content you love._

Listening to content is an often lonely pursuit where you just listen to things in your own world, disconnected from your friends. It is hard to talk to friends about things when they listen to something you listened to three months later (or never). Syncify allows users to listen to audio (podcasts, books, and music) in sync and encourage conversation with real people and be less lonely.

Users can listen at the exact same time (live-sync) or catch up on things the other has listened recently (). Syncing awesome 😝

## Covid-19

Due to the covid-19 crisis this app suddenly felt a more urgent priority with it's purpose of reducing feelings of isolation. As such I am making it Open source to get things moving faster and contribute to maintaining the sanity of many people going through hard times.

## Become a User

The app isn't released yet but you can signup to be a beta tester here

[Syncify Sign Up](https://syncifyapp.com)

---

## Code

This is a NodeJS project with Express, GraphQL, PSQL and Auth0 login

---

### Database

This repo is currently using DOCKER-COMPOSE with two services:

app: NodeServer

db: PostgreSQL

The application is currently using [knex.js](http://knexjs.org/)

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

### Database Schema

The current database structure for the MVP (subject to change)

![](https://i.imgur.com/BsqcZPC.png)

Details and code here - https://dbdiagram.io/d/5e8648fb4495b02c3b892c24

#### Ammending the database
If you make a new table or update one you need to make a new migration
`npx knex migrate:make _table_name_here_`

[Useful info on migrations](https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261)


---

### Running database

This repo is currently using DOCKER-COMPOSE with two services:

app: NodeServer

db: PostgreSQL

The application is currently using [bookshelf.js](https://bookshelfjs.org/) and [knex.js](http://knexjs.org/)

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
DOCKER_DB_KEY_NAME=db
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

Use a local instance for the database such as postgresQL or SQLlite.
Create a database and assign a username and password

Ammend the DB configuration section in .env file to your settings
```
DB_NAME={my_db_name_here}
DB_USER={my_db_user_here}
DB_PASSWORD={my_db_password_here}
DB_HOST=localhost
DB_PORT=5432
```

#### Installation

`npm install`

`npm run migrate`

#### Run the app

`npm start`

---

### Adding data
You can add records into your app using:
- a client such as 'Postico'
- manually in the command line database environment
- manually with postman to post queries (this will be good practice of how the API works!) - [Demo Postman queries](https://app.getpostman.com/join-team?invite_code=52cd1b7fd617fd0c81c0742815c12d06)

---

### Contributing
You can assign yourself tasks to work on the priority features. Or build features you feel are useful and make a PR and we'll happily review.

#### Pull requests
We use a development branch

- Create your branches off 'development'
- Branches should be labelled with relevant tags at the start - `feat/user-login`, `bug/loading-error`
- Pull requests should be made into 'development'

#### Say hi

Request to join the Slack group

Connect with me at [LinkedIn](https://www.linkedin.com/in/sharris48/)

Thank you!

---

### License

This project is licensed under the GNU License - see the LICENSE.md file for details
