# PHP Puppeteer

This project provides the ability to generate PDF with [Puppeteer](https://github.com/GoogleChrome/puppeteer) in PHP.

- PHP 5 Compatible
- No Dependent Package
- Easy to Use


## Getting started

### 1. Install Puppeteer
To install Puppeteer and its dependencies, we recommend you take a look at [Puppeteer's official installation guide](https://developers.google.com/web/tools/puppeteer/get-started) as well as their [official troubleshooting guide](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md).

Here is a snippet for Ubuntu (tested on 20.04) that works well at the time of writing:
```bash
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget libappindicator3-1 libatk-bridge2.0-0 libgbm1
sudo npm install --global --unsafe-perm puppeteer
sudo chmod -R o+rx /usr/lib/node_modules/puppeteer/.local-chromium
```

### 2. Install the package through Composer
Install this package using Composer:

```bash
composer require eckinox/php-puppeteer
```

### 3. Start generating PDFs!
Check out the examples and the documentation below to learn how to use the library

---

## Usage  examples
Here are a few very basic examples to get started:

### Generating PDFs from an URL
```php
<?php

require_once "vendor/autoload.php";

use Its404\PhpPuppeteer\Browser;

$config = [
	"url" => "https://github.com/eckinox/php-puppeteer"
];
$browser = new Browser();
$content = $browser->pdf($config);

header("Content-type:application/pdf");
echo $content
```

### Generating PDFs from an HTML string
```php
<?php

require_once "vendor/autoload.php";

use Its404\PhpPuppeteer\Browser;

$config = [
	"html" => "<h1>Hello World!</h1>"
];
$browser = new Browser();
$content = $browser->pdf($config);

header("Content-type:application/pdf");
echo $content
```

---

## A few more tips...

### Starting a new page
You can add following html code in the html where you'd like to start a new page for PDF.

```html
<div style="page-break-after:always;"></div>
```

### Having trouble loading fonts?
If you're having trouble loading fonts, check out [the font-loading example](examples).

---

## Credits
This package is a fork of [its404/php-puppeteer](https://github.com/its404/php-puppeteer), with updates to allow usage on more modern operating systems and versions of NodeJS, as well as improved documentation.
