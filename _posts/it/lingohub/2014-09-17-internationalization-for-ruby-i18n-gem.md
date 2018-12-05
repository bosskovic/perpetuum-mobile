---
layout:     tech_post
categories: ['tech']
slug:       "internationalization-for-ruby-i18n-gem"
title:      Internationalization for Ruby – i18n gem
excerpt:    i18n for plain Ruby & the i18n gem, i18n for Ruby on Rails, i18n for Sinatra, i18n for Padrino
date:       2014-09-17
tags:
  - ttt-back-end
  - ttt-i18n&l10n
  - ttt-padrino
  - ttt-ruby
  - ttt-sinatra
animation:
  url: /assets/img/animated/tech.gif
  width: 250
  height: 176  
---

<p class='muted'>I originally published this article on <a href="http://blog.lingohub.com/">Lingohub blog</a> in 2013, while working for the company. <a href="http://lingohub.com/">Lingohub</a> specializes in providing app localization for developers and translators.</a></p>

The topics covered in this article are:

- <a href="#i18n-ruby">i18n for plain Ruby & the i18n gem</a>
- <a href="#i18n-ruby-on-rails">i18n for Ruby on Rails</a>
- <a href="#i18n-sinatra">i18n for Sinatra</a>
- <a href="#i18n-padrino">i18n for Padrino</a>

Ruby is a dynamic, reflective, general-purpose <a href="http://en.wikipedia.org/wiki/Object-oriented_programming" target="_blank">object-oriented programming</a> language that combines syntax inspired by <a href="http://www.perl.org/" target="_blank">Perl</a> with <a href="http://www.squeak.org/Smalltalk/" target="_blank">Smalltalk</a>-like features. It was also influenced by <a href="http://en.wikipedia.org/wiki/Eiffel_%28programming_language%29" target="_blank">Eiffel</a> and <a href="http://en.wikipedia.org/wiki/Lisp_%28programming_language%29" target="_blank">Lisp</a>. Ruby was first designed and developed in the mid-1990s by Yukihiro “Matz” Matsumoto in Japan. [<a href="http://en.wikipedia.org/wiki/Ruby_%28programming_language%29">1</a>]

Since the emergence of web application frameworks like Ruby on Rails and DSL-s like Sinatra, Ruby has been used to reach a wide international public. Early in August 2013, there were nearly 200.000 websites world-wide using Ruby on Rails [<a href="http://trends.builtwith.com/websitelist/Ruby-on-Rails">2</a>] alone. There is no better way of reaching a wide international audience then in their own individual languages, and this series of articles will show you how. Let’s start with the basics and then we will move on to the details.

<h3 id="i18n-ruby">Internationalization for Ruby: The Ruby i18n gem</h3>

One of the most popular Ruby gems for internationalization is <a href="https://github.com/svenfuchs/i18n" target="_blank">Ruby I18n</a>. It allows translation and localization, interpolation of values to translations, pluralization, customizable transliteration to ASCII, flexible defaults, bulk lookup, lambdas as translation data, custom key/scope separator, and custom exception handlers.

The gem is split in two parts: the public API and a default backend (named Simple backend). Other backends can be used, such as Chain, ActiveRecord, KeyValue or a custom backend can be implemented.

**YAML** (.yml) or plain Ruby (.rb) files are used for storing translations in SimpleStore, but YAML is the preferred option among Ruby developers.

#### Internationalization and the YAML resource file format

<a href="http://en.wikipedia.org/wiki/Yaml" target="_blank">YAML</a> is a human-readable data serialization format. Its syntax was designed to be easily mapped to data types common to most high-level languages (lists, associative arrays and scalars). Unlike some other formats, YAML has a <a href="http://yaml.org/spec/1.2/spec.html" target="_blank">well defined standard</a>.

Key features of YAML resource file format are:

