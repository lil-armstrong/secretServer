# SecretServer
A secure platform for storing and sharing confidential information via randomly generated URLs. Secrets are accessible only for a limited number of views or until they expire based on a set TTL (Time-to-Live) input. Once expired, they become permanently unavailable.

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

**__The client-side also depends on environment variables. I decided not to use a fallback, since this is a demo app. Please create a ``.env`` file in the ``client`` folder and put the following__**

```bash
BASE_URL=/
VUE_APP_SERVER_HOST=localhost
VUE_APP_SERVER_PORT=8000
```
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
