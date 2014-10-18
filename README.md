# skeleton
========

Starter skeleton for a Node.js web app.  
Using: express.js, mongodb, stylus, jade, gulp, bower

## Installation

### Build
```
cd { repo_dir }
npm install
bower install
```

### Symlink trick
Used for syntactically cleaner require() statements. [Source.](https://github.com/focusaurus/express_code_structure#the-app-symlink-trick)

```
cd node_modules && ln -nsf ../app
```

### Run
```
gulp watch
node app/index.js
```
