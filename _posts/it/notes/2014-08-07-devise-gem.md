---
slug:       "devise-gem"
title:      Devise gem
excerpt:    notes
category:   tech_notes
parent_category: tech
tags:
  - ttn-ruby-gem
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
