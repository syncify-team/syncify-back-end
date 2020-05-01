# Syncify Backend

This repo uses Express and GraphQL with Auth0 for login

-----

### Database

Currently we use MongoDB

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


-----

### Installation

`npm install`

-----

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

-----

### Run the app

`npm start`