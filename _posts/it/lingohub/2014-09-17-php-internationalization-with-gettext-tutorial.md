---
slug:       "php-internationalization-with-gettext-tutorial"
title:      PHP internationalization with gettext tutorial
excerpt:    Installation, portable object template files, plurals, an example of a PO file, directory structure, machine object files, gettext caching problems, setting up PHP for internationalization with gettext...
date:       2014-09-17
tags:
  - ttt-gettext
  - ttt-i18n&l10n
  - ttt-php
---

<p class='muted'>I originally published this article on <a href="http://blog.lingohub.com/">Lingohub blog</a> in 2013, while working for the company. <a href="http://lingohub.com/">Lingohub</a> specializes in providing app localization for developers and translators.</a></p>

<a href="http://www.gnu.org/software/gettext/" target="_blank">GNU **gettext**</a> is a package that offers to programmers, translators and even users a well integrated set of tools that provide a framework within which other free packages may produce multi-lingual messages. These tools include a set of conventions about how programs should be written to support message catalogs, a directory and file naming organization for the message catalogs themselves, a runtime library supporting the retrieval of translated messages, and a few stand-alone programs to manipulate in various ways the sets of translatable strings, or already translated strings. [<a href="http://www.gnu.org/software/gettext/">1</a>] In this tutorial we want to document how PHP **internationalization with gettext** works. It covers setup, use and best practice.

### Installation

The gettext library needs to be installed on the client (development) as well as server (production) systems. Ubuntu/Debian and Fedora/CentOS/Redhat users can install the library from the repository using apt-get or yum respectively. For other Unix-like systems a copy of gettext can be obtained from <a href="http://www.gnu.org/s/gettext">www.gnu.org/s/gettext</a>. Windows users can get it from <a href="http://gnuwin32.sourceforge.net/packages/gettext.htm">gnuwin32.sourceforge.net/packages/gettext.htm</a>. Some *-nix systems come with gettext pre-installed.

#### Creating a Portable Object Template file

<a href="http://www.gnu.org/savannah-checkouts/gnu/gettext/manual/html_node/xgettext-Invocation.html" target="_blank">xgettext</a> is a command line program that extracts translatable strings from given input files. It parses the code recognizing the gettext functions used in it, and extracts the strings in the variables passed to those functions. Besides PHP, it can be used to extract strings from many other programming languages: C, C++, ObjectiveC, PO, Shell, Python, Lisp, EmacsLisp, librep, Scheme, Smalltalk, Java, JavaProperties, C#, awk, YCP, Tcl, Perl, GCC-source, NXStringTable, RST, Glade [<a href="http://www.gnu.org/savannah-checkouts/gnu/gettext/manual/html_node/xgettext-Invocation.html">2</a>].

To extract all translatable strings from all PHP files in the project directory, change to that directory and execute the xgettext command:

<pre>xgettext --from-code=UTF-8 -o messages.pot *.php</pre>

xggettext has some limitations: It can not detect the encoding of the files it parses, and by default it expects that they are in ASCII. That behavior can be overridden by the use of the –from-code flag. The other limitation is that it extracts all the strings to one domain (file). If strings should be spread to multiple domains, it has to be done manually. Read further down to find out how LingoHub can help you overcome some these limitations.

*-nix users can access the xgettext manual by executing

<pre>man xgettext</pre>

The result of the xgettext is a POT (Portable Object Template) file. It can be used as a basis to create a **PO file** for a new <a title="How locales turn the Internet into a global village" href="http://blog.lingohub.com/industry-updates/2013/02/how-locales-turn-the-internet-into-a-global-village/" target="_blank">locale</a>, or to synchronize with the existing files.

#### Portable Object files

PO files are plain text files that contain the translation. In addition to creating a PO file by xgettext, it can be created and edited by hand in a plain text editor. PO editors can be used as well (for details please check the further reading section), but this tutorial describes the use of plain text editors.

A PO file can start with a <a href="http://www.gnu.org/software/gettext/manual/html_node/Header-Entry.html">header entry</a>. Unlike the other entries, it does not contain any particular translation, but the details about the file itself. Some of the information included in the header contains:

- Language
- Content-Type
- Content-Transfer-Encoding
- Plural-Forms

The rest of the PO file is made up of the entries that hold the relation between an original untranslated string and its corresponding translation. All entries in a given PO file usually pertain to a single project, and all translations are expressed in a single target language. One PO file entry has the following schematic structure:

<pre>     white-space
     #  translator-comments
     #. extracted-comments
     #: reference...
     #, flag...
     #| msgid previous-untranslated-string
     msgctxt context
     msgid untranslated-string
     msgstr translated-string</pre>

Entries begin with optional white space.

