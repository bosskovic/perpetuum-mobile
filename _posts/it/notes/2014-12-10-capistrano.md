---
slug:       "capistrano"
title:      Capistrano
excerpt:    notes
category:   tech_notes
parent_category: tech
tags:
  - ttn-back-end
  - ttn-ruby-gem
---

After changing the deployment repo in the capistrano scripts, the old repo is still being pulled from the server. Solution: editing the path_to_app/appname/repo/config

#### Resources

- <a href="https://coderwall.com/p/4k1lja/fixing-capistrano-3-deployments-after-a-repository-change">Fixing Capistrano 3 deployments after a repository change</a>
- stackoverflow: <a href="http://stackoverflow.com/questions/14278822/capistrano-firewalls-and-tunnel">Capistrano, Firewalls and Tunnel</a>

