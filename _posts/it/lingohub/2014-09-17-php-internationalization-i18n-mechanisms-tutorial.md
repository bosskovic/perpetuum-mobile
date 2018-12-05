---
layout:     tech_post
categories: ['tech']
slug:       "php-internationalization-i18n-mechanisms-tutorial"
title:      PHP internationalization – i18n mechanisms tutorial
excerpt:    Static web and internationalization, dynamic web applications, localizing strings directly in the code, storing the strings in a relational database, message catalogues (string arrays), JSON, use of resource files
date:       2014-09-17
layout:     tech_post
categories: ['tech']
tags:
  - ttt-back-end
  - ttt-i18n&l10n
  - ttt-php
animation:
  url: /assets/img/animated/tech.gif
  width: 250
  height: 176  
---

<p class='muted'>I originally published this article on <a href="http://blog.lingohub.com/">Lingohub blog</a> in 2013, while working for the company. <a href="http://lingohub.com/">Lingohub</a> specializes in providing app localization for developers and translators.</a></p>

According to W3Tech statistics, <a href="https://en.wikipedia.org/wiki/PHP" target="_blank">PHP</a> is used by 80.5% of all websites [<a title="Usage Statistics and Market Share of Server-side Programming Languages for Websites - W3Techs" href="http://w3techs.com/technologies/overview/programming_language/all">1</a>] and this share is continuously rising [<a title="Historical yearly trends in the usage of server-side programming languages for websites - W3Techs" href="http://w3techs.com/technologies/history_overview/programming_language/ms/y">2</a>]. We can safely say that the web “speaks” PHP. But what about the content? Since PHP has been around for such a long time (18 years), its history also tells the story of the evolution of website internationalization. The first article in our series about internationalization programming focuses on **PHP internationalization** and its different dimensions and options PHP makes possible.

<img src="/assets/img/tech/use_of_server-side_programming_languages_for_websites.png" alt="use_of_server-side_programming_languages_for_websites" width="442" height="235" />

#### PHP internationalization (early days): Static web and internationalization  

{% gist 5886171 multilingual_static_website_directory_structure %}

Back in the days of static websites, the developer would copy the whole site structure as many times as the number of <a title="The definition of Locale in Wikipedia" href="http://en.wikipedia.org/wiki/Locale" target="_blank">locales</a> that the site supported. The translators would then go deep into the structure to make the changes directly in the pages. This was tedious and error prone. The translator would either need to know the basics of HTML and what should/should not be translated within the HTML file, or the developer would have to pull all the text strings, send them to the translator and then re-insert them back in the proper place. It was not a very friendly or quick process for either developer or translator.

#### PHP internationalization (today): Dynamic web applications

Then came PHP and the dynamic web. In a dynamic website the content is stored in a database or a file system, and is being inserted into templates on each user request. The *separation of content, structure and design* became a new mantra of web development. When internationalizing the website, two steps need to be taken:

- the developer provides a mechanism and method for content to be accessible for the eventual translation of the program and its interface (internationalization)
- the translator adapts the content to specific language and culture doing the actual localization.

There are various internationalization mechanisms at a developer’s disposal and they differ greatly in their complexity, implementation time, flexibility, efficiency and ease of use for the translator.

Some of these mechanisms can roughly be divided in these groups:

- localizing strings directly in the code
- storing the strings in a relational database
- storing the strings in string arrays
- storing the strings in <a href="http://en.wikipedia.org/wiki/JSON" target="_blank">*JSON*</a>
- use of language resource files
  

#### Localizing strings directly in the code

Localization of the text strings can be dealt with directly in the code. The developer writes conditionals that assign values to variables depending on the current language. The translator performs the translation by browsing the code and editing the string values. This produces “messy” code and is not very convenient for translators. Any later changes are hard to make and to track.

Strings can also be pulled from the code/templates. The current language is determined by the program, and a localized string is served.

#### Storing the strings in a relational database

<img src="/assets/img/tech/storing_strings_in_db-localized_columns.png" alt="storing_strings_in_db-localized_columns" width="358" height="267" />

Another approach to *PHP internationalization* is to store the static strings in a **database**. The most simple implementation is to add as many versions of every string or text column as there are supported languages. The specific translations can be retrieved with a single query, so there is no loss of performance. When support for an extra locale needs to be added, the code that pulls the translated string does not have to change much if the naming of the columns is consistent, but every single table containing the translatable content does (new columns need to be added).

<img src="/assets/img/tech/storing_strings_in_db-localized_tables.png" alt="Storing strings in localized tables" width="890" height="302" />

Instead of adding extra columns per locale, extra tables can be added. In this case much of the code can be reused, no existing table is altered and new table versions are added for all tables that contain translatable content, in order to translate it to a new locale. When accessing the translated content via <a href="http://en.wikipedia.org/wiki/SQL" target="_blank">SQL</a>, joining the table and its localized version is required.

