---
layout:     tech_post
categories: ['tech']
slug:       "internationalization-for-ruby-with-the-r18n-gem"
title:      Internationalization for Ruby with the r18n gem
excerpt:    Installation and setup, translation lookup, filters for translations processing, pluralization, translating activeRecord models and plain Ruby objects, locale settings, r18n wrappers for rails and sinatra, r18n vs i18n
date:       2014-09-17
tags:
  - ttt-back-end
  - ttt-i18n&l10n
  - ttt-ruby
animation:
  url: /assets/img/animated/tech.gif
  width: 250
  height: 176  
---

<p class='muted'>I originally published this article on <a href="http://blog.lingohub.com/">Lingohub blog</a> in 2013, while working for the company. <a href="http://lingohub.com/">Lingohub</a> specializes in providing app localization for developers and translators.</a></p>

The previous two articles on <a title="Internationalization for Ruby – i18n gem" href="/tech/i18n-gem-advanced-features-ruby-on-rails-internationalization/">internationalization 
for Ruby</a> have covered the usage of the i18n gem in detail. This article will introduce an alternative: <a href="https://github.com/ai/r18n">R18n</a> including usage of the **r18n gem**.

R18n is an internationalization tool that can be used in the process of creating multilingual Ruby applications. It **contains a core gem and out-of-box wrapper plugins** for frameworks or environments (Rails, Sinatra, desktop). Some of its features are Ruby style syntax, filters, model (or Ruby object) translation, auto detection of user locales, flexible locales and flexibility in general.

Just like the<a title="Internationalization for Ruby – i18n gem" href="/tech/internationalization-for-ruby-i18n-gem/"> 
i18n gem</a> that we described previously, the default resource file format for r18n is YAML. The file names should 
correspond to the locale used. Here is a sample en.yml file that the test will be run on:

{% gist 6266650 en.yaml %}

#### Installation and setup of the r18n gem

    gem install r18n-core
    
After installing the gem, lets start the console in the directory where the sample YAML file is located, require the library and set the default resource files’ location and a locale that will be used:

    2.0.0-p247 :001 > require 'r18n-core'
      => true
    2.0.0-p247 :002 > R18n.default_places = './'
      => "./"  
    2.0.0-p247 :003 > R18n.set('en') 
      => #<R18n::I18n:0x00000001f114a8 ...
      
#### Translation lookup with r18n

To access the translation lookup functionality in r18n, method **t** of the R18n module can be used, or the helper method **t** if the *R18n::Helpers* is included. The method returns a Translation object on which other methods that correspond to the phrase key can be chained:

    2.0.0-p247 :004 > R18n.t.greetings.hello.world 
      => "Hello World!"
    
    2.0.0-p247 :005 > include R18n::Helpers
      => Object
    2.0.0-p247 :006 > t.greetings.hello.world 
      => "Hello World!"
    
    2.0.0-p247 :007 > t.class
     => R18n::Translation 
    2.0.0-p247 :008 > t.greetings.class
     => R18n::Translation 
    2.0.0-p247 :009 > t.greetings.hello.world.class
     => R18n::TranslatedString
    
If a translation that is missing is looked up, the Untranslated object is returned. To check if the translation exists, the **translated?** method can be used. Providing a fall-back value for a missing translation is also easy:

    2.0.0-p247 :010 > t.greetings.hello.everybody
      => #<R18n::Untranslated:0x00000001d75158 @translated_path="greetings.hello.", 
    @untranslated_path="everybody", @locale=Locale en (English), 
    @filters=#<R18n::GlobalFilterList:0x000000014bfae0>> 
    
    2.0.0-p247 :011 > t.greetings.hello.everybody.class
     => R18n::Untranslated 
    
    2.0.0-p247 :012 > t.greetings.hello.everybody.translated?
      => false
    
    2.0.0-p247 :013 > t.greetings.hello.everybody | 'default'
      => 'default'
      
To interpolate a variable in the string, the values should be passed as arguments.

    2.0.0-p247 :014 > t.greetings.hello.user 'stranger', 'our site'
     => "Hello stranger, welcome to our site"
    
Not providing the value for variables wont raise any exceptions, it will just leave place-holders blank.

    2.0.0-p247 :015 > t.greetings.hello.user
     => "Hello , welcome to "
    
