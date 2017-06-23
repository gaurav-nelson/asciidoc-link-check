# asciidoc-link-check
Checks if all hyperlinks in an asciidoc file are alive(or dead).

(Uses most of the source code from [markdown-link-check](https://github.com/tcort/markdown-link-check) module)

## Installation
To add the module to your project, run:

```bash
npm install --save asciidoc-link-check
```

To install the command line tool globally, run:

```bash
npm install -g asciidoc-link-check
```

## API
Use the following function:


```javascript
asciidocLinkCheck(asciidoc, callback)
```
Accepts a string containing `asciidoc` formatted text and a `callback`, extracts all links and checks if they are alive or dead. Then calls the `callback` with `(err, results)`.

## Examples
### JavaScript

```javascript
'use strict';

var asciidocLinkCheck = require('asciidoc-link-check');

asciidocLinkCheck('xref:https://www.google.com[Google]', function (err, results) {
    if (err) {
        console.error('Error', err);
        return;
    }
    results.forEach(function (result) {
        console.log('%s is %s', result.link, result.status);
    });
});
```

### Command Line
(Optional) Use the `-p` or `--progress` switch to view progress.

#### Check links for a local file

```bash
asciidoc-link-check README.adoc --progress
```

#### Check links for an online file

```bash
asciidoc-link-check https://github.com/gaurav-nelson/asciidoc-link-check/blob/master/README.adoc
```

#### Check links from standard input

```bash
cat *.adoc | asciidoc-link-check -p
```