The comment lines (optional) start with the character # (hash) . Comments that have white space immediately following the # are the translator **comments**. Automatic comments have a non-white character just after the # , and are created and maintained automatically by GNU gettext tools. Depending on that non-white space character, automatic comments can be:

<pre>
- #. – given by the programmer, directed at the translator; extracted by the xgettext program from the program’s source code
- #: – references to the program’s source code
- #, – flags
- #| – previous untranslated string for which the translator gave a translation
</pre>

The context specifier (optional) is used to disambiguate messages with the same untranslated string.

After white space and comments, entries show two strings starting with these keywords:

- msgid – the untranslated string as it appears in the original program sources
- msgstr – the translation of this string

The two strings are quoted in various ways in the PO file, using ” delimiters and \ escapes, but the translator does not really have to pay attention to the precise quoting format, as PO mode fully takes care of quoting.

A complete list of available flags can be found <a href="http://www.gnu.org/software/gettext/manual/html_node/PO-Files.html">here</a>.

#### Plurals

<pre>     white-space
     #  translator-comments
     #. extracted-comments
     #: reference...
     #, flag...
     #| msgid previous-untranslated-string-singular
     #| msgid_plural previous-untranslated-string-plural
     msgid untranslated-string-singular
     msgid_plural untranslated-string-plural
     msgstr[0] translated-string-case-0
     ...
     msgstr[N] translated-string-case-n</pre>

In some languages message text can depend on a cardinal number. The entry for the plurals contains these extra keywords:

- msgid_plural – the general form of the message
- msgid – singular form (the form when the number is equal to one)
- msgstr[N] – message form when the conditional for the cardinal number supplied returns N

PO file containing the plural forms should have <a href="http://www.gnu.org/software/gettext/manual/html_node/Translating-plural-forms.html">Plural-Forms</a> line in the header entry. This line <a href="http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html">varies depending on a language</a>, and can look like this:

<pre>     "Plural-Forms: nplurals=3; plural=n%10==1 &amp;&amp; n%100!=11 ? "
     0 : n%10&gt;=2 &amp;&amp; n%10&lt;=4 &amp;&amp; (n%100&lt;10 || n%100&gt;=20) ? 1 : 2;\n"</pre>

The Plural-Forms from the previous example are for Serbian, but is also true for most of other Slavic languages. **nsplurals=3 **means that three forms are supported, and the conditional that follows describes when these forms are applied, in the order 0-2, from left to right:

<pre>
- msgstr[0] applies to all cardinal numbers that end in one, except those that end in eleven ( *n%10==1 &amp;&amp; n%100!=11 *)
- msgstr[1] applies to all cardinal numbers that end in 2-4, except those greater then 10 and lesser then 20 ( *n%10&gt;=2 &amp;&amp; n%10&lt;=4 &amp;&amp; (n%100&lt;10 || n%100&gt;=20) *)
- msgstr[2] applies to all other cardinal numbers
</pre>

An example of an entry with the Plural-Forms used in a PO file that translates from English to Serbian:

<pre>     msgid "I wrote a line of code"
     msgid_plural "I wrote %d lines of code"
     msgstr[0] "Napisao sam %d liniju koda"
     msgstr[1] "Napisao sam %d linije koda"
     msgstr[2] "Napisao sam %d linija koda"</pre>

If any of the rules describe a single cardinal number, %d can be omitted, and a word can be used instead. For example, in English there are only two cases, when a number is equal to one, and when it is not: “1 line of code” / “n lines of code”, where n is any cardinal number other then 1. In this case it can be written “one line of code” or “a line of code” instead.

#### A simple example of a PO file

{% gist 5930785 example.po %}

#### Directory structure

Once you have a PO file, you should put it into a proper directory structure. The parent directory that contains all the locale directories can be named arbitrarily. Locale subdirectory names should consist of a two-letter lower-case abbreviation for the language according to the <a href="http://en.wikipedia.org/wiki/ISO_639-1">ISO 639-1</a> specification followed by an underscore and a two-letter upper-case country code according to the <a href="http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 alpha-2</a> specification. Each locale subdirectory should have a subdirectory of its own named LC_MESSAGE.

Example of directory structure:

<pre>MyPHPProject
  Locale
    en_UK
      LC_MESSAGES
    de
      LC_MESSAGES
    fr_CA
      LC_MESSAGES</pre>

#### Machine Object files

The translations are made available to the web server through the Machine Object files. In order to compile the PO files, a gettext library needs to be installed. Ubuntu/Debian and Fedora/CentOS/Redhat users can install the library from the repository using apt-get or yum respectively. For other Unix-like systems a copy of gettext can be obtained from <a href="http://www.gnu.org/s/gettext">www.gnu.org/s/gettext</a>. Windows users can get it from <a href="http://gnuwin32.sourceforge.net/packages/gettext.htm">gnuwin32.sourceforge.net/packages/gettext.htm</a>. Some *-nix systems come with gettext pre-installed.

