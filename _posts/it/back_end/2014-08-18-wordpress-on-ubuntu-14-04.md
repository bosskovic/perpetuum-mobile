---
slug:       "wordpress-on-ubuntu"
title:      Installing Wordpress on Ubuntu 14.04
excerpt:    Setting up the db, wp, server, installing the script, adding plugins, unicode, update, creating child theme, overriding plugin css in the child them style.css  
date:       2014-08-18
tags:
  - ttt-cms
  - ttt-linux
  - ttt-ubuntu
  - ttt-wordpress
---

#### setting up the database

<pre>mysql -u root -p
CREATE DATABASE wordpress;
CREATE USER wordpressuser@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON wordpress.* TO wordpressuser@localhost;
FLUSH PRIVILEGES;
exit;</pre>

#### setting up wordpress
<pre>cd ~
wget http://wordpress.org/latest.tar.gz
tar xzvf latest.tar.gz
sudo mv wordpress /var/www/html/
cd /var/www/html/wordpress
cp wp-config-sample.php wp-config.php
gksu gedit wp-config.php #db details
mkdir /var/www/html/wordpress/wp-content/uploads
sudo chown -R $USER:www-data /var/www/html/wordpress</pre>

#### setting up the server

<pre># server name used in the example: blog
sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/blog.conf
gksu gedit /etc/apache2/sites-available/blog.conf

sudo a2ensite blog
sudo service apache2 restart

gksudo gedit /etc/hosts
# 127.0.0.1 blog</pre>

#### installing the script

<pre>sudo apt-get update
sudo apt-get install php5-gd libssh2-php

# running the install script from http://blog/</pre>

#### adding plugins

<pre># downloading and extracting the plugin
sudo mv EXTRACTED_PLUGIN_DIRECTORY /var/www/html/wordpress/wp-content/plugins/
sudo chown -R $USER:www-data /var/www/html/wordpress/wp-content/plugins/</pre>

#### unicode

In wordpress/wp_config.php:

<pre>define('DB_CHARSET', 'utf8');
define('DB_COLLATE', 'utf8_unicode_ci');</pre>

#### updating wordpress and managing plugins from localhost

In wp-config.php:

<pre>define('FS_METHOD', 'direct');</pre>

#### Creating a child theme

- create a subdirectory in wp-content/themes
- In the child theme directory, create a file called style.css:

<pre>/*
 Theme Name:   My New Child Theme
 Template:     twentyfourteen
 Theme URI:    http://example.com/some-dir/
 Description:  My New Child Theme
 Author:       John Doe
 Author URI:   http://example.com
 Version:      1.0.0
 Tags:         light, dark, two-columns, right-sidebar, responsive-layout, accessibility-ready
 Text Domain:  my-new-child-theme
*/

@import url("../twentyfourteen/style.css");

/* =Theme customization starts here
-------------------------------------------------------------- */
</pre>

- only theme name and template are mandatory; template name corresponds to the parent theme
- @import url line should contain path to the parent theme's style.css
- activate the child theme in wp-admin
- override any file in the parent theme by including a file of the same name in the child theme directory
- add empty php file functions.php to the child theme directory; that file will be loaded in addition to the parent’s functions.php

####  Overriding plugin css in the child them style.css

As simple as adding *!important* to the css rule.

<pre>.some_class {
  color: #fff !important;
}</pre>

####  resources

- tutorial: <a href="https://www.digitalocean.com/community/tutorials/how-to-install-wordpress-on-ubuntu-14-04">How To Install Wordpress on Ubuntu 14.04</a>
- <a href="http://www.barrykooij.com/unable-to-install-plugins-on-localhost/">Unable to install plugins on localhost</a>
- <a href="http://codex.wordpress.org/Child_Themes">Codex - Child Themes</a>
- <a href="http://urosbaric.com/override-wordpress-plugins-css-child-themes">How to override WordPress plugins’ css with child themes</a>