#### Filters for translations processing in r18n

Filters can be used to process translations in various ways. In the resource file filtered content needs to be marked by YAML type. R18n has built in filters for HTML escaping, Textile, Markdown and lambdas. Prior to using Textile , <a href="https://github.com/jgarber/redcloth">RedCloth</a> gem needs to be installed.

<pre>hi: !!markdown
  Hi, **people**!
greater: !!escape
  1 &lt; 2 is true
greater_no_filter:
  1 &lt; 2 is true
alarm: !!textile
  It will delete _all_ users!</pre>

<pre>2.0.0-p247 :019 &gt; t.greater
 => "1 &amp;lt; 2 is true" 
2.0.0-p247 :020 &gt; t.greater_no_filter
 => "1 &lt; 2 is true" 
2.0.0-p247 :021 &gt; t.hi
 => "&lt;p&gt;Hi, &lt;strong&gt;people&lt;/strong&gt;!&lt;/p&gt;\n"
2.0.0-p247 :022 &gt; t.alarm
 => "&lt;p&gt;It will delete &lt;em&gt;all&lt;/em&gt; users!&lt;/p&gt;"</pre>

Lambdas can also be used in the translations:

<pre>sum: !!proc |x, y| x + y</pre>

<pre>2.0.0-p247 :023 &gt; t.sum
 => 3</pre>

Any unwanted filter can be switched off;

<pre>R18n::Filters.off(:procedure)</pre>

Custom filters can be defined in <a href="https://github.com/ai/r18n/blob/master/r18n-core/lib/r18n-core/filters.rb">filters.rb</a>.

#### Pluralization in the .yml file

The keys of the phrases containing the plural forms should be marked with the **pl** filter in the YAML file, and its children keys should correspond to the cardinal numbers, or “n”:

<pre>inbox:
  messages: !!pl
    0: Your inbox is empty.
    1: You have one message in your inbox.
    n: You have %1 messages in your inbox.</pre>

To access the plural, the count should be passed as an argument.

<pre>2.0.0-p247 :016 &gt; t.inbox.messages 0
 => "Your inbox is empty." 
2.0.0-p247 :017 &gt; t.inbox.messages 1
 => "You have one message in your inbox." 
2.0.0-p247 :018 &gt; t.inbox.messages 39
 => "You have 39 messages in your inbox."</pre>

<h4> Localization with r18n</h4>

For localizing the time, date, numbers and currency, R18n::l method can be used, or just l, if the R18n::Helpers was included.

Numbers and floats can be formatted according to the rules of the current locale. The real typographic minus and non-breakable spaces will be used for formatting (if required by the rules).

<pre>l -12000.5 #=> "−12,000.5"</pre>

Months, week day names, Time, Date and DateTime can be translated by the strftime method:

<pre>l Time.now, '%B'  #=> "September"</pre>

R18n has some built-in time formats for locales: :human, :full and :standard (the default):

<pre>l Time.now, :human #=> "now"
l Time.now, :full  #=> "August 9th, 2009 21:47"
l Time.now         #=> "08/09/2009 21:41"
l Time.now.to_date #=> "08/09/2009"</pre>

#### Translating ActiveRecord models and plain Ruby objects

With r18n it is possible to add localized fields to the model (or any other Ruby object) that would respond to the common methods and the fields would be accessed depending on the current locale. For example, to have this feature for the title and text fields of the model Post and English and Russian locales, this should be added to the migration:

<pre>t.string :title_en
t.string :title_ru

t.string :text_en
t.string :text_ru</pre>

Next, R18n::Translated should be included in the model and the translation method called:

<pre>class Post &lt; ActiveRecord::Base
  include R18n::Translated

  translations :title, :text
end</pre>

Now, the model will have virtual methods title, text, title= and text=, which will call title_ru or title_en, based on current user locale.

<pre>&gt; post = Post.first
&gt; R18n.set('en')
&gt; post.title
 => "English title"
&gt; R18n.set('ru')
&gt; R18n.title
 => "Russian title"</pre>

#### Locale settings

Settings for all the locales that r18n supports are located at <a href="https://github.com/ai/r18n/tree/master/r18n-core/locales">locales directory</a> of the r18n gem. The settings include the locale name, sub-locales, date/time and number localization and pluralization rules.

