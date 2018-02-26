# iErik.github.io
This is my personal portfolio page built entirelly with Vue.js. It was initally
a Jekyll-powered website based on the
[barryclark/jekyll-now](https://github.com/barryclark/jekyll-now) boilerplate,
but I made the decision to switch to Vue.js once I've found out that it was
possible to use any SPA framework (React, Angular, Vue.js) on a GitHub Pages
hosted website using the
[rafrex/spa-github-pages](https://github.com/rafrex/spa-github-pages)
boilerplate.


If you're interesed, you can also check out the entire design process for this
project on [this GitLab repo](https://gitlab.com/Isidore/ierik.github-mockup),
there you can find the Photoshop project file, icons, fonts and everything that
was used during the design process of this project.

## Running localy

### Requirements

- Node.js 6.x or later
- npm 3.10.x or later
- yarn (optional)

### Building for development

To run the development version of the website localy you can simply run the
following npm command in a terminal:

```bash
npm run dev
```

This will actually start a local development server on port `2000` by default,
you can change that by simply editing the `dev.port` environment variable
located in the `config/index.js` file. This development server is necessary so
that the application's assets are re-compiled and re-sent to the browser
whenever any change is made to app's code. This is called
[Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/),
any changes made to the application's code should reflect in your web browser.

### Building for production

You can generate the compiled application asset files by running the following
npm command in a terminal:

```bash
npm run build
```

Once finished, you can find all the compiled assets under the `assets` directory
