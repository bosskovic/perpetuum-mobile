---
slug:       "rails-deployment"
title:      rails deployment
excerpt:    Setting up Debian 7 server on VPS, nginx, php-fpm, ruby, unicorn/phusion passanger, essentials, ssh keys, capistrano...
date:       2014-11-22
tags:
  - ttt-deployment
  - ttt-ruby
---

### Setting up Debian 7 server on VPS

#### nginx and php-fpm

{% gist 213dec91b3446b3d3b84 debian_7_installation.sh %}

<a href="https://www.digitalocean.com/community/tutorials/how-to-create-an-ssl-certificate-on-nginx-for-ubuntu-14-04">How To Create an SSL Certificate on Nginx for Ubuntu 14.04</a>

( --> see <a title="nginx" href="/tech/nginx-notes/">nginx notes</a> )

#### ruby

<pre>sudo apt-get install curl
curl -sSL https://get.rvm.io | bash -s stable --rails
</pre>

#### unicorn vs phusion passenger

- github: phusion / passenger - <a href="https://github.com/phusion/passenger/wiki/Unicorn-vs-Phusion-Passenger">Unicorn vs Phusion Passenger</a>

#### passenger

<pre>sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 561F9B9CAC40B2F7
sudo apt-get install apt-transport-https ca-certificates
# deb https://oss-binaries.phusionpassenger.com/apt/passenger wheezy main
sudo nano /etc/apt/sources.list.d/passenger.list

sudo chown root: /etc/apt/sources.list.d/passenger.list
sudo chmod 600 /etc/apt/sources.list.d/passenger.list
sudo apt-get update

sudo apt-get install nginx-extras passenger

# uncomment passenger_root and passenger_ruby
sudo nano /etc/nginx/nginx.conf
</pre>

#### essentials

<pre>sudo apt-get install imagemagick
sudo apt-get install monit
</pre>

#### ssh key for the git repo

( --> see the <a title="git" href="/tech/git-notes/">git notes</a> )

#### capistrano

{% gist 5575efea9323db8d0f92 Gemfile %}

{% gist 5575efea9323db8d0f92 Capfile %}

{% gist 5575efea9323db8d0f92 config_deploy.rb %}

{% gist 5575efea9323db8d0f92 config_deploy_production.rb %}

- Clone down <a href="https://github.com/TalkingQuickly/capistrano-3-rails-template">https://github.com/TalkingQuickly/capistrano-3-rails-template</a>
- copy over capistrano-3-rails-template/config/deploy/shared/*
- copy over capistrano-3-rails-template/lib/capistrano/*
- delete unneeded
- delayed_job tasks (if needed for the project): <a href="https://github.com/collectiveidea/delayed_job/wiki/Delayed-Job-tasks-for-Capistrano-3">https://github.com/collectiveidea/delayed_job/wiki/Delayed-Job-tasks-for-Capistrano-3</a>

{% gist 5575efea9323db8d0f92 deployment.sh %}

#### capistrano notes:

- not all shell variables are automatically available via ssh

#### Resources

- <a href="https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-debian-7">How To Install Linux, Nginx, MySQL, PHP (LEMP) Stack on Debian 7</a>
- <a href="http://wiki.nginx.org/Configuration">Nginx configuration</a>
- <a href="https://www.phusionpassenger.com/documentation/Users%20guide%20Nginx.html">Phusion Passenger users guide, Nginx version</a>
- github: <a href="https://github.com/capistrano/capistrano">capistrano / capistrano</a>
- github: <a href="https://github.com/capistrano/rails">capistrano / rails</a>
- github: <a href="https://github.com/capistrano/rvm">capistrano / rvm</a>
- <a href="https://www.penflip.com/MarkO/rails-production-server-build/blob/8de0c71dab83eb3bec4c943aed6a91074e82e3e5/document.txt">Setting up a Rails Production Server from scratch with Linode and Ubuntu 14.04 LTS</a>
- talkingquickly: <a href="http://www.talkingquickly.co.uk/2014/01/deploying-rails-apps-to-a-vps-with-capistrano-v3/">Capistrano 3 Tutorial</a>
- github: <a href="https://github.com/TalkingQuickly/capistrano-3-rails-template">TalkingQuickly / capistrano-3-rails-template</a>
- linode: <a href="https://www.linode.com/docs/websites/ror/ruby-on-rails-with-nginx-on-ubuntu-12-04-precise">Ruby on Rails with Nginx on Ubuntu 12.04 LTS (Precise)</a>
- digitalocean: <a href="https://www.digitalocean.com/community/tutorials/how-to-deploy-a-rails-app-with-passenger-and-apache-on-ubuntu-14-04">How To Deploy a Rails App with Passenger and Apache on Ubuntu 14.04</a>

