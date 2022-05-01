# NodePop

### Install dependencies

    npm install

### Configure

Review lib/connectMongoose.js to set database configuration

### Init database

    npm run initDB

## Start

To start a single instance:

    npm start

To start in development mode:

    npm run dev (including nodemon & debug log)


## API info

### POST api/authenticate
Login page. It will return a JWT that give you access to api/anuncios.

### GET api/anuncios
To get the ads.
You'll need authorization via JWT.


### POST api/anuncios
To post a new add.
You'll need authorization via JWT.

### Thumbnail utily
To use the microservice that creates the thumbnails of the uploaded images, you must launch the microservice file called thumbnail-service.js in another terminal.


