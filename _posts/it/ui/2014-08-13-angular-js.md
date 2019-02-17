---
slug:       "angular-js"
title:      angular.js
excerpt:    Scopes, JSON Web Tokens, authentication, code organization, generators, HTML5mode, base tag, reasons agains angular...
date:       2014-08-13
tags:
  - ttt-angularjs
  - ttt-front-end
---

#### Scopes

- stackoverflow: <a href="http://stackoverflow.com/questions/14049480/what-are-the-nuances-of-scope-prototypal-prototypical-inheritance-in-angularjs">What are the nuances of scope prototypal / prototypical inheritance in AngularJS?</a>

#### JWT (JSON Web Tokens)

- <a href="http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html">JSON Web Token (JWT)</a> (draft-ietf-oauth-json-web-token)
- <a href="http://angular-tips.com/blog/2014/05/json-web-tokens-introduction/">Json Web Tokens: Introduction</a>
- <a href="http://angular-tips.com/blog/2014/05/json-web-tokens-examples/">Json Web Tokens: Examples</a>

#### Authentication

- blog: <a href="http://jes.al/2013/08/authentication-with-rails-devise-and-angularjs/">Authentication with Rails, Devise and AngularJS</a>
- blog: <a href="http://blog.brunoscopelliti.com/deal-with-users-authentication-in-an-angularjs-web-app">Deal with users authentication in an AngularJS web app</a>
- blog: <a href="http://www.sitepoint.com/implementing-authentication-angular-applications/">Implementing Authentication in Angular Applications</a>
- blog: <a href="http://frederiknakstad.com/2013/01/21/authentication-in-single-page-applications-with-angular-js/">Authentication in Single Page Applications With Angular.js</a>
- blog: <a href="http://www.frederiknakstad.com/2014/02/09/ui-router-in-angular-client-side-auth/">UI-Router in angular-client-side-auth</a>

####  Code organization

- <a href="http://cliffmeyers.com/blog/2013/4/21/code-organization-angularjs-javascript">Code Organization in Large AngularJS and JavaScript Applications</a>

#### Generators

- <a href="http://gaboesquivel.com/blog/2014/overview-of-angular-generators-april-2014/">Overview of Angular Generators – April 2014</a>

#### HTML5mode
<pre>    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              require('connect-modrewrite') (['!(\..+)$ / [L]']),
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect().use('/fonts', connect.static('./bower_components/font-awesome/fonts')),
              connect.static('src')
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: 'dist'
        }
      }
    },</pre>

- <a href="http://jjt.io/2013/11/16/angular-html5mode-using-yeoman-generator-angular/">Angular html5Mode support for Yeoman &amp; generator-angular</a>
- <a href="https://github.com/yeoman/generator-angular/issues/433#issuecomment-52018281">feature request on github: yeoman / generator-angular</a>

#### base tag

- stackoverflow: <a href="http://stackoverflow.com/questions/1889076/is-it-recommended-to-use-the-base-html-tag">Is it recommended to use the &lt;base&gt; html tag?</a>

#### Reasons against angular

- <a href="https://sourcegraph.com/blog/switching-from-angularjs-to-server-side-html">The 5 things about client-side JS frameworks that were surprisingly painful</a>

***
####  Resources

- blog: <a href="https://shellycloud.com/blog/2013/10/how-to-integrate-angularjs-with-rails-4">How to integrate AngularJS with Rails 4</a>
- tutorial: <a href="http://www.sitepoint.com/kickstart-your-angularjs-development-with-yeoman-grunt-and-bower/">Kickstart Your AngularJS Development with Yeoman, Grunt and Bower</a>
- youtube: <a href="https://www.youtube.com/watch?v=suFPaS6Mppw">Miloš Janjić - Izrada kompleksnih AngularJS aplikacija</a>
- youtube: <a href="https://www.youtube.com/watch?v=ZcZgY3TfBUg">Mladen Plavšić - How to make Symfony and AngularJS become one</a>
- tutorial: <a href="http://jsg.azurewebsites.net/angular-template-caching-with-templatecache-and-gulp/">Encapsulating AngularJS templates with $templateCache and gulp</a>
- tutorial: <a href="https://thinkster.io/angulartutorial/a-better-way-to-learn-angularjs/">A Better Way to Learn AngularJS</a>
- stackoverflow: <a href="http://stackoverflow.com/questions/24069990/window-sessionstorage-vs-cookiestore">$window.sessionStorage vs $cookieStore</a>

