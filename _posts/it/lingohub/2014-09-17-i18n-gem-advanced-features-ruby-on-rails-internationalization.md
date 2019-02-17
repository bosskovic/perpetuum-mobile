---
slug:       "i18n-gem-advanced-features-ruby-on-rails-internationalization"
title:      i18n gem advanced features – Ruby on Rails internationalization
excerpt:    Using Different Backends for Ruby i18n gem, chaining backends, caching is an i18n gem advanced feature, fallbacks, Translation Metadata, cascading lookups, translation symlinks, using custom exception handlers
date:       2014-09-17
tags:
  - ttt-i18n&l10n
  - ttt-ruby
---

<p class='muted'>I originally published this article on <a href="http://blog.lingohub.com/">Lingohub blog</a> in 2013, while working for the company. <a href="http://lingohub.com/">Lingohub</a> specializes in providing app localization for developers and translators.</a></p>

<a title="Internationalization for Ruby – i18n gem" href="/tech/internationalization-for-ruby-i18n-gem/">Previous article on internationalization 
for Ruby</a> has covered the basic use of the **i18n gem** – currently one of the most popular internationalization 
solutions in the Ruby world. It contains all the information on setup and usage that most Ruby, Ruby on Rails, Sinatra 
or Padrino developers will need. However, there is much more to this gem. This article will highlight some **i18n gem 
advanced features** in Ruby on Rails internationalization.

### Using Different Backends for Ruby i18n gem

I18n gem comes with the <a href="https://github.com/svenfuchs/i18n/blob/master/lib/i18n/backend/simple.rb" target="_blank">Simple backend</a> by default. It can load resource files in YAML or Ruby hashes, but can store new translations only in the memory – it is not possible to save them. This can be a problem if the translation support needs to be built into the application. Also, sometimes for one reason or another, the use of YAML or Ruby hash resource file formats is not an option.

With the i18n gem, other backends can easily be used instead of Simple backend, for example <a href="https://github.com/svenfuchs/i18n/blob/master/lib/i18n/backend/key_value.rb" target="_blank">Key-Value,</a> <a href="https://github.com/svenfuchs/i18n-active_record" target="_blank">ActiveRecord, </a>or Gettext.

Backends can also be combined in the Chain backend, which can be useful when the standard translations are used with the Simple backend but custom application translations are stored in a database or other backends.

Next up, I will describe some of the optional backends that come with the gem, but if there is no backend that suits some special need, one could be made from scratch without too much effort.

#### Key-Value backend

The store that the backend receives on initialization responds to three methods:

- store#[ ](key) – Used to get a value
- store#[ ]=(key, value) – Used to set a value
- store#keys – Used to get all keys

Since these stores only support strings, all values are converted to JSON before being stored, allowing it to also store booleans, hashes and arrays. However, this store does not support Procs. Symbols are just supported when loading translations from the filesystem or through explicit store translations.

To initialize the backend, a new file should be created in the /config/initializers directory:

    #i18n_backend.rb
    translations = {}
    I18n.backend = I18n::Backend::KeyValue.new(translations)

An empty store is available now. New translations can be added by calling the store_translations method on the I18n.backend:

    I18n.backend.store_translations(locale, { key => value }, :escape => false)
    
Translations hash can be accessed through the store:

    <pre>translations = I18n.backend.store
    
Key-Value backend is all set now, but since the values are being stored in a Ruby Hash, they will be lost after the web server is restarted. To avoid that, a persistent key-value store should be used, for example <a href="http://redis.io/" target="_blank">Redis</a>.

Installing Redis from repository and starting the server:

    $ apt-get install redis
    $ redis-server
    
The redis gem should be added to the Gemfile ( gem ‘redis’ ) and bundle command run. Now, instead of a blank hash, a new Redis object should be passed to the backend initializer:

    # /config/initializers/i18n_backend.rb
    I18n.backend = I18n::Backend::KeyValue.new(Redis.new)

Detailed instruction on setting the Key-Value backend with Redis can be seen in <a href="http://railscasts.com/episodes/256-i18n-backends" target="_blank">this railcast</a>.

#### ActiveRecord i18n backend

Support for the ActiveRecord i18n backend has been extracted to a gem of its own: <a href="https://github.com/svenfuchs/i18n-active_record" target="_blank">i18n-active_record</a>. To install the gem, this should be put in the Gemfile prior to bundling:

    gem 'i18n-active_record',
        :git => 'git://github.com/svenfuchs/i18n-active_record.git',
        :require => 'i18n/active_record'
        
Next, an active record model named Translation should be created. The purpose of the model is for managing translations and languages. The migration should look like this:

    class CreateTranslations < ActiveRecord::Migration
      def self.up
        create_table :translations do |t|
          t.string :locale
          t.string :key
          t.text   :value
          t.text   :interpolations
          t.boolean :is_proc, :default => false
    
          t.timestamps
        end
      end
    
      def self.down
        drop_table :translations
      end
    end
    
To load the backend, a new file should be added to config/initializers named locale.rb :

    require 'i18n/backend/active_record'
    I18n.backend = I18n::Backend::ActiveRecord.new
    
