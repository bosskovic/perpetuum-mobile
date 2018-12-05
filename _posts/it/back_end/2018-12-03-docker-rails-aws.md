---
layout:     tech_post
categories: ['tech']
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
published: false    
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

    FROM ruby:alpine
    
    RUN apk add --update build-base postgresql-dev tzdata
    RUN gem install rails -v '5.1.6'
    WORKDIR /app
    ADD Gemfile Gemfile.lock /app/
    RUN bundle install

That’ll put your application code inside an image that builds a container with Ruby, Bundler and all your dependencies 
inside it.

( --> <a class="external" href="https://docs.docker.com/get-started/part2/#dockerfile">more information on how to write Dockerfiles</a> )

Create **docker-compose.yml**

version: '3.6'

    services:
      web:
        build: .
        volumes:
          - ./:/app
        working_dir: /app
        command: puma
        ports:
          - 3000:3000
        depends_on:
          - db
        environment:
          DATABASE_URL: postgres://postgres@db
      db:
        image: postgres:10.3-alpine
    
    
Build the project

    $ sudo docker-compose run web rails new --database=postgresql -J --skip-coffee .

    # change the ownership of new files
    $ sudo chown -R $USER:$USER *

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
      url: <%= ENV['DATABASE_URL'] %>
    
    development:
      <<: *default
      database: myapp_development
    
    
    test:
      <<: *default
      database: myapp_test

Create the db

    $ sudo docker-compose run --rm web rails db:create db:migrate

After that, rails app is bootable:

    $ sudo docker-compose up














#### Resources:

- <a class="external" href="https://docs.docker.com/compose/gettingstarted/">Get started with Docker Compose</a>
- <a class="external" href="https://docs.docker.com/get-started/">Get Started with Docker</a>
- <a class="external" href="https://stackoverflow.com/questions/45333492/postgres-with-docker-postgres-fails-to-load-when-persisting-data">stackoverflow: a solution to an issue with Postgres fail when booting an image</a>
- <a class="external" href=""></a>