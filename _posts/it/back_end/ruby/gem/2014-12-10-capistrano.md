---
layout:     tech_post
categories: ['tech']
slug:       "capistrano"
title:      Capistrano
excerpt:    notes
date:       2014-12-10
tags:
  - ttt-back-end
  - ttt-ruby-gem
animation:
  url: /assets/img/tech.gif
  width: 250
  height: 176  
---

After changing the deployment repo in the capistrano scripts, the old repo is still being pulled from the server. Solution: editing the path_to_app/appname/repo/config

#### Resources

- <a href="https://coderwall.com/p/4k1lja/fixing-capistrano-3-deployments-after-a-repository-change">Fixing Capistrano 3 deployments after a repository change</a>
- stackoverflow: <a href="http://stackoverflow.com/questions/14278822/capistrano-firewalls-and-tunnel">Capistrano, Firewalls and Tunnel</a>

