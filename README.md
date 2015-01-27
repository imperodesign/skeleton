![Logo](https://raw.githubusercontent.com/imperodesign/skeleton/master/app/assets/src/img/skeleton-logo.png?raw=true)
# App Skeleton

Starter skeleton for a Node.js web app. A minimal, elegant foundation that aims to reduce the time it takes to build an application from scratch.

**Components:** express.js, mongoDB, stylus, jade, gulp.js, bower, browserify, 6to5.js

**TODO**
* User accounts
* Forms w/ CSRF
* Basic CSS style

## Installation

```
$ npm install && bower install
$ gulp [develop|build]

# start server
$ node app/index.js
```
Command `gulp develop` watches for file changes and contains source maps, and should be used in development. `gulp build` by contrast, strips and minifies code for production.
