---
layout:     tech_post
categories: ['tech']
slug:       "api-design-implementation-testing"
title:      API - design, implementation, testing
excerpt:    notes and resources
date:       2014-08-15
tags:
  - ttt-api
  - ttt-back-end
  - ttt-ruby
animation:
  url: /assets/img/tech.gif
  width: 250
  height: 176  
---

### Rails API versioning

It is a good idea to keep the API in its own namespace. If along with the API (json/xml) html will be served, the api endpoints could be in their own subdomain (api.site.com) or in the path (site.com/api). If only API will be served from the server, than it may be enough to just separate namespaces for each version. In this case, routes can look like this:

{% gist f56a7e9e5817357a5d9d routes.rb %}

ApiConstraints check the correct version in the header:

{% gist f56a7e9e5817357a5d9d api_constraints.rb %}

And here's the step for testing the version in the header with cucumber:

{% gist f56a7e9e5817357a5d9d api_steps.rb %}

#### Resources

- talk: Anthony Eden -<a href="http://vimeo.com/30586709"> Build and Test APIs with Ruby and Cucumber</a> ( 15-11-2011)
- railscast: <a href="http://railscasts.com/episodes/350-rest-api-versioning">REST API Versioning</a> (16-05-2012)

***

###Testing  the API

#### Resources

- blog: Matthew Lehner - <a href="http://matthewlehner.net/rails-api-testing-guidelines/">Rails API Testing Best Practices</a> (15-08-2014)
- blog: <a href="http://dhartweg.roon.io/rspec-testing-for-a-json-api">RSpec testing for a JSON API </a>(01-09-2014)
- gist: <a href="https://gist.github.com/alex-zige/5795358">Rails Rspec APIs Testing Notes </a>- weird
- gitthub issue: <a href="https://github.com/intridea/grape/issues/88">How to test with header-based API versioning</a>
- gist: gonzalo-bulnes - <a href="https://gist.github.com/gonzalo-bulnes/7069339">A set of Cucumber steps to test and document API behaviour</a>


### CSRF

<pre>skip_before_filter :verify_authenticity_token</pre>

- stackoverflow: <a href="http://stackoverflow.com/questions/10167956/rails-shows-warning-cant-verify-csrf-token-authenticity-from-a-restkit-post">Rails shows “WARNING: Can't verify CSRF token authenticity” from a RestKit POST</a>
- stackoverflow: <a href="http://stackoverflow.com/questions/7600347/rails-api-design-without-disabling-csrf-protection">Rails API design without disabling CSRF protection</a>
- <a href="https://coderwall.com/p/8z7z3a">Rails 4 solution for "Can't verify CSRF token authenticity” json requests</a>

***

#### Resources

- talk: Anthony Eden -<a href="http://vimeo.com/30586709"> Build and Test APIs with Ruby and Cucumber</a> ( 15-11-2011)
- blog: Anthony Eden - <a href="http://anthonyeden.com/2013/07/10/testing-rest-apis-with-cucumber-and-rack.html">Testing REST APIs With Cucumber and Rack</a> (2011)
- blog: stormpath - <a href="https://stormpath.com/blog/secure-your-rest-api-right-way/">Secure Your REST API... The Right Way</a> (17-04-2013)
- talk: stormpath - <a href="https://www.youtube.com/watch?v=5WXYw4J4QOU">Designing a Beautiful REST+JSON API</a> (11-06-2012)
- slides: stormpath - <a href="http://www.slideshare.net/stormpath/rest-jsonapis#">Design Beautiful REST + JSON APIs</a> (11-06-2012)
- gist: <a href="https://gist.github.com/josevalim/fb706b1e933ef01e4fb6#file-2_safe_token_authentication-rb%29">josevalim - safe/unsafe token authentication</a> (17-12-2013)
- railscast: <a href="http://railscasts.com/episodes/250-authentication-from-scratch">Authentication from Scratch</a>  (24-01-2011)
- railscast: <a href="http://railscasts.com/episodes/350-rest-api-versioning">REST API Versioning</a> (16-05-2012)
- blog: <a href="http://gregbee.ch/blog/effective-api-testing-with-cucumber">Effective API testing with Cucumber</a> (19-01-2014)
- blog: <a href="http://www.emilsoman.com/blog/2013/05/18/building-a-tested/">Building a tested, documented and versioned JSON API using Rails 4</a> (18-05-2013)
- github: <a href="https://github.com/emilsoman/rails-4-api">Template app for a tested, documented and versioned JSON API using Rails 4 and Rails-Api</a>
- blog: <a href="http://www.soryy.com/blog/2014/apis-with-devise/">APIs with Devise</a> (2014)
- gem: <a href="https://github.com/gonzalo-bulnes/simple_token_authentication">simple_token_authentication</a>
- gem: <a href="https://github.com/rails-api/rails-api">rails-api</a>
- gem: <a href="https://github.com/rails-api/active_model_serializers">active_model_serializers</a>
- gem: <a href="https://github.com/jayzes/cucumber-api-steps">cucumber-api-steps</a>
- gist:<a href="https://gist.github.com/gonzalo-bulnes/7069339"> gonzalo-bulnes / api_steps.rb</a>

