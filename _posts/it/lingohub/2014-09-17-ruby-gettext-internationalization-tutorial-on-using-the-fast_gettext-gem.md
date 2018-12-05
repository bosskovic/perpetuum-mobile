---
layout:     tech_post
categories: ['tech']
slug:       "ruby-gettext-internationalization-tutorial-on-using-the-fast_gettext-gem"
title:      Ruby gettext internationalization tutorial on using the fast_gettext gem
excerpt:    Setup, translation lookup, managing translations (MO/PO, db, yaml), rails plugin, pluralization, defaults, multiple repositories, logging...
date:       2014-09-17
tags:
  - ttt-back-end
  - ttt-gettext
  - ttt-i18n&l10n
  - ttt-ruby
animation:
  url: /assets/img/animated/tech.gif
  width: 250
  height: 176  
---

<p class='muted'>I originally published this article on <a href="http://blog.lingohub.com/">Lingohub blog</a> in 2013, while working for the company. <a href="http://lingohub.com/">Lingohub</a> specializes in providing app localization for developers and translators.</a></p>

This concludes the Ruby month of my tutorial series. So before I look at the interesting case of the **ruby gettext** approach to internationalization (using the *fast_gettext gem*) here are the links to previous articles on internationalization for Ruby that I have covered so far (in case you want to catch up):

- the <a title="Internationalization for Ruby – i18n gem" href="/tech/internationalization-for-ruby-i18n-gem/">basic usage of the i18n gem</a> with how-tos for Ruby, Rails, Sinatra and Padrino
- the <a title="i18n gem advanced features – Ruby on Rails internationalization" href="/tech/i18n-gem-advanced-features-ruby-on-rails-internationalization/">advanced features of ihe 18n gem</a>
- <a title="Internationalization for Ruby with the r18n gem" href="/tech/internationalization-for-ruby-with-the-r18n-gem/">an alternative to i18n, the r18n gem</a>  


#### Ruby gettext internationalization: What Fast Gettext can do

The topic of our fourth and final article will be covering the <a href="https://github.com/grosser/fast_gettext">fast_gettext gem</a>. **Fast Gettext** features simplicity of use, clean namespace, it is thread safe, extendible and it supports multiple backends. Since translations are cached after the first use, performance is almost the same for all the backends.

When it comes to the performance, it is claimed on the fast_gettex Github page that it  is much faster and much more efficient then the competition:

<table>
<thead>
<tr>
<th width="20%"></th>
<th width="20%">Hash</th>
<th width="20%">FastGettext</th>
<th width="20%">GetText</th>
<th width="20%">ActiveSupport I18n::Simple</th>
</tr>
</thead>
<tbody>
<tr>
<th>Speed*</th>
<td>0.82s</td>
<td>1.36s</td>
<td>4.88s</td>
<td>21.77s</td>
</tr>
<tr>
<th>RAM*</th>
<td>4K</td>
<td>8K</td>
<td>4480K</td>
<td>10100K</td>
</tr>
<tr>
<th>Included backends</th>
<td></td>
<td>db, yml, mo, po, logger, chain</td>
<td>mo</td>
<td>yml (db/key-value/po/chain in other I18n backends)</td>
</tr>
<tr>
<td colspan="5" class="muted">*50.000 translations with ruby enterprise 1.8.6 through rake benchmark</td>
</tr>
</tbody>
</table>

We already wrote extensively about Gettext in some of our previous articles, you can get back to them in order to read more about <a title="PHP internationalization with gettext tutorial" href="http://blog/?p=326">PHP internationalization with Gettext</a> or <a title="i18n gem advanced features – Ruby on Rails internationalization" href="http://blog/?p=338">setting up gettext backend</a> for i18n Ruby gem.


#### Setting up for ruby gettext: Installation of fast_gettext


<pre>$ sudo gem install fast_gettext</pre>

#### Setting the text domain and current locale

This should be done once in every Thread (e.g. Rails -&gt; ApplicationController):