To get information about a locale, an instance of R18n::Locale should be created:

<pre>locale = R18n.locale('en')
locale.title #=> "English"
locale.code  #=> "en"

# left to right setting:
locale.ltr? #=> true
locale.week_start #=> :sunday</pre>

#### R18n wrappers for Rails and Sinatra

<a href="https://github.com/ai/r18n/tree/master/r18n-rails">r18n-rails</a> gem adds out of box support for Rails internationalization. It is a wrapper for <a href="https://github.com/ai/r18n/tree/master/r18n-rails-api">r18n-rails-api</a> and <a href="https://github.com/ai/r18n">r18n-core</a> libraries. The main differences to the core gem are that

- it comes with some defaults set for Rails (for example, translations are stored in app/i18n/locale.yml),
- r18n helper methods are automatically available in the views and controllers
- and both i18n and r18n syntax can be used interchangeably

To install the gem, it should be added to the Gemfile:

<pre>gem 'r18n-rails'</pre>

Both i18n and r18n syntax can be used interchangeably:

<pre>t 'user.name',  :name => 'John'
t 'user.count', :count => 5</pre>

<pre>t.user.name(:name => 'John') # for Rails I18n named variables
t.user.name('John') # for R18n variables 
t.user.count(5)</pre>

<a href="https://github.com/ai/r18n/tree/master/sinatra-r18n">r18n-sinatra</a> is a wrapper of r18n-core that provides the support for Sinatra applications.

To add r18n to Sinatra application:

1. ./i18n/ directory should be created
2. yaml files should be placed at ./i18n/
3. r18n should be added to Sinatra application:

<pre>require 'sinatra/r18n'

#the defaults can be overridden:
#R18n::I18n.default = 'ru'
#R18n.default_places { './translations' }</pre>

If the application inherits from Sinatra::Base, this should also be added:

<pre>class YourApp &lt; Sinatra::Base
  register Sinatra::R18n
  set :root, File.dirname(__FILE__)</pre>

4. locales can be added to urls, for example:

<pre>get '/:locale/posts/:id' do
  @post = Post.find(params[:id])
  haml :post
end</pre>

or saved in a session:

<pre>before do
  session[:locale] = params[:locale] if params[:locale]
end</pre>

5. r18n helper methods for translation and localization can be used in views.

<pre>&gt; t.hello('Ela')
# => "Hello Ela"</pre>

### r18n vs i18n

In the end, here is a quick comparison of translation, interpolation and pluralisation with these two gems:

<table border="0">
<tbody>
<tr>
<td>library</td>
<td width="50%">**i18n**</td>
<td width="50%">**r18n**</td>
</tr>
<tr>
<td>translation</td>
<td>
<pre>en:
  hello: Hello, %{username)</pre>
<pre>&gt; t :hello, :username('Ela')
# => "Hello Ela"</pre>
</td>
<td>
<pre>#
hello: Hello, %1</pre>
<pre>&gt; t.hello('Ela')
# => "Hello Ela"</pre>
</td>
</tr>
<tr>
<td>pluralisation</td>
<td>
<pre> ru:
  robots:
    one: %{count} робот
    few: %{count} робота
    many: %{count} роботов</pre>
<pre>&gt; t('robots', :count => 1)
# => 1 робот</pre>
</td>
<td>
<pre>#
robots: !!pl
  1: %1 робот
  2: %1 робота
  n: %1 роботов</pre>
<pre>&gt; t.robots(1)
# => 1 робот</pre>
</td>
</tr>
</tbody>
</table>

<h4>Further reading</h4>

- <a href="https://github.com/ai/r18n">r18n library</a>
- <a href="https://github.com/ai/r18n/tree/master/r18n-core">r18n-core</a> gem
- <a href="https://github.com/ai/r18n/tree/master/r18n-rails">r18n-rails</a>
- <a href="https://github.com/ai/r18n/tree/master/r18n-rails-api">r18n-rails-api</a>
- <a href="https://github.com/ai/r18n/tree/master/sinatra-r18n">r18n-sinatra</a>
- <a href="http://www.slideshare.net/iskin/r18n">r18n presentation</a> (in Russian)
