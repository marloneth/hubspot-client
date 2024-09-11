# Hubspot Client

This repo was developed to have a client to consume my [hubspot-middleware API](https://github.com/marloneth/hubspot-middleware).

It consists in a single page React application to get contacts from Hubspot, it is possible filter them by email, create new ones, update existing ones and also delete them.

## Installation

### Requirements

- Node v20.10.0
- Git (for clone the repo)

### Steps

1. Clone the repository on your local machine.

```sh
git clone git@github.com:marloneth/hubspot-client.git
```

2. Create a new `.env` file on the root folder.

```sh
cd hubspot-client
touch .env
```

3. Fill the `.env` file with the required env variables, please take a look at `.env.example` to know what variables you need.

4. Install dependencies.

```sh
npm install
```

5. Done. The app is ready to be run.

## Run the app

To run the app you have two options:

1. Run it in development mode.

```sh
npm run dev
```

2. Build it and run it in production mode.

```sh
npm run build
npm run preview
```

## Execute unit tests

To execute the unit tests you just have to run the related command.

```sh
npm run test
```

That will start running the tests suites and will show if everything was ok or if some test failed.
