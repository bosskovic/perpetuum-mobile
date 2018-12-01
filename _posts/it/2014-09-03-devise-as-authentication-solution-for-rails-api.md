---
layout:     tech_post
categories: ['tech']
slug:       "devise-as-authentication-solution-for-rails-api"
title:      Devise as authentication solution for rails API
excerpt:    Authentication token, the use of sessions, intsallation and setup, configuring the model, the routes, application controller, custom devise controllers, testing the controllers
date:       2014-09-03
tags:
  - ttt-api
  - ttt-back-end
  - ttt-ruby
  - ttt-ruby-gem
  - ttt-security
animation:
  url: /assets/img/tech.gif
  width: 250
  height: 176  
---

Instead of implementing my own authentication, I decided to adapt the Devise for my rails API. it differs in two main ways when applied to the rails API as opposed to the "regular" rails application:

- it uses authentication token
- it does not use sessions

### Authentication token

Until recently Devise had the support for **token authenticatable** as an authentication method. That has changed since the <a href="http://blog.plataformatec.com.br/2013/08/devise-3-1-now-with-more-secure-defaults/">Devise version 3.1</a>. The reason given was a possible vulnerability to the timing attacks, since the token was being stored in the database undigested.

In short, timing attacks exploit the analyses of response times of methods that do a byte by byte comparison (for example of tokens) and deduce the progress of guessing the target. This can be addressed by providing a key along the token and by using a safe comparison method that either has random or constant execution time.

( -> read more about timing attacks in an article on <a title="Password attacks" href="/tech/password-attacks/">Password attacks</a> )

{% gist 816623404b60b30726a8 secure_compare.rb %}

<a href="https://github.com/gonzalo-bulnes/simple_token_authentication">Simple Token Authentication</a> gem that nicely wraps all the fixes for authentication token support for Devise was developed by Gonzalo Bulnes, and that is what I use, but I will also explain what it does every step of the way.

#### Resources

- blog:<a href="http://blog.plataformatec.com.br/2013/08/devise-3-1-now-with-more-secure-defaults/"> an article about changes in devise 3.1 by devise's Jose Valim</a>
- gist:<a href="https://gist.github.com/josevalim/fb706b1e933ef01e4fb6"> solution proposed by Jose Valim</a>
- github: gem - <a href="https://github.com/gonzalo-bulnes/simple_token_authentication">Simple Token Authentication</a>
- github: gem - <a href="https://github.com/plataformatec/devise">Devise</a>

### The use (and lack of) sessions

The sessions are used by Devise to "memorize" the signed in user and not force the authentication of every request. Since REST-full API should be stateless, the sessions are not used, and the authentication is required for each request for protected resources. However, there are still two types of requests:

- one that can be seen as "sign in", where username and password are sent in a request and an authentication token is received in a response, and
- all other requests that contain that token and a database id (preferably not the table id, but rather some other unique value, such as email or UUID) in the params or in the header.

I will demonstrate how the sessions should be disabled in a moment.

### Installation and initial setup

First, the gems should be added to the Gemfile:

{% gist 816623404b60b30726a8 Gemfile %}

Next, the generators should be run. I named my model "User", but it can be something else.

{% gist 816623404b60b30726a8 generators.sh %}

The first generator creates the devise initializer with the default settings and the second one creates a model and configures it with the default Devise modules, configures the routes to the Devise controller and creates a migration.

The default URL options for the Devise mailer should be set in each environment:

{% gist 816623404b60b30726a8 development.rb %}

### Configuring the model

The migration needs to be updated to include other (custom) fields that might be needed for the specific application, and it needs to include the **authentication_token**.

{% gist 816623404b60b30726a8 migration.rb %}

Next, the Devise method should be used in the model to enable the modules that should be used. The validation of the user's password, password_confirmation and email uniqueness is best left to the Devise.

By default, if the password_confirmation is **nil** (not sent at all, as opposed to being sent as empty), it does not affect the validity of a sign up. And that makes sense for an API, since the request is being sent by the client application (and not the user through a form), and that is where the check for confirmation should be done.

However the password_confirmation presence can be enforced as in the commented out line in the following gist:

{% gist 816623404b60b30726a8 user.rb %}

