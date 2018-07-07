// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "postcss-preset-env": {
      stage: 0,
      browsers: 'last 2 versions'
    },
    "autoprefixer": {}
  }
}