Once you make sure gettext is present in your system, cd to a directory where you put the PO file (for example Locale/de/LC_MESSAGES) and execute:

<pre>msgfmt example.po -o example.mo</pre>

Repeat this for all files in all locale directories, and you’re all internationalized. You are now ready to use the translations to <a href="http://lingohub.com" target="_blank">localize your website</a>.

#### gettext caching problems

If PHP is run as a module (mod_php), the first time a domain (**MO file**) is being initialized, it is cached by the server. After updating an MO file with a newer version, it is necessary to restart the server in order to cache it. This is often not possible, especially in a shared environment where the developer usually does not have that kind of the access. However, there is a workaround: New domains can be created dynamically on each MO file update, and that way the server will have the proper content cached. [<a href="http://8tut.com/mastering-gettext-for-localizing-your-php-projects/">3</a>] [<a href="http://blog.ghost3k.net/articles/php/11/gettext-caching-in-php">4</a>]

#### Setting up PHP for internationalization with gettext

After the library is installed, php.ini should be edited. The Windows users should add:

<pre>extension=php_gettext.dll</pre>

and Linux/Unix users should add:

<pre id="stcpDiv">extension=gettext.so</pre>

The PHP gettext extension has no configuration directives, resource types or constants defined in php.ini.

This code snippet can be used to check if PHP was set properly for gettext:

<pre>if (!function_exists("gettext")){
    echo "gettext is not installed\n";
}
else{
    echo "gettext is supported\n";
}</pre>

#### An example of PHP file that uses example.mo

{% gist 5930896 I18n_test.php %}

- This example expects that locale switching is being done through a GET request and that a locale is being stored in the session; for new sessions a default locale is provided
- The **$locale** identifier should correspond and be constructed using the same rules as the locale subdirectory, as was explained earlier.
- <a href="http://www.php.net/manual/en/function.putenv.php">putenv()</a> sets the LANG environment variable and instructs gettext which locale it will be using for this session.
- <a href="http://www.php.net/manual/en/function.setlocale.php">setlocale()</a> specifies the locale used in the application and affects how PHP sorts strings, understands date and time formatting, and formats numeric values.
- **domain** refers to the catalog file used to store the translation.
- <a href="http://www.php.net/manual/en/function.bindtextdomain.php">bindtextdomain()</a> function tells gettext where to find the domain to use; the first parameter is the catalog name without the .mo extension, and the second parameter is the path to the parent directory in which the de/LC_MESSAGES sub-path resides
- <a href="http://www.php.net/manual/en/function.bind-textdomain-codeset.php">bind_textdomain_codeset()</a> sets in which encoding will the messages from domain be returned by gettext() and similar functions. All the domains that are called from the code have to be previously binded
- <a href="http://www.php.net/manual/en/function.textdomain.php">textdomain()</a> sets the domain to search within when calls are made to gettext()
- _() is an alias of <a href="http://www.php.net/manual/en/function.gettext.php">gettext()</a>; it looks up and returns the translation
- <a href="http://www.php.net/manual/en/function.sprintf.php">sprintf()</a> can be used to replace any placeholders that might occur in the string
- <a href="http://www.php.net/manual/en/function.dgettext.php"> dgettext()</a> overrides the current domain for a single message lookup. This can be useful for large projects when it is convenient to split the strings in multiple domains (files), for example “emails”, “countries”, “languages”…
- <a href="http://www.php.net/manual/en/function.ngettext.php">ngettext()</a> is used when the plural form of the message is dependent on the count

#### What form of msgids should be used?

As previously mentioned, **msgid** is used by gettext to identify the msgstr that should be displayed in its place. If multiple equal msgids are present, msgctxt is used to tell them apart. There are several more important roles that msgid plays:

- msgid is what the programmer sees in the code
- msgid is what is being displayed by default if the proper msgstr in the current locale can not be found (as a fall back)
- in traditional gettext usage, the translator translates from msgid to the target locale, instead of from source msgstr to target msgstr; so, msgid is what he sees and what gives him information what should be translated

Therefore it is important to chose the form of the msgid carefully. The value of the msgid can be any string. The <a href="http://www.gnu.org/software/gettext/manual/gettext.html">gettext manual</a> suggests that the original string in the source (or English) language should be used. That might pose certain problems, for example if msgstr of the original string is changed and if the programmer decides to synchronize the msgid with a new msgstr, he would have to do it in all places in the code where it is used as well as in all other PO files. Also, there is no limit to msgid or msgstr length. Some lengthy msgids would make the code less readable.

