Setup:
    1 - Fork and clone this repository

    2 - Spin up a docker container with the following command

        docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
        -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

    3 - Access the docker container.

        docker exec -it <container ID> bash

    4 - Log into psql within the container

        psql -U postgres

    5 - Create a database called 'zetabase'

        CREATE TABLE zetabase;

    6 - Open another terminal and cd into the zPrefApp/server directory

    7 - Run the 'npm install' command to install the proper dependencies

    8 - Migrate and seed the database with the following commands:

        npx knex migrate:latest

        npx knex seed:run

    9 - Start up API server

        npm start

    10 - Open another terminal and cd into the zPrefApp/client directory

    11 - Run the 'npm install' command to install the proper dependencies

    12 - Start the client

        npm start


Directions:

    1 - Create an account

    2 - Log into account

            OR

    1 - Log into existing account (ex: username: harls93 password: ives) see database for more users

    From here you can:
        -View the entire inventory
        -View the details of any item within the entire inventory
        -View your inventory
        -View the details of any of your items within your inventory
        -Edit your inventory
        -Add to your inventory
        -Delete from your inventory
        -Log out of your account

    When not logged in you can:
        -View the entire inventory
        -View the details of any item within the entire inventory