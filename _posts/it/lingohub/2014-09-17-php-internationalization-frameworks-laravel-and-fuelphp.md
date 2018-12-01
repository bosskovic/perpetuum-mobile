---
layout:     tech_post
categories: ['tech']
slug:       "php-internationalization-frameworks-laravel-and-fuelphp"
title:      'PHP internationalization frameworks: Laravel and FuelPHP'
excerpt:    The article covers two more PHP frameworks that are frequently used, Laravel and FuelPHP
date:       2014-09-17
tags:
  - ttt-back-end
  - ttt-fuelphp
  - ttt-i18n&l10n
  - ttt-laravel
  - ttt-php
animation:
  url: /assets/img/tech.gif
  width: 250
  height: 176  
---

<p class='muted'>I originally published this article on <a href="http://blog.lingohub.com/">Lingohub blog</a> in 2013, while working for the company. <a href="http://lingohub.com/">Lingohub</a> specializes in providing app localization for developers and translators.</a></p>

This is our concluding article on PHP internationalization frameworks and ***i18n*** prep tutorials. Our previous 
articles have covered the following aspects:

- <a title="PHP internationalization – i18n mechanisms tutorial" href="/tech/php-internationalization-i18n-mechanisms-tutorial/">Mechanisms of internationalization with PHP in general</a>, with a brief overlook on the history of i18n with PHP
- <a title="PHP internationalization with gettext tutorial" href="/tech/php-internationalization-with-gettext-tutorial/">PHP internationalization with GNU gettext</a>
- <a title="Internationalization How To for the 5 most popular PHP frameworks" href="/tech/internationalization-how-to-for-the-5-most-popular-php-frameworks/">Internationalization How To for five most used PHP frameworks</a>(CodeIgniter, CakePHP, Zend, Yii and Symfony)

The last article in this series on PHP internalization will cover two more PHP frameworks that are frequently used: **Laravel** and **FuelPHP**. Thanks also to previous commenters that have expressed interest in covering Laravel in more detail.

### PHP internationalization frameworks: The Laravel framework

Internationalization in the Laravel framework can be done by the use of the PHP array files, stored within **app/lang** directory. Language files for each language should be stored in their own subdirectory:

<pre>/app
  /lang
    /en
      days.php
      months.php
    /de
      days.php
      months.php
    /fr
      days.php
      months.php</pre>

The language files should return an array of keyed strings:

{% gist 6113848 days.php %}

The keys should be chosen carefully, because if the language line for the active language does not exist, the key will be returned. Laravel does not allow specifying a fall-back language.

The default language can be set in the **app/config/app.php**, and the active language can be changed using the **App::setLocale** method like this:

<pre>App::setLocale('de');</pre>

The lines can be retrieved from the language files with the **get** method of the Lang class. The argument passed to the **get** method consists of two segments, first one being the name of the language file, and the second one the key of the line that should be retrieved.

<pre>echo Lang::get('days.monday');</pre>

The presence of the translation for the specific key and active language can be checked with the **has** method:

<pre>if (Lang::has('days.monday')){
  //
}</pre>

Place-holders can be defined in the language files, and substituted with the dynamic values during the run time:

<pre>//messages.php
&lt;?php
  return array(
    'welcome' =&gt; 'Welcome, :username'
  );
?&gt;</pre>

The substitute values are passed to the get method in an array as a second argument:

<pre>echo Lang::get('messages.welcome', array('username' =&gt; $username));</pre>

A singular form can be separated from a plural form in the translations by the use of the “pipe” character:

<pre>&lt;?php
  return array(
    'apples' =&gt; 'There is one apple|There are many apples'
  );
?&gt;</pre>

The **Lang::choice** method can be used to retrieve the line:

<pre>echo Lang::choice('messages.apples', 10);</pre>

Laravel translator is powered by the <a title="Internationalization How To for the 5 most popular PHP frameworks" href="http://blog/?p=329">Symfony</a> Translation component, so more explicit pluralization rules can easily be created:

<pre>&lt;?php
  return array(
    'apples' =&gt; '{0} There are none|[1,19] There are some|[20,Inf] There are many'
  );
?&gt;</pre>

**Further reading:**

- <a href="http://laravel.com/docs/localization" target="_blank">Official Laravel docs – Localization</a>
- <a href="http://phpjungle.org/" target="_blank">phpjungle</a>

### PHP internationalization frameworks: The FuelPHP framework

The **Lang** class of FuelPHP framework allows setting up language variables using language files. The default language (en) is set in app/config/config.php. The Config:set method can be used to change that value:

<pre>Config::set('language', 'de');</pre>

FuelPHP also allows defining of fall-back language in  the configuration, which is either a language code or an array of language codes.

An example of app/config/config.php :

{% gist 6116266 config.php %}

Several resource file formats are supported by FuelPHP:

**PHP array files** are the default type. They have similar key-value structure as previously described for Laravel framework.

**INI files**. I have already covered this resource file type in an <a title="i18n Resource File Formats: ini files" href="http://blog.lingohub.com/developers/2013/03/i18n-resource-file-formats-ini-files/">article of its own</a>.

**YAML files**. We have covered these as well, you can find the article <a title="i18n Resource File Formats: YAML files" href="http://blog.lingohub.com/developers/2013/04/i18n-resource-file-formats-yaml-files/">here</a>.

**JSON files**. You can read about resjson files, json resource files used in the Windows applications developed for Windows 8 in <a title="i18n Resource File Formats: RESJSON files" href="http://blog.lingohub.com/developers/2013/04/i18n-resource-file-formats-resjson-files/">this article</a>.

The language resource files are loaded with the <a href="http://fuelphp.com/dev-docs/classes/lang.html#/method_load" target="_blank">load method</a> of the Lang class. If the resource file type is not specified, <a href="http://fuelphp.com/dev-docs/classes/lang.html#/method_load" target="_blank">Lang::load</a> will default to “php array” type.

Specific lines are retrieved from the language file with the <a href="http://fuelphp.com/dev-docs/classes/lang.html#/method_get" target="_blank">Lang::get</a> method. The one required parameter of the get method is the key of the phrase that should be returned. Optional parameters are: **$parameters** – an array of parameters used to replace the place-holders, **$default** – value to return if the key can not be found and **$language** – language code for which the line should be retrieved; if not given, the current active language is used.

For other methods of the Lang class, you can check the official FuelPHP <a href="http://fuelphp.com/dev-docs/classes/lang.html" target="_blank">documentation</a>.

Example:

{% gist 6116466 fuelPHP_example.php %}

**Further reading:**

- <a href="http://www.fuelphp.com/docs/" target="_blank">FuelPHP docs</a>
- <a href="http://web-technos.blogspot.com/2013/04/internationalization-with-fuelphp.html" target="_blank">Internationalization with FuelPHP</a> (version 1.5.1) on the web-technos.blogspot.com

This concludes our series of articles on the PHP i18n. It should give you an idea how website internationalization is implemented across the PHP world, and help you make the necessary steps so that your websites can be more accessible to wider audience. Once that is clear, get ready for localization. Talk to us if we can help you prepare to roll out your applications in many languages.