After the backend is loaded, the translations can be looked up or stored as previously described.

An optional module Missing can be included. It creates empty records in the database for all the missing translations:

    I18n::Backend::Chain.send(:include, I18n::Backend::ActiveRecord::Missing)
    I18n.backend = I18n::Backend::Chain.new(I18n::Backend::ActiveRecord.new, I18n::Backend::Simple.new)
    
Stub records for pluralizations will also be created for each key defined in i18n.plural.keys.

#### A Gettext backend for i18n

I18n library provides an experimental support for using <a title="PHP internationalization with gettext tutorial" href="http://blog/?p=326">Gettext po files</a> for storing translations. To enable the support, I18n::Backend::Gettext module should be included in the Simple backend or other backend that is currently used:

    I18n::Backend::Simple.include(I18n::Backend::Gettext)
    
After the module is included, it is possible to load the po files with the I18n.load_path:

    I18n.load_path += Dir["path/to/locales/*.po"]
    
Following the Gettext convention this implementation expects that the translation files are named by their locales. E.g. the file en.po would contain the translations for the English locale.

The translations can be looked up the same way as for the Simple backend:

    t('some msgid')
    # => 'msgstr for some msgid'


### Chaining backends

Using multiple backends at the same time is also possible. This can be achieved via the Chain backend. On initialization, it can receive any number of other backends as arguments. For example ActiveRecord backend can be used with a fall back to the default Simple backend:

    first = I18n::Backend::ActiveRecord.new
    first.store_translations(:en, :foo => 'foo')
    
    second = I18n.backend
    second.store_translations(:en, :bar => 'bar')
    
    I18n.backend = I18n::Backend::Chain.new(first, second)
    
    I18n.t(:foo)  # => "foo"
    I18n.t(:bar)  # => "bar"
    
The cost of replacing the Simple backend and implementing a built-in support for the translation process in each application can be the loss of simplicity and possibly performance. Additional time is also needed to implement and maintain an interface through which the translation would be conducted. On the other hand a specialized professional service can be used instead. You can let <a href="http://lingohub.com">Lingohub</a> assume this burden, which lets you focus on developing the application, and our platform takes care of the internationalization details.

### Caching is an i18n gem advanced feature

To enable caching, the Cache module should be included in the Simple backend, or whatever other backend is being used:

    I18n::Backend::Simple.send(:include, I18n::Backend::Cache)
    
Also a cache store implementation should be set, for example ActiveSupport::Cache:

    I18n.cache_store = ActiveSupport::Cache.lookup_store(:memory_store)
    