<img src="/assets/img/tech/storing_strings_in_db-localized_rows.png" alt="Storing strings in localized rows" width="421" height="325" />

The model can be designed in such a way that no altering of the database structure is needed when a new locale is being added. All translatable content is extracted from the tables to dependent tables that store translated versions in any number of locales. Adding a new locale is as simple as adding a new row to the locales table. The SQL to access the translated strings is not more complicated then in the previous case – a single left join.

All of these implementations have common downsides. The most serious one is a need for developer to implement and maintain an admin interface through which the translator would access and perform translations. Also, a translator would be limited to translating through the given interface unless the developer provided I/O scripts that export to files that the translator could open in a text editor. The translator would have to be careful with the encodings and the format of the file, otherwise there are problems when importing them back into the database.

#### Storing the strings in message catalogues (string arrays)

{% gist 5900015 localizing_strings_with_string_array.php %}

<a href="http://en.wikipedia.org/wiki/Associative_array">Associative arrays</a> can be used to add **i18n** support to a website. If the number of translations rises, the arrays can be divided to one array per file, one file per locale. Still these arrays could get quite large, and the developer has to manually maintain them and synchronize them. However, this is probably the simplest solution for a developer, yet it is not as convenient for translators. Translators still have to be very careful while editing not to mess the array and they have to know how to deal with the encoding. It puts a high technical burden on them.

#### Storing the strings in JSON

{% gist 5900086 de.txt %}
{% gist 5900148 json_localization.php %}

When using this mechanism, a language file is loaded based on the configured language. A static array **$translations** is used to ensure that the language file is loaded once and every other subsequent call is handled through the **$translations** array in the memory rather than reloading the language file anew. The language file is constructed in <a href="http://www.json.org/">JSON</a> format and when the language file is loaded into the **$translations** array the PHP <a href="http://php.net/manual/en/function.json-decode.php">json_decode</a> function is used to convert from JSON into PHP associative array format. When a call is made to the function, a language phrase is passed to the function and the matching value is found in the **$translations** array by using the language phrase as a key for the associative array. The .txt files need to be utf-8 encoded (without <a href="http://en.wikipedia.org/wiki/Byte_order_mark">BOM</a>), otherwise the JSON PHP functions will not operate correctly [<a title="A simple approach to Localization in PHP - Mind IT | Mind IT" href="http://www.mind-it.info/2010/02/22/a-simple-approach-to-localization-in-php/">3</a>].

#### PHP internationalization (contemporary): Use of resource files

The current prevailing practice is for applications to place text in resource strings which are loaded during program execution as needed. The resource file format most commonly used in PHP projects is <a href="http://en.wikipedia.org/wiki/Gettext" target="_blank">Gettext</a>, and it will be visited in detail in the next article.

#### How LingoHub enhances the translation process

All of the listed mechanisms and methods for PHP internationalization have some common shortcomings, and <a href="http://lingohub.com">LingoHub</a> deals with all of them successfully. If resource files are used as the main *i18n* method, and if resource files are uploaded as a part of the LingoHub project, it is possible:

- for developers to automate synchronization
- for translators to focus on translating, without keeping their mind on the technical methods used for internationalization
- for translators to see the context of the translations (such as meta information, comments, screenshots)
- for developers to add rules and guidances on how particular translations should be conducted (e.g. by defining LingoChecks, setting specific regional variety of a language, setting formal/informal)
- for translators, reviewers and developers to communicate and resolve any doubts on any of the translations using the LingoHub platform, reducing Email traffic
- for project owners to keep track of the translation status of each individual translation and the project in general
- for translators to easily and quickly find new or untranslated phrases using filters, advanced search or notifications
- for multiple people (translators or reviewers) to work on the same project simultaneously without any worry that they will undo each others changes (e.g. via roles and permissions)

As a result, the *PHP internationalization* process is less of a hassle, automated to a much greater degree, better quality control is available and it is many, many times faster than it used to be. Ask us if you have questions on how you can best internationalize your project, and check out LingoHub to localize your product. Zero overhead, comfortable integrations and scalability as you’d expect it from a cloud service.

Read more about the PHP internationalization programming in the next article.

**References**:

- <a title="Usage Statistics and Market Share of Server-side Programming Languages for Websites - W3Techs" href="http://w3techs.com/technologies/overview/programming_language/all">Usage Statistics and Market Share of Server-side Programming Languages for Websites – W3Techs</a>
- <a title="Historical yearly trends in the usage of server-side programming languages for websites - W3Techs" href="http://w3techs.com/technologies/history_overview/programming_language/ms/y">Historical yearly trends in the usage of server-side programming languages for websites – W3Techs</a>
- <a title="A simple approach to Localization in PHP - Mind IT | Mind IT" href="http://www.mind-it.info/2010/02/22/a-simple-approach-to-localization-in-php/" target="_blank">A simple approach to Localization in PHP – Mind IT | Mind IT</a>