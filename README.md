UBC CLF 8.0 DRUPAL THEME (aka octopus)
=======================================

A responsive UBC CLF (Common Look and Feel) theme for Drupal 8. Created by the
UBC IT Web Services Department.

octopus is a *base theme* for Drupal 8, providing UBC-branded units with the
basic structure of the UBC CLF ([Common Look and Feel](https://clf.ubc.ca)). If
you need to modify the theme to suit your needs, we recommend using the
[Drupal 8 CLF theme](https://github.com/ubc-web-services/clf) as a child theme
to extend this one instead.

# Composer Builds
If you're using composer, add the project with:
```
composer require ubc-web-services/octopus
```

# IE Support
This theme does not support IE versions lower than IE11. If older browser
support is required, it must be added separately or
([galactus](https://github.com/ubc-web-services/galactus)), an earlier
version of the CLF, can be used.

# Contribution

CSS changes need to be made with SASS through node-sass.

Ensure that you have `yarn` installed.
```
https://yarnpkg.com/lang/en/docs/install/
```

Install the node packages with this command:
```
yarn install
```

You can build your CSS changes with this command:
```
yarn run build-css
```

OR

You can watch changes to your SASS files with this command:
```
yarn run watch-css
```
