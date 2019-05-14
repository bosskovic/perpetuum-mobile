---
slug:       "dockerizing-rails-app"
title:      dockerizing-rails-app
excerpt:    dockerizing-rails-app
tags:
  - ttt-aws
  - ttt-eb
animation:
  url: /assets/img/animated/tech.gif
  width: 250
  height: 176
published: false    
---

( -> https://blog.velalu.qa/admin/tech/ruby/rails/docker/2017/10/31/rails-5-within-docker-containers.html )

    rails new cms2demo
    cd cms2demo
    touch Dockerfile
    gedit Dockerfile
    touch .dockerignore
    gedit .dockerignore
    mkdir lib/support/                    
    touch lib/support/docker-entrypoint.sh
    gedit lib/support/docker-entrypoint.sh
    touch docker-compose.yml
    gedit docker-compose.yml
    docker-compose build app test worker
    docker-compose run -p 3000:3000 app
    
