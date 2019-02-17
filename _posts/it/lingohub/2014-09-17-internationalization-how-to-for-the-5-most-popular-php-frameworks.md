---
slug:       "internationalization-how-to-for-the-5-most-popular-php-frameworks"
title:      Internationalization How To for the 5 most popular PHP frameworks
excerpt:    In this how-To you will read about using CodeIgniter, CakePHP, Zend, Yii and Symfony
date:       2014-09-17
tags:
  - ttt-cakephp
  - ttt-codeigniter
  - ttt-i18n&l10n
  - ttt-php
  - ttt-symfony
  - ttt-yii
  - ttt-zend
---

<p class='muted'>I originally published this article on <a href="http://blog.lingohub.com/">Lingohub blog</a> in 2013, while working for the company. <a href="http://lingohub.com/">Lingohub</a> specializes in providing app localization for developers and translators.</a></p>

As discussed in the<a title="PHP internationalization – i18n mechanisms tutorial" href="/tech/php-internationalization-i18n-mechanisms-tutorial/"> 
previous articles on PHP internationalization</a>, PHP provides native support for string translation 
using <a title="PHP internationalization with gettext tutorial" href="/tech/php-internationalization-with-gettext-tutorial/">**gettext**</a> 
and PHP arrays. These can be used in any PHP project. Additionally, some popular PHP frameworks offer their own way of string translation.

In this article, I want to provide a brief summary of the internationalization process with five of the <a href="http://webcoderpro.com/blog/top-5-most-popular-php-frameworks-of-2012/">most popular</a> PHP frameworks currently out there. In this How-To you will read about using CodeIgniter, CakePHP, Zend, Yii and Symfony. If you would like us to focus on any of these (or some other PHP framework of your choice) in a future article of its own, please leave a comment.

### CodeIgniter framework

CodeIgniter <a href="http://ellislab.com/codeigniter/user-guide/libraries/language.html">Language Class</a> provides functions to retrieve language files and lines of text for purpose of internationalization. The language files are located within the language directory. CodeIgniter automatically looks for the language directory in two locations, first within the “languages” subdirectory of the application, and then, if not found, within the “languages” subdirectory of the CodeIgniter system directory. Each language is stored in its own subdirectory. For example, English language files can be stored either in

<pre> system/language/english</pre>
or
<pre> application/language/english</pre>

Language resource file names must end with _lang.php. Within the file, a line of text is assigned to a $lang array in each line this way:

<pre>$lang['language_key'] = "The actual message to be shown";</pre>

Recommended practice is to prefix all the keys with the name of the file in which they are located, in order to avoid collision with similar keys in different files. For example, the error message that informs the user about the missing email address that is located in the error_lang.php could have this key: “error_missing_email”.

Before fetching lines from any file, it has to be loaded first:

<pre>$this-&gt;lang-&gt;load('filename', 'language');</pre>

*Filename* is the name of the file without the extension. So for the previous example with error_lang.php, the filename to supply to the load function would simply be “error”. The *language* specifies the set that contains the file. If the second parameter is missing, the default language set in the application/config/config.php is used instead.

After the language file is loaded, a line of text can be fetched and echoed like this:

<pre>echo $this-&gt;lang-&gt;line('language_key');</pre>

Language files that are used globally can be auto-loaded by CodeIgniter. <a href="http://ellislab.com/codeigniter/user-guide/general/autoloader.html">Auto loading</a> can be set up in the autoload array in application/config/autoload.php.

**Further reading:**

- <a href="http://ellislab.com/codeigniter/user-guide/libraries/language.html">CodeIgniter User Guide – Language Class</a>
- <a href="https://github.com/EllisLab/CodeIgniter/wiki/CodeIgniter-2.1-internationalization-i18n">CodeIgniter 2.1 internationalization i18n</a>

### CakePHP framework

CakePHP uses its own implementation of Gettext. In the previous blog article I described <a title="PHP internationalization with gettext tutorial" href="/tech/php-internationalization-with-gettext-tutorial/">how gettext (po) files can be created</a>. Functions used in CakePHP for application internationalization are as follows:

- <a href="http://book.cakephp.org/2.0/en/core-libraries/global-constants-and-functions.html#__">__(*string $string_id*[, *$formatArgs*])</a> - returns the string from the current domain of the loaded language for the supplied ID. Strings used for translations are treated as format strings for sprintf(), and additional arguments can be supplied to replace any placeholders in the string.
- <a href="http://book.cakephp.org/2.0/en/core-libraries/global-constants-and-functions.html#__d">__d(*string $domain*, *string $msg*, *mixed $args = null*)</a> - it allows overriding the current domain for a single message lookup
- <a href="http://book.cakephp.org/2.0/en/core-libraries/global-constants-and-functions.html#__n">__n(*string $singular*, *string $plural*, *integer $count*, *mixed $args = null*)</a> - returns the correct plural form of a message identified by $singular and $plural for count $count
- <a href="http://book.cakephp.org/2.0/en/core-libraries/global-constants-and-functions.html#__dn">__dn(*string $domain*, *string $singular*, *string $plural*, *integer $count*, *mixed $args = null*)</a> - overrides the current domain for a single plural message lookup. Returns correct plural form of message identified by $singular and $plural for count $count from domain $domain

