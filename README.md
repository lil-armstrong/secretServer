# SecretServer
A secret server that can be used to store and share secrets using a randomly generated URL. The secret can be read only a limited number of times after that it will expire and won’t be available. The secret has a TTL (Time to live). After the expiration time the secret won’t be available anymore.

This app consists of both the client-side and server-side code implementation.
All server-side code is in the ``server`` folder, while the client-side code is in the folder named ``client``

## How to run server-side code
**__To connect to the correct mongoose database, create a .env file in the ``server`` folder and put the following__**

```bash
DB_USER=admin
DB_PASSWORD=secretServer
DB_NAME=secrets
```
- Change to the ``server`` folder
- On your terminal, type the following commands in order

For yarn users
``` bash
# For yarn
# Install all dependencies
  yarn
# Start server
  yarn serve
```
For npm users
``` bash
# For npm
# Install all dependencies
  npm install
# Start server
  npm run serve
```
## How to run client-side code
**__The client-side code uses a minimalistic Vuejs single page component setup generated using the Vue cli tool.__**

- Change to the ``client`` folder
- On your terminal, type the following commands in order

For yarn users
``` bash
# For yarn
# Install all dependencies
  yarn
# Start server
  yarn serve
```
For npm users
``` bash
# For npm
# Install all dependencies
  npm install
# Start server
  npm run serve
```
## Server-side Test
In this project, I used jest as a unit testing framework for the server side. To run all test, change to the ``server`` folder and run the following commands

```bash
# Run all test
yarn test
# or
npm run test
```