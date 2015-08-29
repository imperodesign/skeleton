<p align='right'>
<img width='100' src='https://raw.githubusercontent.com/imperodesign/skeleton/master/app/static/src/img/skeleton-logo.png?raw=true'>
</p>
# App Skeleton

A starting point for an io.js application. A minimal, and hopefully elegant foundation that aims to reduce the time it takes to build an app from scratch.

Using ECMAScript 6/7 wherever possible, and staying true to the [12 factor app](http://12factor.net). Tuned for the needs of our agency [Impero](http://weareimpero.com), but available to the public.

### Components
Type | Name
--- | ---
Programming language | [io.js](https://iojs.org)
Web App framework | [Express.js](http://expressjs.com)
Database | [MongoDB](https://www.mongodb.org)
HTML Templating | [Jade](http://jade-lang.com)
CSS Preprocessor | [Stylus](https://learnboost.github.io/stylus)
Frontend modules | [Browserify](http://browserify.org)
JavaScript transpiler | [Babel.js](http://babeljs.io)
Build tools | [Gulp.js](http://gulpjs.com), [npm](https://www.npmjs.com)


## Development

Clone the repo and install depedencies:

```
git clone git@github.com:imperodesign/skeleton.git
cd skeleton
npm install
```

Run build tasks with either Gulp or npm:
```
gulp develop
npm run develop
```

Start the server:
```
node app/index.js
```
