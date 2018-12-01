---
layout:     tech_post
categories: ['tech']
slug:       "resource-file-formats"
title:      Resource file formats
excerpt:    ini files, properties files, iOS .strings files, YAML files, RESX and RESW files, RESJSON files
date:       2014-09-17
tags:
  - ttt-back-end
  - ttt-i18n&l10n
animation:
  url: /assets/img/tech.gif
  width: 250
  height: 176  
---

<p class="muted">This article is compiled from information in several past articles I published on the Lingohub blog 
while working for the company. <a href="http://lingohub.com/">Lingohub</a> specializes in providing app localization 
for developers and translators.</p>


### i18n Resource File Formats: ini files

**.ini** files are commonly used in applications on various platforms. There is no standard for ini files, and the applications can vary in their use of key-value delimiters, comment masks, comment positions, sections nesting, support for blank lines…

**References**:

- <a href="http://en.wikipedia.org/wiki/INI_file">INI file on en.wikipedia.org<</a>
- <a href="http://www.cloanto.com/specs/ini/">INI specs on www.cloanto.com</a>

***

### i18n Resource File Formats: properties files

**.properties** files are commonly used in the *Java* world (and related platforms, for example they are used for the upcoming FirefoxOS apps). There is no real standard, and various dialects exist. Let’s look at, for example, how properties files comments are handled.

**References**:

- <a href="http://docs.oracle.com/javase/6/docs/api/java/util/Properties.html">Properties documentation on docs.oracle.com</a>

***

### i18n Resource File Formats: iOS .strings files

**.strings** files are used in the Apple world (e.g. iPhone, iPad, …).

**References**:

- <a href="https://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/Strings/Articles/formatSpecifiers.html">developer.apple.com/library/mac/#documentation/Cocoa/…/formatSpecifiers.html</a>
- <a href="https://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/LoadingResources/Strings/Strings.html">developer.apple.com/library/mac/#documentation/Cocoa/…/Strings.html</a>

***

### i18n Resource File Formats: YAML files

<a title="YAML article on Wikipedia" href="http://en.wikipedia.org/wiki/Yaml" target="_blank">YAML</a> is a human-readable data serialization format. Its syntax was designed to be easily mapped to data types common to most high-level languages (lists, associative arrays and scalars).

Unlike some other formats, YAML has a <a href="http://yaml.org/spec/1.2/spec.html" target="_blank">well defined standard</a>.

Key features of YAML resource file format:

- key-value pairs are delimited with colon ( : )
- values can be surrounded by quotes
- correct and consistent line indentation is important
- comments start with a hash sign ( # ), and are ignored by the parser
- place-holder syntax is: %{name}, where “name” can consist of multiple non-white-space characters

**References**:

- <a href="http://yaml.org/spec/1.2/spec.html" target="_blank">YAML 1.2 specification</a>
- <a href="http://yaml.org/refcard.html" target="_blank">YAML 1.1 Reference card</a>
- <a href="http://en.wikipedia.org/wiki/Yaml" target="_blank">Wikipedia article</a>

***

### i18n Resource File Formats: RESX and RESW files

**RESX** files are used by programs developed with Microsoft’s <a href="http://en.wikipedia.org/wiki/.NET_Framework" target="_blank">*.NET* Framework</a>. They store objects and strings for a program in an XML format. They may contain both plain text information as well as binary data, which is encoded as text within the XML tags.

**RESW** files are used by Microsoft *Windows* and *Silverlight* applications and contain strings that are used to localize the application for different languages and contexts. They are often used with <a href="http://msdn.microsoft.com/en-us/library/cc295302.aspx" target="_blank">XAML</a> applications (such as *Expression*), which abstract the user interface strings to resource files. Let’s have a closer look at how these files look like in terms of formatting:

Syntax of the RESW and RESX resource file format:

- documents start with &lt;?xml version=”1.0″ encoding=”ENCODING”?&gt; where ENCODING is desired encoding
- key-value pairs are nested within a &lt;root&gt; element and have this form:

<pre>&lt;data name=”key” xml:space=”preserve”&gt;&lt;value&gt;value&lt;/value&gt;&lt;/data&gt;</pre>

- place-holder syntax is: {name}, where “name” can be a combination of non-white-space characters

***

### i18n Resource File Formats: RESJSON files

**RESJSON** files are used by Windows “Metro” style applications developed for Windows 8. They are saved in a <a href="http://www.techterms.com/definition/json" target="techterms">JSON</a> (JavaScript Object Notation) format and contain strings that are often used for localizing the application’s user interface.

Developers often create different RESJSON files (e.g., resources.resjson) in locale folders named /en-US/, /fr-FR/, /ja-JP/, etc. Each *resources.resjson* file has strings localized for the particular language folder.

The RESJSON resource file formats follow the standard JSON syntax:

- the whole content is enclosed in braces ( { } ) with no new lines
- key-value pairs are delimited with colons ( : )
- keys and values are surrounded by quotes ( ” )
- key-value pairs are comma separated
- place-holders syntax: {name}, where “name” can be a combination of non white space characters
- key-value pairs with key syntax like: “_somekey.comment” where “somekey” is an existing key, are treated as comments belonging to key-value pair with “somekey” key. The location of the comment in the file is not important.