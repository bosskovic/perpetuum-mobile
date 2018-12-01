---
layout:     tech_post
categories: ['tech']
slug:       "factorygirl"
title:      Factorygirl
excerpt:    notes
date:       2014-08-05
tags:
  - ttt-bdd-/-tdd
  - ttt-ruby-gem
animation:
  url: /assets/img/tech.gif
  width: 250
  height: 176  
---

http://rubydoc.info/gems/factory_girl/file/GETTING_STARTED.md

***

<pre>it "redirects to the home page upon save" do
  post :create, contact: Factory.attributes_for(:contact)
  response.should redirect_to root_url
end
</pre>

A factory generates test data to pass to the controller method; note the use of Factory Girl’s <code>attributes_for</code> option, which generates a hash of values as opposed to a Ruby object.

#### After create

<pre>factory :user do
  after(:create) {|instance| create_list(:post, 5, user: instance) }
end
</pre>

Resources:

- <a href="http://everydayrails.com/2012/04/07/testing-series-rspec-controllers.html">http://everydayrails.com/2012/04/07/testing-series-rspec-controllers.html</a>
