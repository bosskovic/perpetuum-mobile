---
slug:       "docker-rails-aws"
title:      docker-rails-aws
excerpt:    docker-rails-aws
date:       2018-12-03
tags:
  - ttt-docker
  - ttt-aws
  - ttt-ruby
animation:
  url: /assets/img/animated/tech.gif
  width: 250
  height: 176
    
---

#### Installing Docker CE for Ubuntu

    # Uninstall old versions
    $ sudo apt-get remove docker docker-engine docker.io

    # Install packages to allow apt to use a repository over HTTPS    
    $ sudo apt-get update
    $ sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
    
    # Add Docker’s official GPG key
    $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    
    # set up the stable repository
    $ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

    # Install Docker CE
    $ sudo apt-get update
    $ sudo apt-get install docker-ce
    
    # Verify that Docker CE is installed correctly
    $ sudo docker run hello-world

#### Docker cheat sheet

    ## List Docker CLI commands
    docker
    docker container --help
    
    ## Display Docker version and info
    docker --version
    docker version
    docker info
    
    ## Execute Docker image
    docker run hello-world
    
    ## List Docker images
    docker image ls
    
    ## List Docker containers (running, all, all in quiet mode)
    docker container ls
    docker container ls --all
    docker container ls -aq


#### Uninstalling Docker CE

    $ sudo apt-get purge docker-ce
    $ sudo rm -rf /var/lib/docker
    
#### Installing Docker Compose    

    # download the latest version of Docker Compose
    # (Use the latest Compose release number in the download command: https://github.com/docker/compose/releases)
    $ sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    
    # Apply executable permissions to the binary
    $ sudo chmod +x /usr/local/bin/docker-compose
    
    # Test the installation
    $ docker-compose --version
    
Add docker and docker-compose to the plugins array of your zshrc file:
    
    plugins=(... docker docker-compose)

#### Uninstalling Docker Compose

    $ sudo rm /usr/local/bin/docker-compose


### Basics

    # Create a directory for the project
    $ mkdir composetest
    $ cd composetest
    
Create **Dockerfile** at the project root:

    FROM ruby:2.5
    RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
    RUN mkdir /myapp
    WORKDIR /myapp
    COPY Gemfile /myapp/Gemfile
    COPY Gemfile.lock /myapp/Gemfile.lock
    RUN bundle install
    COPY . /myapp
    
    # Add a script to be executed every time the container starts.
    COPY entrypoint.sh /usr/bin/
    RUN chmod +x /usr/bin/entrypoint.sh
    ENTRYPOINT ["entrypoint.sh"]
    EXPOSE 3000
    
    # Start the main process.
    CMD ["rails", "server", "-b", "0.0.0.0"]

That’ll put your application code inside an image that builds a container with Ruby, Bundler and all your dependencies 
inside it.

( --> <a class="external" href="https://docs.docker.com/get-started/part2/#dockerfile">more information on how to write Dockerfiles</a> )

Create a bootstrap Gemfile

    source 'https://rubygems.org'
    gem 'rails', '~>5'

Create an empty Gemfile.lock

    touch Gemfile.lock

Next, provide an entrypoint script to fix a Rails-specific issue that prevents the server from restarting when a certain 
server.pid file pre-exists. This script will be executed every time the container gets started. entrypoint.sh consists of:

    #!/bin/bash
    set -e
    
    # Remove a potentially pre-existing server.pid for Rails.
    rm -f /myapp/tmp/pids/server.pid
    
    # Then exec the container's main process (what's set as CMD in the Dockerfile).
    exec "$@"


Create **docker-compose.yml**

    version: '3'
    services:
      db:
        image: postgres
        volumes:
          - ./tmp/db:/var/lib/postgresql/data
      web:
        build: .
        command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
        volumes:
          - .:/myapp
        ports:
          - "3000:3000"
        depends_on:
          - db
    
Build the project

    $ sudo docker-compose run web rails new . --force --no-deps --database=postgresql

    # change the ownership of new files
    $ sudo chown -R $USER:$USER .

Whenever **Gemfile** or **Dockerfile** change, it is necessary to rebuild the project:

    $ sudo docker-compose build web

To connect the database, edit the contents of **config/database.yml** to match this:

    default: &default
      adapter: postgresql
      encoding: unicode
      host: db
      username: postgres
      password:
      pool: 5
    
    development:
      <<: *default
      database: myapp_development
    
    
    test:
      <<: *default
      database: myapp_test

Create the db in another terminal

    $ sudo docker-compose run web rails db:create

After that, rails app is bootable:

    $ sudo docker-compose up

The app is running on http://localhost:3000


Stop the application

    $ sudo docker-compose down
    
Restart the application

    $ sudo docker-compose up     

Rebuild the application

    $ sudo docker-compose run web bundle install
    $ sudo docker-compose up --build

#### Resources:

- <a class="external" href="https://docs.docker.com/compose/gettingstarted/">Get started with Docker Compose</a>
- <a class="external" href="https://docs.docker.com/get-started/">Get Started with Docker</a>
- <a class="external" href="https://stackoverflow.com/questions/45333492/postgres-with-docker-postgres-fails-to-load-when-persisting-data">stackoverflow: a solution to an issue with Postgres fail when booting an image</a>
- <a class="external" href="https://docs.docker.com/compose/rails/">Quickstart: Compose and Rails</a>


