<div align="center">

[<img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />](https://www.gatsbyjs.org)

# Battery Loaded Gatsby WebApp Example with TypeScript

•   [Quick Start](#quick-start)   •   [How To](#how-to)   •   [Limitation](#limitation)   •   [About](#about)   •

</div>

> A minimum example of using Gatsby to build a modern webapp with react, typescript and many other things

#### Highlights

This example will show you how to

- **write a complete typescript app with gatsby**: all files, even including `gatsby-*` APIs
- **write tests with jest**: components and pages
- **reference files as a module**: e.g. use syntax like `#components/my-component` instead of `../components/my-component`
- **analyse bundle size**: get a report on the bundle at the end of the build process
- **generate types for GraphQL queries**: via apollo during the dev/build life cycle

## Quick Start

```sh
npm install
```

In order to use auth0 as your user management system, you must supply the following environment variables:

1. AUTH0_DOMAIN
2. AUTH0_AUDIENCE
3. AUTH0_CLIENT_ID

## Limitation

- Currently types for GraphQL queries is generated only when the devlop/build life cycle script is executed.
  Any change to the query while running devlop would not be picked up since Gatsby does not has a hook for the HMR process.
  Therefore, no type will be generated on-the-fly.
  Re-run the build/devlop to update the type files if it is needed.

## About

Perhaps there is no short of example on how to use typescript with Gatsby,
but I haven't come across an example that really uses typescript everywhere,
let alone telling me how to automatically generate types for GraphQL queries.

I make this example as part of my frontend research.
I don't anticipate anyone would use it besides me, but just in case you do, feel free. ;)

### Related Projects

- [gatsby-advanced-starter](https://github.com/Vagr9K/gatsby-advanced-starter): A skeleton starter for Gatsby that focuses on SEO/Social features/development environment
- [gatsby-starter-typescript-plus](https://github.com/resir014/gatsby-starter-typescript-plus): A simple Gatsby typescript example showing how to use emotion for styling
- [gatsby-typescript](https://github.com/d4rekanguok/gatsby-typescript): Another Gatsby typescript example but focusing on how to use graphql-code-generator to generate types for graphql queries

### License

Copyright © 2020, [Alvis Tang](https://github.com/alvis). Released under the [MIT License](LICENSE).

[![build](https://img.shields.io/github/workflow/status/alvis/presetter/continuous%20integration?style=flat-square)](../actions)
[![codacy grade](https://img.shields.io/codacy/grade/fcb13294d2f24f54988bb001ae8676f8/master.svg?style=flat-square)](https://www.codacy.com/app/alvis/preconfig)
[![codacy coverage](https://img.shields.io/codacy/coverage/fcb13294d2f24f54988bb001ae8676f8.svg?style=flat-square)](https://www.codacy.com/app/alvis/preconfig)
[![security](https://img.shields.io/snyk/vulnerabilities/github/alvis/presetter?style=flat-square)](https://snyk.io/test/github/alvis/preconfig)
[![dependencies](https://img.shields.io/david/alvis/preconfig.svg?style=flat-square)](https://david-dm.org/alvis/preconfig)
[![license](https://img.shields.io/github/license/alvis/preconfig.svg?style=flat-square)](https://github.com/alvis/preconfig/blob/master/LICENSE)
