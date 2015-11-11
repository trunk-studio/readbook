readbook
==========

## Build

```
$ npm install

$ gulp build

```

## Start
Run picklete

/etc/hosts 新增
```
127.0.0.1       e7read.koobe.com.tw
127.0.0.1       read.koobe.com.tw
```
```
$ npm start
```

http://e7read.koobe.com.tw:3000/viewer-ios/



## Dist vs Build versions

On production use files (JS and CSS) only from `dist/` folder, there will be the most stable versions, `build/` folder is only for development purpose

## Build

Framework7 uses `gulp` to build a development (build) and dist versions.

First you need to have `gulp-cli` which you should install globally.

```
$ npm install --global gulp
```

Then install all dependencies, in repo's root:

```
$ npm install
```

And build development version of Framework7:
```
$ gulp build
```

The result is available in `build/` folder.

## Dist/Release

After you have made build:

```
$ gulp dist
```

Distributable version will available in `dist/` folder.