<pre>FastGettext.text_domain = 'my_app'
# only allow these locales to be set (optional)
FastGettext.available_locales = ['de','en','fr','en_US','en_UK'] 
FastGettext.locale = 'de' </pre>

#### Translation lookup with fast gettext

<pre>include FastGettext::Translation
_('Car') == 'Auto'
_('not-found') == 'not-found'
s_('Namespace|no-found') == 'not-found'
n_('Axis','Axis',3) == 'Achsen' #German plural of Axis
_('Hello %{name}!') % {:name =&gt; "Pete"} == 'Hello Pete!'
</pre>

#### Managing translations – MO/PO files

PO files are plain text files and can be created in any plain text editor. There is a command line tool from the <a href="http://www.gnu.org/software/gettext/">GNU gettext</a> package that can automatize this process to a degree. After the PO file is ready, it can be converted to an MO file using a command line tool from the same package. We have covered this process in detail in one of our <a title="PHP internationalization with gettext tutorial" href="http://blog/?p=326">previous articles</a>. The author of fast_gettext has started to work on <a href="https://github.com/grosser/get_pomo">MO/PO parser/generator</a>, so you can check that project as well.

There are also <a href="http://github.com/grosser/gettext_i18n_rails">rake tasks</a> that can be used or customized.

When PO or MO files are ready, it is possible to load either of them:

**MO files:**

<pre>FastGettext.add_text_domain('my_app',:path =&gt; 'locale')</pre>

**PO files:**

<pre>FastGettext.add_text_domain('my_app',:path =&gt; 'locale', :type =&gt; :po)
# :ignore_fuzzy =&gt; true to not use fuzzy translations
# :report_warning =&gt; false to hide warnings about obsolete/fuzzy translations</pre>

#### Managing translations – database

Any model DataMapper/Sequel or any other (non-database) backend can be used. The only thing that is required is to implement the response to self.translation(key, locale) call. The plurals are separated by default with pipes ( | ), but it is possible to overwrite this. Database access is cached, so only the first lookup hits the database.

<pre>require "fast_gettext/translation_repository/db"
FastGettext::TranslationRepository::Db.require_models #load and include default models
FastGettext.add_text_domain('my_app', :type =&gt; :db, :model =&gt; TranslationKey)</pre>

#### Managing translations – yaml

If you already have a bunch of yaml files, or you just like the format and yet you want to exploit the performance of fast gettext, no problem, it supports yaml. The syntax and indentation rules should be used as in <a href="https://github.com/svenfuchs/i18n">i18n</a>.

<pre>FastGettext.add_text_domain('my_app', :path =&gt; 'config/locales', :type =&gt; :yaml)</pre>

#### Rails plugin

There is a <a href="http://github.com/grosser/gettext_i18n_rails">rails plugin</a> that simplifies the setup.

To install it as a gem, just include it in Gemfile and run bundle:

<pre>gem 'gettext_i18n_rails'</pre>

The plugin can make use of the <a href="http://github.com/svenfuchs/rails-i18n/tree/master/rails/locale/">i18n Rails localization</a>, you just need to add the files to config/locales directory.

To initialize:

<pre># config/initializers/fast_gettext.rb
FastGettext.add_text_domain 'app', :path =&gt; 'locale', :type =&gt; :po
FastGettext.default_available_locales = ['en','de'] #all you want to allow
FastGettext.default_text_domain = 'app'</pre>

And in your application:

<pre># app/controllers/application_controller.rb
class ApplicationController &lt; ...
  before_filter :set_gettext_locale</pre>

Any call to I18n that matches a gettext key will be translated through FastGettext:

<pre>I18n.locale &lt;==&gt; FastGettext.locale.to_sym
I18n.locale = :de &lt;==&gt; FastGettext.locale = 'de'
</pre>

#### Pluralization

Plurals are selected by index, for example: ['car', 'cars'][index], and the pluralisation rule decides which form will be used. By default, only the plural form for English and other similar languages is supported:  count == 1 ? 0 : 1

