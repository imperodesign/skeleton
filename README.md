# skeleton

Starter skeleton for a Node.js web app. A minimal, elegant foundation that aims to reduce the time it takes to build an application from scratch.

**Uses**:
* express.js
* mongodb
* stylus
* jade
* gulp
* bower
* browserify
* 6to5

## Installation

```
$ cd { repo_dir }
$ npm install
$ bower install
$ gulp [develop|build]

$ node app/index.js
```
The `gulp develop` is for development and watches for file changes, contains source maps and has debugging. `gulp build` by contrast, strips and minifies code for production.
