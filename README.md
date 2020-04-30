# Gatsby Recipes: Headless WordPress

This repository contains two Gatsby recipes for the following use cases:
1) Using WordPress REST API as a source via the `gatsby-source-wordpress` plugin.
2) Using WPGraphQL as a source via the `gatsby-source-graphql` plugin.

## Installation and Usage

To use Gatsby Recipes, make sure you have the latest version of `gatsby-cli` by running either of the following commands.
```
npm i -g gatsby-cli
```
or
```
yarn global add gatsby-cli
```

Next, in either an existing Gatsby site or a brand new Gatsby site, you can run the following command depending on the data source you choose.

**REST API**
```
gatsby recipes https://raw.githubusercontent.com/crock/gatsby-recipe-headless-wordpress/master/wordpress-restapi.mdx
```

**WPGraphQL**
```
gatsby recipes https://raw.githubusercontent.com/crock/gatsby-recipe-headless-wordpress/master/wordpress-wpgraphql.mdx
```

These commands will create some rudimentary styles and basic templates in your Gatsby installation.

**UPDATE: Gatsby CLI v2.11.22 has added support for generating initial plugin config options, so the below steps is no longer necessary.**

As of Gatsby CLI v2.11.11, the Gatsby Recipes do not support adding default options to a plugin defined in `gatsby-config.js`. As soon as it does, this repo will be updated to include some default options.

However, for now you will have to replace the inserted object in `gatsby-config.js` with these options if you want some default data.

**REST API**
```json
{
    resolve: "gatsby-source-wordpress",
    options: {
        baseUrl: `cms.learnjam.org`,
        protocol: `https`,
        hostingWPCOM: false,
        useACF: true,
        includedRoutes: [
            "**/posts",
            "**/pages",
            "**/users",
            "**/categories",
            "**/tags",
        ]
    }
}
```

**WPGraphQL**
```json
{
    resolve: 'gatsby-source-graphql',
    options: {
        typeName: 'WORDPRESS',
        fieldName: 'wordpress',
        url: 'https://cms.digipresence.org/admintuts/graphql',
    }
}
```

## Resources

[Gatsby Recipes Docs](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-recipes/README.md)

[Gatsby Recipes Umbrella Issue ⛱](https://github.com/gatsbyjs/gatsby/issues/22991)

[Gatsby Recipes RFC](https://github.com/gatsbyjs/gatsby/blob/recipes-rfc/rfcs/text/0000-add-gatsby-recipes.md)