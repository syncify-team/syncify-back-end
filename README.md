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

Currently we use MongoDB (until it is changed)

The repo won't run locally if you don't set up a basic mongodb.
You can do it in your local checkout; the /data directory is ignored by gitignore.

If you've never done this before
brew services stop mongodb
brew uninstall mongodb

brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
sudo mkdir -p data/db

Then
mongod --dbpath data/db
in a separate window
mongo

then in the mongo interface
use etherpay

---

### Installation

`npm install`

---

### Environment Setup

```
AUTH0_CLIENT_ID=
AUTH0_DOMAIN=
AUTH0_CLIENT_SECRET=
AUTH0_CALLBACK_URL=http://localhost:3033/callback

SESSION_SECRET=CHANGE THIS TO A SECRET

NODE_ENV=development
PORT=3033
```

---

### Run the app

`npm start`

---

### License

This project is licensed under the GNU License - see the LICENSE.md file for details