- the information is stored in key-value pairs delimited with colon ( : )
- keys can be (and usually are) nested (scoped)
- i18n expects the root key to correspond to the locale of the content, for example ‘en-US’ or ‘de’
- the “leaf key” (the one that has no “children” keys) has to have some value
- values can be escaped
- correct and consistent line indentation is important for preserving the key hierarchy
- lines starting with a hash sign ( # ) preceded with any number of white-spaces are ignored by the parser (treated as a comment)
- place-holder syntax is: %{name}, where “name” can consist of multiple non-white-space characters
- UTF-8 encoding is usually used for YAML resource files

Before we move on to demonstrate the I18n methods, lets first create an example yaml file that we will load and test:

{% gist 6231162 en.yml %}

#### Installation and setup

    gem install i18n
    
After the gem installation, change the directory to the location where the sample yaml file was saved and start the **irb** (<a href="http://en.wikipedia.org/wiki/Interactive_Ruby_Shell" target="_blank">interactive ruby shell</a>). The first step is requiring the library:

    2.0.0p247 :001 > require 'i18n'
    => true

Next, we can check the current locale. By default, it is English.

    2.0.0p247 :002 > I18n.locale
    => :en

Changing it to something else is easy:

    2.0.0p247 :003 > I18n.locale = :de
    => :de
    
#### Translation lookup

Translation lookup is done via the translate method of I18n. There is also a shorter alias available: **I18n.t**. Let’s now try to *lookup* one of the phrases from our yaml file example:

    2.0.0p247 :004 > I18n.translate :world, :scope => 'greetings.hello'
    => "translation missing: en.hello.world"

The translation is missing, because we have not loaded the file. Lets load all the .yaml and .rb files in the current directory:

    2.0.0p247 :005 > I18n.load_path = Dir['./*.yml', './*.rb']
    => ["./en.yml"]
    
and then we retry accessing the English translation with the key ‘world’:

    2.0.0p247 :006 > I18n.translate :world, :scope => 'greetings.hello'
    => "Hello world!"

When we asked for this translation, we did not pass any locale, so I18n.locale was used. A locale can be explicitly passed:

    2.0.0p247 :007 > I18n.translate :world, :scope => 'greetings.hello', :locale => :en
    => "Hello world!"
    
When passing the phrase key, a symbol or a string can be used, and a scope can be an array or dot-separated. Also all combinations of these are valid, so the following calls are equivalent:

    I18n.translate 'greetings.hello.world'
    I18n.translate 'hello.world', :scope => :greetings
    I18n.translate 'hello.world', :scope => 'greetings'
    I18n.translate :world, :scope => 'greetings.hello'
    I18n.translate :world, scope: [:greetings, :hello]
    
When a :default option is given, its value will be returned if the translation is missing. If the :default value is a symbol, it will be used as a key and translated. Multiple values can be provided as default. The first one that results in a value will be returned. For example, the following first tries to translate the key :missing and then the key :also_missing. As both do not yield a result, the string “Not here” will be returned:

    2.0.0p247 :008 > I18n.translate :missing, default: [:also_missing, 'Not here']
    => 'Not here'

Variables can be interpolated to the translation like this:

    2.0.0p247 :009 > I18n.translate :user, :scope => [:greetings, :hello], :user => 'Ela'
    => "Hello Ela!"

To look up multiple translations at once, an array of keys can be passed:

    2.0.0p247 :010 > I18n.translate [:world, :friend], :scope => [:greetings, :hello]
    => ["Hello World!", "Hello Friend!"]

Also, a key can translate to a (potentially nested) hash of grouped translations:

    2.0.0p247 :011 > I18n.translate :hello, :scope => [:greetings]
    => {:world=>"Hello World!", :user=>"Hello %{user}", :friend=>"Hello Friend!"}

#### Pluralization options in internationalization for Ruby

In English there is only one singular and one plural form for a given string, e.g. “1 message” and “2 messages”. Other languages (<a href="http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html#ar" target="_blank">Arabic</a>, <a href="http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html#ja" target="_blank">Japanese</a>, <a href="http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html#ru" target="_blank">Russian</a> and many more) have different grammars that have additional or fewer <a href="http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html" target="_blank">plural forms</a>. Thus, the I18n API provides a flexible pluralization feature.

The :count interpolation variable has a special role in that it both is interpolated to the translation and used to pick a pluralization from the translations according to the pluralization rules:

    2.0.0p247 :012 > I18n.translate :messages, :scope => :inbox, :count => 1
    => "You have one message in your inbox."
    2.0.0p247 :013 > I18n.translate :messages, :scope => :inbox, :count => 39
    => "You have 39 messages in your inbox."

The algorithm for pluralizations in :en is as simple as: entry[count == 1 ? 0 : 1]. The translation denoted as ‘one' is regarded as singular, the ‘other’ is used as plural (including the count being zero).

#### Setting up Date and Time Localization

To localize the time format, the Time object should be passed to I18n.localize. A format can be picked by passing the :format option — by default the :default format is used.

    2.0.0p247 :014 > I18n.localize Time.now
    => "Wed, 14 Aug 2013 13:34:49 +0200"
    2.0.0p247 :015 > I18n.localize Time.now, :format => :short
    => "14 Aug 13:34"
    
Instead of I18n.localize, a shorter alias can be used: **I18n.l**.

<h3 id="i18n-ruby-on-rails">i18n – the default internationalization solution for Ruby on Rails</h3>

I18n is the default internationalization solution for Ruby on Rails and it is localized with the use of the <a href="https://github.com/svenfuchs/rails-i18n" target="_blank">rails-i18n</a> gem.

In accordance with the RoR philosophy of *convention over configuration*, Rails applications come with some *reasonable defaults* already set.

For example, instead of doing this manually:

    2.0.0p247 :001 > require 'i18n'
    2.0.0p247 :002 > I18n.locale = :en
    2.0.0p247 :003 > I18n.default_locale = :en
    2.0.0p247 :004 > I18n.load_path = Dir['./*.yml']
    
Rails adds all .rb and .yml files from the config/locales directory to translations load path, automatically. The I18n library will use English as a default locale (if different locale is not set, :en will be used for looking up translations).

By default, Rails expects that all the resource files are kept in config/locales. On the other hand, we prefer to keep them organized in the subdirectories that correspond to the locale names. You might find some other mode of organization better suited, for example separating the models localization from the views localization.

Let’s change some settings by overriding the defaults in application.rb:

- let’s organize the resource files in the subdirectories corresponding to locales instead of storing everything in config/locales,
- set :de as the default locale and
- :en, :de and :fr as available locales
  

<pre>
config.i18n.load_path += Dir[Rails.root.join('config/locales/**/*.{rb,yml}').to_s]
config.i18n.default_locale = :de
config.i18n.available_locales = [:en, :de, :fr]
</pre>

Rails is localized to numerous locales (meaning, all the static text originating from Rails). For a complete list of available locales and information on missing translations or pluralization, you can check <a href="https://github.com/svenfuchs/rails-i18n" target="_blank">this page</a>.

For multilingual applications it is necessary to allow the user to change the current locale and to keep track of this choice. The chosen locale can be stored in a session or a cookie, but this practice is not recommended. The reason is, that locales should be <a href="http://www.infoq.com/articles/rest-introduction" target="_blank">RESTful</a> – transparent and a part of the URL. For example, when a user saves or shares a link to a page that he viewed in a non default locale, visiting that link should show the page in that same locale and not fall back to the default.

The information on the current locale can be passed through:

- URL query parameter  ( *http://example.com/?locale=sr* )
- URL path  ( *http://example.com/sr/* )
- domain name  ( *http://example.sr* )
- subdomain name  ( *http://sr.example.com* )
- client supplied information

#### Passing the locale as a query parameter within the URL

If the locale information is passed in the URL as a query parameter, setting the locale can be done in before_action (before_filter prior to Rails 4) in the ApplicationController:

    before_action :set_locale
    
    def set_locale
      I18n.locale = params[:locale] || I18n.default_locale
    end
    
This requires passing the locale as a URL query parameter and adding it to all the links within the application.

Doing this manually ( for example: link_to( books_url :locale => I18n.locale ) ) is not very convenient. Fortunately, Rails comes with a helper method that can be overridden: <a href="http://api.rubyonrails.org/classes/ActionController/Base.html#M000515,%20which%20is%20useful%20precisely%20in%20this%20scenario:%20it%20enables%20us%20to%20set%20%22defaults%22%20for%20%5B%60url_for%60%5D%28http://api.rubyonrails.org/classes/ActionController/Base.html#M000503" target="_blank">ApplicationController#default_url_options</a>:

    # app/controllers/application_controller.rb
    def default_url_options(options={})
      { :locale => I18n.locale }
    end
    
As a result, every helper method dependent to url_for (e.g. helpers for named routes like root_path or root_url, resource routes like books_path or books_url, etc.) will now automatically include the locale in the query string, like this: http://localhost:3000/?locale=sr.

#### Passing the locale as a part of the URL path

It is much nicer and cleaner to have the locale information at the beginning of the path instead of the end: *http://localhost:3000/sr/* vs *http://localhost:3000/?locale=sr*. This is achievable with the “over-riding default_url_options” strategy as previously demonstrated. The routes just need to be set up with the scoping option:

    # config/routes.rb
    scope "(:locale)", locale: /en|sr/ do
      resources :books
    end
    
The use of the optional path scope will allow the locale information to be omitted for the default locale without causing the Routing Error.

#### Passing the locale as a domain name or a subdomain

Setting the locale from the domain name or subdomain makes the locale of the current page very obvious and **search engines** also like this approach.

It is easy to implement it in Rails by adding a before_action to ApplicationController:

    before_action :set_locale
    
    def set_locale
      #extracting from the domain name
      I18n.locale = extract_locale_from_tld || I18n.default_locale
    
      #extracting from subdomain:
      #I18n.locale = extract_locale_from_subdomain || I18n.default_locale
    end
    
    def extract_locale_from_tld
      parsed_locale = request.host.split('.').last
      I18n.available_locales.include?(parsed_locale.to_sym) ? parsed_locale  : nil
    end
    
    def extract_locale_from_subdomain
      parsed_locale = request.subdomains.first
      I18n.available_locales.include?(parsed_locale.to_sym) ? parsed_locale : nil
    end
    
#### Setting the locale from client-supplied information

Information other than the page URL can be used to set the appropriate locale for the current user. For example, if the user has saved his preferred locale in the user profile of the web application or web service, after the log in, the current locale can be set:
    
    I18n.locale = current_user.locale

Each HTTP request contains information that can also be used, for example the preferred language set in the browser or the geographical information inferred from the IP address.

A trivial implementation of using an Accept-Language header would be:

    def set_locale
      I18n.locale = extract_locale_from_accept_language_header
    end
    
    private
    def extract_locale_from_accept_language_header
      request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
    end
    
For production environments perhaps a more complex <a href="https://github.com/iain/http_accept_language" target="_blank">plugin</a> or <a href="https://github.com/rack/rack-contrib/blob/master/lib/rack/contrib/locale.rb" target="_blank">rack middleware</a> would be more suitable.

Another way of choosing the locale from client information would be to use a database for mapping the client IP to the region, such as <a href="http://www.maxmind.com/app/geolitecountry" target="_blank">GeoIP Lite Country</a>. The mechanics of the code would be very similar to the accept-language example — first the database would be queried for the user’s IP, and then the preferred locale looked up for the country/region/city returned.

#### Translation lookup and date/time Localization with Ruby on Rails

The use of the I18n.translate and I18n.localize methods was described in detail in the previous sections on Internationalization for plain Ruby. In addition to that, Rails adds **t** (translate) and **l** (localize) helper methods to controllers and views so that spelling out I18n.t and I18n.l all the time is not necessary. These helpers will catch missing translations and wrap the resulting error message into a <span>.

    #instead of I18n.translate :hello
    t :hello
    #instead of I18n.localize Time.now
    l Time.now
    
#### Inflection Rules For Locales Other then English

Rails 4.0 allows you to define <a href="http://en.wikipedia.org/wiki/Inflection" target="_blank">inflection</a> rules (such as rules for singularization and pluralization) for locales other than English. In config/initializers/inflections.rb, you can define these rules for multiple locales. The initializer contains a default example for specifying additional rules for English; follow that format for other locales as you see fit.

#### Localized Views in Rails

If there is a view template index.html.erb present in the views directory, it is possible to put a localized variant of this template: index.de.html.erb in the same directory, and Rails will render it when the locale is set to :de. When the locale is set to the default locale, the generic index.html.erb view will be used.

This feature can be useful when working with a large amount of static content.

#### Using Safe HTML Translations in Ruby on Rails

Keys with a ‘_html’ suffix and keys named ‘html’ are marked as HTML safe. They should be used without escaping.

<pre># config/locales/en.yml
en:
  welcome: &lt;b>welcome!</b>
  hello_html: &lt;b>hello!</b>
  title:
    html: &lt;b>title!</b></pre>
<pre># app/views/home/index.html.erb
<div><%= t('welcome') %></div>
<div><%= raw t('welcome') %></div>
<div><%= t('hello_html') %></div>
<div><%= t('title.html') %></div></pre>

The output would be something like this:

&lt;b>welcome!</b><br />
&lt;b>welcome!</b><br />
<b>hello!</b><br />
<b>title!</b>

#### Translations for Active Record Models

Methods Model.model_name.human and Model.human_attribute_name(attribute) can be used to transparently look up translations for model and attribute names. For example when the following translations are added:


    en:
      activerecord:
        models:
          user: Dude
        attributes:
          user:
            login: "Handle"
          # will translate User attribute "login" as "Handle"
          
The User.model_name.human will return “<a href="http://www.urbandictionary.com/define.php?term=dude" target="_blank">Dude</a>” and User.human_attribute_name(“login”) will return “Handle”.

#### Error Message Scopes

Active Record gives a several namespaces for placing message translations in order to provide different messages and translation for certain models, attributes, and/or validations. It also transparently takes single table inheritance into account.

For example, if there is an ActiveRecord model “User” that has the :presence validation for :name, the key for the message would be :blank. ActiveRecord will look up for this key in several namespaces, in this order:

    activerecord.errors.models.[model_name].attributes.[attribute_name]
    activerecord.errors.models.[model_name]
    activerecord.errors.messages
    errors.attributes.[attribute_name]
    errors.messages
    
If the models are using inheritance, then the messages are also looked up in the inheritance chain.

#### Error Message Interpolation

The translated model name, translated attribute name, and value are always available for interpolation. So, instead of the default error message “can not be blank” the attribute name could be used like this : “Please fill in your %{attribute}”.

For the complete list of available interpolation variables, check <a href="http://guides.rubyonrails.org/i18n.html#error-message-interpolation" target="_blank">this link</a>.

#### Translations for Action Mailer E-Mail Subjects

If a subject is not passed to the mail method, Action Mailer will try to find it in the translations. The performed lookup will use the pattern <mailer_scope>.<action_name>.subject to construct the key.

    # user_mailer.rb
    class UserMailer < ActionMailer::Base
      def welcome(user)
        #...
      end
    end
    
<pre>en:
  user_mailer:
    welcome:
      subject: "Welcome to LingoHub!"</pre>
      
<h3 id="i18n-sinatra">Internationalization for Sinatra with i18n gem</h3>

<a href="http://www.sinatrarb.com/" target="_blank">Sinatra</a> can be easily set up to use i18n gem for internationalization:

    require 'i18n'
    require 'i18n/backend/fallbacks'
    
    configure
      I18n::Backend::Simple.send(:include, I18n::Backend::Fallbacks)
      I18n.load_path, Dir[File.join(settings.root, 'locales', '*.yml')]
      I18n.backend.load_translations
    end
    
#### Passing the locale

As previously described for Ruby on Rails, there are several methods of passing the locale information:

- Specific urls:
<pre>
before '/:locale/*' do
  I18n.locale       =       params[:locale]
  request.path_info = '/' + params[:splat ][0]
end
</pre>
- dedicated subdomain:
<pre>
before do
  if (locale = request.host.split('.')[0]) != 'www'
    I18n.locale = locale
  end
end
</pre>
- browser preference (requires <a href="https://github.com/rack/rack-contrib" target="_blank">rack-contrib</a>)
<pre>use Rack::Locale</pre>

When the i18n gem is required, the resource file paths set and the locale passed, the pages can be translated and localized with the I18n.t and I18n.l methods, as described earlier in the article. To avoid allways typing the module name in the method calls, a simple helpers can be defined:

    helpers do
      def t(*args)
        I18n.t(*args)
      end
    
      def l(*args)
        I18n.l(*args)
      end
    end
    
For rendering localized templates, **find_template** method needs to be extended. It needs to select the first template matching the user locale (or at least one acceptable fallback). To help in the selection process templates stored in the views directory are suffixed by the name of the locale.

    helpers do
      def find_template(views, name, engine, &amp;block)
        I18n.fallbacks[I18n.locale].each { |locale|
          super(views, "#{name}.#{locale}", engine, &amp;block) }
        super(views, name, engine, &amp;block)
      end
    end
    
<h3 id="i18n-padrino">Internationalization for Padrino with i18n gem</h3>

i18n gem is used as a default internationalization solution for the <a href="http://www.padrinorb.com" target="_blank">Padrino</a> framework, and by default Padrino will search for all .yml or .rb files located in app/locale. Localization is fully supported in:

- padrino-core (date formats, time formats etc…)
- padrino-admin (admin language, orm fields, orm errors, etc…)
- padrino-helpers (currency, percentage, precision, duration etc…)

So far Padrino itself has been localized to the following languages: Czech, Danish, German, English, Spanish, French, Italian, Dutch, Norwegian, Russian, Polish, Brazilian Portuguese, Turkish, Ukrainian, Traditional Chinese, Simplified Chinese, Japanese.

Translation and localization is done in a similar way as described previously.

Setting the default locale can be done in config/boot.rb:

    Padrino.before_load do
      I18n.locale = :en
    end
    
i18n is simple to use and yet very powerful, it has everything that most developers need. Thanks to that, it has become the most popular internationalization solution in the Ruby world.

I18n in most cases really works practically “out of the box”. It is easy to set up and use, and after that, the only thing you’ll need is a <a href="http://lingohub.com" target="_blank">reliable localization service</a>.

In this article we described the basic use of the i18n gem. The next article in the Internationalization for Ruby series will demonstrate some advanced applications.

#### Sources

1. <a href="http://en.wikipedia.org/wiki/Ruby_%28programming_language%29" target="_blank">Wikipedia article on Ruby</a>
2. <a href="http://trends.builtwith.com/websitelist/Ruby-on-Rails" target="_blank">List of websites using RoR on builtwith.com</a>


#### Further reading

- This article uses <a href="http://guides.rubyonrails.org/i18n.html" target="_blank">Ruby on Rails Guides</a> as the main source
- Internationalization for Ruby wiki on <a href="http://ruby-i18n.org/wiki" target="_blank">ruby-i18n.org</a>
- <a href="http://yaml.org/spec/1.2/spec.html" target="_blank">YAML 1.2 specification</a>
- <a href="http://yaml.org/refcard.html" target="_blank">YAML 1.1 Reference card</a>
- <a href="http://en.wikipedia.org/wiki/Yaml" target="_blank">Wikipedia article on yaml</a>
- Internationalization for Ruby wiki on <a href="http://ruby-i18n.org/wiki" target="_blank">ruby-i18n.org</a>
- <a href="https://github.com/svenfuchs/rails-i18n" target="_blank">rails-i18n github repository</a>
- <a href="http://rubyonrails.org/" target="_blank">Ruby on Rails home page</a>
- <a href="https://github.com/rails/rails" target="_blank">Ruby on Rails github page</a>
- i18n for Sinatra on <a href="http://recipes.sinatrarb.com/p/development/i18n" target="_blank">Sinatra Recipes</a>
- <a href="http://www.sinatrarb.com/" target="_blank">Sinatra home page</a>
- <a href="https://github.com/sinatra/sinatra" target="_blank">Sinatra github page</a>
- <a href="http://www.padrinorb.com/guides/localization" target="_blank">Padrino guide for localization</a>
- <a href="http://www.padrinorb.com/" target="_blank">Padrino home page</a>
- <a href="https://github.com/padrino/padrino-framework" target="_blank">Padrino github page</a>