If a language that uses a <a href="http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html">different plural form</a> needs to be supported, a custom pluralisation rule needs to be added either via Ruby:

<pre>FastGettext.pluralisation_rule = lamda{|count| count &gt; 5 ? 1 : (count &gt; 2 ? 0 : 2)}</pre>

or via mo/po file:

<pre>Plural-Forms: nplurals=2; plural=n==2?3:4;</pre>

#### Defaults

If only one text domain is used, setting FastGettext.default_text_domain = 'app' is sufficient and no more text_domain= is needed.

If the simple rule of “first availble_locale or ‘en’” is not suficcient, FastGettext.default_locale = 'de' can be set.

If no available_locales are set, fallback can be set in default_available_locales.

#### Loading multiple repositories

Any number of repositories can be used to find a translation, and when the first can not translate a given key, the next one is searched:

<pre>repos = [
  FastGettext::TranslationRepository.build('new', :path=&gt;'....'),
  FastGettext::TranslationRepository.build('old', :path=&gt;'....')
]
FastGettext.add_text_domain 'combined', :type=&gt;:chain, :chain=&gt;repos</pre>

#### Logging

It can be useful to keep track of the keys that could not be translated or that were used. In order to do so, a Logger should be added to a Chain:

<pre>repos = [
  FastGettext::TranslationRepository.build('app', :path=&gt;'....')
  FastGettext::TranslationRepository.build('logger', :type=&gt;:logger, :callback=&gt;lamda{|key_or_array_of_ids| ... }),
}
FastGettext.add_text_domain 'combined', :type=&gt;:chain, :chain=&gt;repos</pre>

If the Logger is the first in the chain, it will record all the used translations. However if it is last, it will record only those that were not found.

#### Some other useful Ruby gettext packages

Ok, so far we have covered i18n gettext backend (in one of the previous articles) and fast gettext. It does not end there, there are some other solutions as well:

- <a href="https://github.com/mutoh/gettext">Gettext</a> for Ruby – an original package; fast_gettext was created as a response to it; this project has not been updated for some time now
- <a href="https://github.com/nubis/gettext_i18n_rails_js">GettextI18nRailsJs</a> – an extension of gettext_i18n_rails that makes the PO files available client side via javascript (as JSON)

#### Conclusion

This brings us to the end of our internationalization for Ruby series. To sum up the various alternatives:

- Ruby i18n – comes as a Rails default and would be natural first choice for the Rails developers. Can be easily used in plain Ruby or other frameworks as well. Supports multiple backends and resource files. It is quite easy to use.
- r18n – an alternative to i18n, can be used as a superset to it, has somewhat different approach to translation lookup and also add some interesting features to yaml files (filters).
- Ruby gettext – has not been maintained for a while. Several other packages have risen as a response to it.
- Ruby gettext using fast_gettext – very light and yet powerful. Also supports backends and resource files other then gettext, with no or not much additional cost in performance.

#### Further reading

- <a href="https://github.com/grosser/fast_gettext">fast_gettext</a> at github
- <a href="https://github.com/grosser/gettext_i18n_rails">gettext_i18n_rails</a> at github
- <a href="https://github.com/grosser/gettext_i18n_rails_example">Example Rails application</a>
- <a href="https://github.com/grosser/get_pomo">get_pomo</a> – mo/po parser/generator on github
- <a href="http://renderedtext.com/blog/2012/10/02/using-fastgettext-to-translate-a-rails-application/">A good tutorial on using fastgettext with database backend</a>
- <a href="http://www.yotabanana.com/hiki/ruby-gettext.html">Ruby Gettext</a>
- <a href="https://github.com/mutoh/gettext">Ruby gettext package</a> on github
- <a href="http://www.gnu.org/software/gettext/" target="_blank">GNU gettext</a>
- <a href="https://github.com/nubis/gettext_i18n_rails_js">GettextI18nRailsJs</a>
