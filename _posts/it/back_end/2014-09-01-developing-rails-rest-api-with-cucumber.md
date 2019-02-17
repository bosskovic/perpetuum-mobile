---
slug:       "developing-rails-rest-api-with-cucumber"
title:      Developing rails REST API with Cucumber
excerpt:    json_spec, writing the definitions, checking the http headers, testing authentication...
date:       2014-09-01
tags:
  - ttt-api
  - ttt-bdd-/-tdd
  - ttt-cucumber
  - ttt-ruby
  - ttt-ruby-gem
---

In developing a rails API, BDD way with cucumber, I opted for several compromises.

I tried to hide as much of incidental details as possible, in order to keep the definitions readable to the stakeholders, but still retained some imperativeness, so that it can serve as documentation for the client developers.

### json_spec gem

To help me with JSON management, I am using the <a href="https://github.com/collectiveidea/json_spec">json_spec</a> gem. It has a number of useful <a href="https://github.com/collectiveidea/json_spec/blob/master/lib/json_spec/matchers.rb">matchers</a> (such as *be_json_eql*, *include_json*, *have_json_size*...), <a href="https://github.com/collectiveidea/json_spec/blob/master/lib/json_spec/helpers.rb">helpers</a> (*parse_json*, *normalize_json*...) and some common <a href="https://github.com/collectiveidea/json_spec/blob/master/lib/json_spec/cucumber.rb">cucumber steps</a> for checking the responses.

Installation and configuration is straightforward, it needs to be added to the Gemfile:

{% gist 091a8dfbfa41d5e9a49a Gemfile %}

and to make use of json_spec cucumber steps they need to be required, and json_spec also needs to know the last_json. Rack::Test is part of rails, so its *last_response* is what I use.

{% gist 091a8dfbfa41d5e9a49a custom_env.rb %}

### Writing the definitions

The pragmatic programmers' The cucumber book in a chapter about testing the REST web services, proposes that the definitions should be written like this :

{% gist 091a8dfbfa41d5e9a49a fruit_list-pragmatic.feature %}

At first I tried doing it like that, but soon my feature files became quite hard to read, especially if a scenario needed to include several tables and a JSON. So I decided to get rid of as much of incidental details as possible, but I kept the imperative definitions that call specific endpoints with appropriate methods, because they serve as a good reference to the client developers and they don't bother the stakeholders much.

After applying these principles, the previous example would look something like this:

{% gist 091a8dfbfa41d5e9a49a fruit_list-adapted.feature %}

Instead of seeding the data from the definitions, I rather just specify what I want in the definition and do the seeding in the steps. I check if the response is what was expected, I add some additional fields (success, status, href) and check for those, I return the fruits in an array, and check the array length and contents:

{% gist 091a8dfbfa41d5e9a49a fruit_list_steps.rb %}

Of course, transformations, helper methods and constants should go into their own respective files.

### Checking the http headers

Here are several handy steps for checking the *ACCEPT*, *CONTENT_TYPE* and *AUTHENTICATION* headers:

{% gist 091a8dfbfa41d5e9a49a api_steps.rb %}

### Testing authentication

Rather then calling that authentication step from the definitions, its much nicer to nest it in a definition like this:

    When I authenticate as admin

and this would be the step:

{% gist 091a8dfbfa41d5e9a49a authentication_steps.rb %}

#### Resources

- github: <a href="https://github.com/collectiveidea/json_spec">collectiveidea / json_spec</a>
