---
slug:       "cucumber-gem"
title:      Cucumber gem
excerpt:    notes
category:   tech_notes
parent_category: tech
date:       2014-08-05
tags:
  - ttn-cucumber
  - ttn-ruby-gem
  - ttn-bdd-/-tdd
---

Gemfile:

<pre>group :development, :test do
  gem 'rspec-rails', '3.0.2'
  gem 'factory_girl_rails', '4.4.1'
end

group :test do
  gem 'cucumber-rails', '1.4.1', :require =&gt; false
  gem 'cucumber-api-steps', :require =&gt; false
  gem 'shoulda-matchers', '2.6.2'
  gem 'database_cleaner', '1.3.0'
end</pre>

Generator:

<pre>rails generate cucumber:install</pre>

In /features/support/custom_env.rb :

<pre>require 'cucumber/api_steps'</pre>

Resources:

- <a href="https://semaphoreapp.com/blog/2013/08/14/setting-up-bdd-stack-on-a-new-rails-4-application.html">https://semaphoreapp.com/blog/2013/08/14/setting-up-bdd-stack-on-a-new-rails-4-application.html</a>
- https://github.com/jayzes/cucumber-api-steps
- https://github.com/collectiveidea/json_spec

