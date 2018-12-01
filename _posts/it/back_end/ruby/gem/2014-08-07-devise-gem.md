---
layout:     tech_post
categories: ['tech']
slug:       "devise-gem"
title:      Devise gem
excerpt:    notes
date:       2014-08-07
tags:
  - ttt-ruby-gem
animation:
  url: /assets/img/tech.gif
  width: 250
  height: 176  
---

### Installation

#### In Gemfile:

<pre>gem 'devise', '3.2.4'</pre>

#### Running the generator:

<pre>rails generate devise:install</pre>

#### Generating the model:

<pre>rails generate devise User</pre>

#### Migration:

{% gist 816623404b60b30726a8 migration.rb %}

#### Model (user):

<pre>devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable, :confirmable</pre>

#### Changes in initializer devise.rb:

<pre>config.mailer_sender = '...'
config.http_authenticatable = true
config.skip_session_storage = [:http_auth, :token_auth]
# if :confirmable
config.allow_unconfirmed_access_for = 2.days</pre>

***

Confirmation token is being stored as a hash:

- <a href="https://github.com/plataformatec/devise/issues/2615">devise issue</a>