Some developers propose that the msgids should be constructed in a more structured way [<a href="http://stackoverflow.com/questions/2790952/php-localization-best-practices-gettext">5</a>] [<a href="http://stackoverflow.com/questions/216478/gettext-is-it-a-good-idea-for-the-message-id-to-be-the-english-text?lq=1">6</a>], where msgid describes its role in the application or role in the code (in which view, partial, container are they located) instead of its content. It is a great way to organize the strings from the developer’s perspective, but it might pose problems to the translator, since the translator no longer has the a source string in the msgid to translate from.

Others propose that at the start of the project a master locale is chosen, and instead of creating PO files for that locale in the project’s directory structure, the master locale is added solely through the ids [<a href="http://phpmaster.com/localizing-php-applications-3/">7</a>]. This provides a simple fall back mechanism to a master locale for all still untranslated strings in other locales. Since no actual resource files exist for the master locale, it always “falls back” to the string provided in the msgid. The developer still has to take care of the PO files’ msgid synchronisation whenever he decides to change any master locale string.

This is a very convenient approach for smaller projects where the developer does all or most of the translating (especially in the master locale). If other people should be given access to the master locale strings (reviewers, marketing people, etc), they would have to do it through the code.

#### Internationalization with gettext of PHP projects using LingoHub

gettext really helps internationalize PHP projects, but it has its limitations and creates some inconveniences for both developers and translators. This is where LingoHub comes in and takes those inconveniences away. After all, translators should not have to handle files, for one.

LingoHub is really flexible and it can adjust to your needs and habits. Here are some possible real world scenarios for **internationalization with gettext**:

#### 1. a single domain, master locale strings in msgid

This one is really simple. All you have to do as a developer is to keep on adding new strings to the code as you need them. When you are done, or whenever you want to make the new strings available to the translators, you just extract them to a pot file using xgettext, and upload the file to LingoHub as a master locale. Even though the pot file contains only the msgids of all strings, when merging with the existent  translations in the project, LingoHub will only add the new ones without harming the existing translations. If you use a master locale resource file, you can instruct you master locale expert (translator/reviewer) to populate the master locale strings by using msgids as the basis. The translators for other locales will have both the master locale string and the msgid available to them as a source of the translation.

Additionally you can add comments aimed at translators directly in the code, including LingoChecks, extract them along with everything else with xgettext and LingoHub will import them.

You still need to be careful when changing the existing msgids, and be aware that all existing translated strings are being identified by that msgid.

#### 2. multiple domains

If you use multiple domains, the easiest approach is to manually add new entries to a master locale template (the file that has only empty msgstrs) for appropriate domains, and then upload and synchronize as explained in case 1. LingoHub can take care of multiple resource files (domains) without problems, and when the translation is done, you can download them separately.

#### 3. structured msgids

If you decided to use structured msgids for your project instead of populating them with the untranslated strings, the easiest approach is to manually add new entries to appropriate po files and populate both the msgid and the initial (master locale) msgstr. You can then upload the file to your LingoHub project, and the translators can takeover the translation.

Thanks to LingoHub, the translators that translate the content of the gettext files do not need to know anything about gettext or even be aware that it is the technology being used under the hood. They also do not need to install and setup any special application or **PO editor** – they can start translating right away, using any web browser from any available computer. In addition to that, translators have all other conveniences that the LingoHub platform provides. They just need to focus on translating. Similarly, you have immediate file output in the right format once the translations are done. No manual merging back necessary. I hope this tutorial was helpful, and I am going to turn to a few other aspects in future texts. Please leave your comments below.

#### References:

- <a href="http://www.gnu.org/software/gettext/manual/gettext.html">GNU gettext utilities manual</a>
- <a href="http://phpmaster.com/localizing-php-applications-3/">Localizing PHP Applications “The Right Way”, Part 3</a>
- <a href="http://8tut.com/mastering-gettext-for-localizing-your-php-projects/">Mastering gettext for localizing your php projects </a>
- <a href="http://blog.ghost3k.net/articles/php/11/gettext-caching-in-php">Workaround for gettext caching issue in PHP</a>
- <a href="http://stackoverflow.com/questions/2790952/php-localization-best-practices-gettext">stackoverflow discussion on the msgid naming conventions</a>
- <a href="http://stackoverflow.com/questions/216478/gettext-is-it-a-good-idea-for-the-message-id-to-be-the-english-text?lq=1">another stackoverflow discussion on the msgid naming conventions</a>
- <a href="http://www.gnu.org/savannah-checkouts/gnu/gettext/manual/html_node/xgettext-Invocation.html">xgettext page of the gettext manual</a>

#### Further reading:

- <a href="http://phpmaster.com/localizing-php-applications-1/">Localizing PHP Applications “The Right Way”</a>
- <a href="http://mel.melaxis.com/devblog/2005/08/06/localizing-php-web-sites-using-gettext/">Localizing PHP web sites using gettext</a>