Any cache implementation that provides the same API as ActiveSupport::Cache can be used (only the methods #fetch and #write are being used).

### Fallbacks

I18n locale fallbacks allow use of translations from other locales when translations for the current locale are missing. This can be useful in several cases:

- when the application is thoroughly localized to include even the regional variants of a language; in this case regional locale resource files would contain only the phrases that differ, but would fall back to the common base locale (:en-US, :en-CA… with fallback to :en)
- when it is acceptable to use a temporary fallback for missing translations to some other language that the users are expected to know, in order to provide them with some content until it is localized; the fallback language can be either some mutually intelligible language with the current language, one of the world languages or one of the languages widely spoken in the target community.
- for testing purposes in the development or during the localization process.

Locale fallbacks can be enabled by including the Fallbacks module to the backend that is being used in the application:

    I18n::Backend::Simple.include(I18n::Backend::Fallbacks)
    
This in fact overwrites the Base backend translate method in order to force it to try each locale given by the I18n.fallbacks until it finds a result. Otherwise it will throw the MissingTranslation.

If the :default is passed to the translation lookup method, it takes precedence over the fallback only if it is a Symbol. When the default contains a String, Proc or Hash it is evaluated last after all the fallback locales have been tried.

    Fallbacks = I18n.Fallback 
    Fallbacks.map( :'en-CA' => :'en-US', :'en-US' => :en, :de => :en )
    Fallbacks[:de]
    # => [:en]
    
### Translation Metadata

I18n <a href="https://github.com/svenfuchs/i18n/blob/master/lib/i18n/backend/metadata.rb" target="_blank">translation metadata</a> is useful when accessing information about the way a translation was looked up, pluralized or interpolated.

    msg = I18n.t(:message, :default => 'Hi!', :scope => :foo)
    msg.translation_metadata
    # => { :key => :message, :scope => :foo, :default => 'Hi!' }
    
If **:count** option was passed to #translate it will be set to the metadata. Likewise, if any interpolation variables were passed they will also be set.

Translation metadata can be enabled by simply including the Metadata module into the Simple backend class – or whatever other backend is being used:

    I18n::Backend::Simple.include(I18n::Backend::Metadata)
    
### Cascading lookups

<a href="https://github.com/svenfuchs/i18n/blob/master/lib/i18n/backend/cascade.rb" target="_blank">Cascading lookups</a> can be done in backends that are compatible with the Simple backend.

This means that for any key that can not be found, the Cascade module strips one segment off the scope part of the key and then tries to look up the key in that scope.

For example when a lookup for the key :”foo.bar.baz” does not yield a result then the segment :bar will be stripped off the scope part :”foo.bar” and the new scope :foo will be used to look up the key :baz. If that does not succeed then the remaining scope segment :foo will be omitted, too, and again the key :baz will be looked up (now with no scope).

Cascading lookup can be enabled by passing the :cascade option:

    I18n.t(:'foo.bar.baz', :cascade => true)
    
This will return the first translation found for :”foo.bar.baz”, :”foo.baz” or :baz in this order.

The cascading lookup takes precedence over resolving any given defaults. This means that the defaults will kick in after the cascading lookups haven’t succeeded.

This behaviour is useful for libraries like ActiveRecord validations where the library wants to give users a bunch of more or less fine-grained options of scopes for a particular key.

### Translation symlinks

It is possible to set key of one key-value pair as a value of another pair. This way both pairs would have the same value, but it would be set only at one place.

    en:
      something: some phrase
      something_else: :something
      
    I18n.t :something_else
     # => "some phrase"

Valid use for this would be situation where the key-value pairs that share values are already structured (for example localized libraries or gems). Or if two unrelated pairs, for example one for model and the other for the view, should share the value, perhaps it is better that they both point to a third shared pair, then to use the localization of the model for the localization of the view or vice versa.

### Using custom exception handlers

The I18n API defines the following exceptions that will be raised by backends when the corresponding unexpected conditions occur:

    MissingTranslationData       # no translation was found for the requested key
    InvalidLocale                # the locale set to I18n.locale is invalid (e.g. nil)
    InvalidPluralizationData     # a count option was passed but the translation data is not suitable for pluralization
    MissingInterpolationArgument # the translation expects an interpolation argument that has not been passed
    ReservedInterpolationKey     # the translation contains a reserved interpolation variable name (i.e. one of: scope, default)
    UnknownFileType              # the backend does not know how to handle a file type that was added to I18n.load_path

The i18n API will catch all of these exceptions when they are thrown in the backend and pass them to the default_exception_handler method. This method will re-raise all exceptions except for MissingTranslationData exceptions. When a MissingTranslationData exception has been caught, it will return the exception’s error message string containing the missing key/scope.

The reason for this is that during development it is probably preferred to render the views even though a translation is missing.

In other contexts this behavior can be changed, e.g. the default exception handling does not allow to catch missing translations during automated tests easily. For this purpose a different exception handler can be specified. The specified exception handler must be a method on the I18n module or a class with #call method:

    module I18n
      class JustRaiseExceptionHandler < ExceptionHandler
        def call(exception, locale, key, options)
          if exception.is_a?(MissingTranslation)
            raise exception.to_exception
          else
            super
          end
        end
      end
    end
    
    I18n.exception_handler = I18n::JustRaiseExceptionHandler.new
    
This would re-raise only the MissingTranslationData exception, passing all other input to the default exception handler.

However, if you are using I18n::Backend::Pluralization this handler will also raise I18n::MissingTranslationData: translation missing: en.i18n.plural.rule exception that should normally be ignored to fall back to the default pluralization rule for English locale. To avoid this translation key could be additionally checked:

    if exception.is_a?(MissingTranslation) &amp;&amp; key.to_s != 'i18n.plural.rule'
      raise exception.to_exception
    else
      super
    end
    
Another example where the default behaviour is less desirable is the Rails TranslationHelper which provides the method #t (as well as #translate). When a MissingTranslationData exception occurs in this context, the helper wraps the message into a span with the CSS class translation_missing.

To do so, the helper forces I18n#translate to raise exceptions no matter what exception handler is defined by setting the :raise option:

    I18n.t :foo, raise: true # always re-raises exceptions from the backend
    
These were just some of the** i18n gem advanced** features that seemed most relevant. You can easily find some more if you browse through the <a href="https://github.com/svenfuchs/i18n" target="_blank">source code</a> of the i18n gem. Extending the existing functionality by adding custom features is also not very hard.

Even though i18n is probably the internationalization solution for Ruby that you were looking for, the final two articles on internationalization for Ruby that we have prepared will introduce some alternatives to it and will give you more complete picture. Stay tuned for more, follow us on the social media channels and please feel free to leave some feedback in the comments, I would love to hear your thoughts about the tutorial.

#### Further reading

- Some sections of this article were taken form <a href="http://guides.rubyonrails.org/i18n.html" target="_blank">Ruby on Rails Guides</a> and the <a href="https://github.com/svenfuchs/i18n" target="_blank">documentation for i18n gem</a>
- The original <a href="http://github.com/clemens/i18n-cascading-backend" target="_blank">Cascading backend implementation</a>
- <a href="http://vimeo.com/12665914" target="_blank">Sven Fuchs’ presentation on i18n features</a>
- Internationalization for Ruby wiki on <a href="http://ruby-i18n.org/wiki" target="_blank">ruby-i18n.org</a>
- <a href="http://railscasts.com/episodes/256-i18n-backends" target="_blank">Railscast on i18n backends</a>