A complete list of global functions including those used for localization can be found in the <a href="http://book.cakephp.org/2.0/en/core-libraries/global-constants-and-functions.html">CakePHP documentation</a>.

**Further reading:**

- <a title="PHP internationalization with gettext tutorial" href="http://blog/?p=326">Previous blog article on PHP internationalization using gettext</a>
- <a href="http://book.cakephp.org/2.0/en/core-libraries/internationalization-and-localization.html">Internationalization &amp; Localization with CakePHP</a>

### ZEND framework

The Zend framework offers its own complete solution for localization and internationalization. It includes support for both **gettext** as well as some other resource file formats.

<a href="http://framework.zend.com/manual/1.12/en/zend.translate.adapter.html">Available adapters for Zend_translate</a> (a library used within the framework to handle translation) are:

- Array (use <acronym>PHP</acronym> arrays)
- Csv (use comma separated (*.csv/*.txt) files)
- Gettext (use binary gettext (*.mo) files)
- Ini (use simple <acronym>INI</acronym> (*.ini) files)
- Tbx (use termbase exchange (*.tbx/*.xml) files)
- Tmx (use tmx (*.tmx/*.xml) files)
- Qt (use qt linguist (*.ts) files)
- Xliff (use xliff (*.xliff/*.xml) files)
- XmlTm (use xmltm (*.xml) files)

**Further reading:**

- <a href="http://framework.zend.com/manual/1.12/en/zend.translate.html">Zend_Translate – an official manual</a>
- <a href="http://framework.zend.com/manual/1.12/en/zend.locale.html">Zend_Locale – an official manual</a>

### Symfony framework

In Symfony, translation of text is done through the <a href="http://api.symfony.com/2.3/Symfony/Component/Translation/Translator.html">translator service</a>. To translate a message, the <a href="http://api.symfony.com/2.3/Symfony/Component/Translation/Translator.html#trans%28%29">trans()</a> method is used, following this process:

- the locale is determined (from the request or a session variable)
- a catalog of translated messages is loaded from the translation resource files defined for that locale
- the requested translation is returned

The Symfony framework provides support for these loaders by default:

- xliff: XLIFF file
- php: PHP file
- yml: YAML file

Howerver, custom loaders can be created by implementing the <a href="http://api.symfony.com/2.3/Symfony/Component/Translation/Loader/LoaderInterface.html">LoadInterface</a> interface.

**Further reading:**

- <a href="http://symfony.com/doc/current/book/translation.html">The Symphony Book – Translations</a>

### Yii Framework

With the Yii framework, message translation is done by calling <a href="http://www.yiiframework.com/doc/api/1.1/YiiBase#t-detail">Yii::t()</a> method. When translating a message, its category has to be specified since a message may be translated differently under different categories (contexts). For example, the category *yii* is reserved for messages used by the Yii framework core code.

Parameter placeholders within the messages are replaced with the actual parameter values when calling Yii::t(). For example, the following message translation request would replace the {alias} placeholder in the original message with the actual alias value.

<pre>Yii::t('app', 'Path alias "{alias}" is redefined.', array('{alias}'=&gt;$alias))</pre>

Translated messages are stored in a repositories called message sources. A message source is represented as an instance of <a href="http://www.yiiframework.com/doc/api/1.1/CMessageSource">CMessageSource</a> or its child class. When Yii::t() is invoked, it will look for the message in the message source and returns its translated version if it is found.

Yii comes with the following types of message sources:

- <a href="http://www.yiiframework.com/doc/api/1.1/CPhpMessageSource">CPhpMessageSource</a>: the message translations are stored as key-value pairs in a PHP array. The original message is the key and the translated message is the value. Each array represents the translations for a particular category of messages and is stored in a separate PHP script file whose name is the category name. The PHP translation files for the same language are stored under the same directory named as the locale ID. All these directories are located under the directory specified by basePath.
- <a href="http://www.yiiframework.com/doc/api/1.1/CGettextMessageSource">CGettextMessageSource</a>: the message translations are stored as GNU Gettext files. For more information on gettext, <a title="PHP internationalization with gettext tutorial" href="http://blog/?p=326">you can check my previous blog post</a>.
- <a href="http://www.yiiframework.com/doc/api/1.1/CDbMessageSource">CDbMessageSource</a>: the message translations are stored in database tables.

Custom message sources can be created as well by extending <a href="http://www.yiiframework.com/doc/api/1.1/CMessageSource">CMessageSource</a>.

**Further reading:**

- <a href="http://www.yiiframework.com/doc/guide/1.1/en/topics.i18n">yii framework documentation – Internationalization</a>

These quite popular PHP frameworks are not the only approaches to **internationalization**, let me know which ones you use and what your experiences are with them. We’ve outlined some approaches to getting your applications on the road towards **localization** before, and we’ll focus on some other programming languages and formats in future tutorials, too. Most of these are either based on customer experiences or our lessons learned from developing <a href="http://lingohub.com">Lingohub</a>. We’re looking forward to your comments.
