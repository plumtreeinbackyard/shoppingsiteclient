# client

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production, copies dist folder to server root

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Deploy to Heroku

Create a static.json file

```
heroku login
heroku create shoppingsiteclient
heroku git:remote -a shoppingsiteclient
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static
git add .
git commit -am "make it better"
git push heroku main
```