A call to **acts_as_token_authenticatable** is a part of <a href="https://github.com/gonzalo-bulnes/simple_token_authentication/blob/master/lib/simple_token_authentication/acts_as_token_authenticatable.rb">simple_token_authentication</a> gem, and it ensures that if the authentication_token is nil, one is generated before saving.

It should be noted that by the design of the simple_token_authentication gem the authentication_token is not being digested before storing in the database. The reason stated by the gem author is that the security concern does not justify the overhead created by hashing the token on each request. As of the time of writing this article (early September 2014) an option to support hashing the token was not available, but there was plan to add it.

{% gist 816623404b60b30726a8 token_generation.rb %}

The fact that the generation is triggered when the token is nil can be used to easily reset the token when needed.

By default, when signing in the user the session is <a href="https://github.com/gonzalo-bulnes/simple_token_authentication/blob/master/lib/simple_token_authentication/acts_as_token_authentication_handler.rb#L61">not being stored</a>, but that can be changed in configuration.

### The routes

In the routes file the devise_for needs to be set for the model that is being authenticated. Also the controllers that will be overridden need to have their default routes overridden as well. The default format should be json, and the scoping for api version is optional but can be handy.

{% gist 816623404b60b30726a8 routes.rb %}

### Application controller

The application controller is inherited by other controllers, so it is a good place to authenticate user from the token. This is being done by **acts_as_token_authentication_handler_for** of the <a href="https://github.com/gonzalo-bulnes/simple_token_authentication/blob/master/lib/simple_token_authentication/acts_as_token_authentication_handler.rb">simple_authentication_token</a> gem. fallback_to_devise option needs to be set to false, to prevent the CSRF attacks.

{% gist 816623404b60b30726a8 application_controller.rb %}

### Custom Devise controllers

The task of registration controller is to sign up users (create their accounts), and sign them off (destroy / deactivate the accounts). The account creation does not require authentication for the account creation, so if the support for destroy action is not needed, all before filters from the following gist can be removed.

The original create method handles the sign up parameter validation, and that is still needed, and what should be overridden are the responses, that should be json, and should include success status (201) and any other information as specified for the application.

However, the destroy action needs to be authenticated, so the **acts_as_token_authentication_handler_for** method is used to add the authenticate_entity_from_token! and authenticate_entity! before filters. But these are needed only for destroy and need to be skipped for create.

In the destroy action the user can either be permanently destroyed (resource.destroy) or just deactivated. For deactivation to work, the deactivated_at field needs to be added to the migration, and taken into account when signing in.

{% gist 816623404b60b30726a8 registrations_controller.rb %}

Sessions controller is used in Devise authenticate the user by the credentials sent at the start of the session. In this setup for the API, there are no sessions, so the create action authenticates the user's credentials and responds with the authentication_token that will be used for further authentication.

On create action, the authentication token can be reset. This is good security practice since the authentication_token is stored in the client application and could be compromised, but resetting the token will automatically "sign out" any client that was using it at that moment, and will prevent several clients to use it at the same time. This can be addressed by creating several tokens, one for each client.

Since there are no sessions, the sign out is not necessary, but can be used to manually reset the token.

{% gist 816623404b60b30726a8 sessions_controller.rb %}

If the module confirmable is enabled in the model, and the necessary fields are added in the migration, the confirmations controller can be customized. The show action receives the GET request with the (hashed) confirmation token in the params, and is responsible for confirming it. The only thing that needs to be overridden is the response.

I should be noted (especially for testing) that since the Devise version 3.1 the confirmation token is digested before storing in the database.

{% gist 816623404b60b30726a8 confirmations_controller.rb %}

### Testing the controllers

When testing the custom devise controllers with Rspec, it is necessary to include the **Devise::TestHelpers** and to set **request.env['devise.mapping'] = Devise.mappings[:user]** before each example. The reason for the later is that since the functional tests do not pass through the router, the Devise needs to be told explicitly what mapping is used.

In each request json needs to be specified as format, and this can be done like this: **post :create, request_params.merge(format: 'json')**.

If the authentication token and the entity key are being sent via the header and not through the params (simple_token_authentication supports both out of the box), these helpers can be used in the test examples to add the token to the headers:

{% gist 816623404b60b30726a8 auth_helpers.rb %}

Other then that, testing the Devise custom controllers is just like testing any other controller.

And that is it, the authentication is set up, and the next step is dealing with the resource authorization, but that's another story...