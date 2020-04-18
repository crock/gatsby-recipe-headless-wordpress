const path = require('path')
const slash = require('slash')
const _ = require('lodash')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allWordpressPost(filter: { status: { eq: "publish" } }) {
        edges {
          node {
            slug
          }
        }
      }
      allWordpressPage(filter: { status: { eq: "publish" } }) {
        edges {
          node {
            slug
          }
        }
      }
      allWordpressWpUsers {
          edges {
              node {
                  slug
              }
          }
      }
      allWordpressCategory(filter: {count: {gt: 0}}) {
            edges {
                node {
                    slug
                }
            }
        }
        allWordpressTag(filter: {count: {gt: 0}}) {
            edges {
                node {
                    slug
                }
            }
        }
    }
  `)

  // Handle errors
  if (result.errors) {
    console.error(result.errors)
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Blog Posts
  const postTemplate = path.resolve(`./src/templates/post.js`)
  _.each(result.data.allWordpressPost.edges, edge => {
    const { node } = edge
    const post = node
    createPage({
      path: `/blog/${post.slug}`,
      component: slash(postTemplate),
      context: {
        slug: post.slug,
      },
    })
  })

  // Pages Query
  const pageTemplate = path.resolve(`./src/templates/page.js`)
  _.each(result.data.allWordpressPage.edges, edge => {
    const { node } = edge
    const page = node
    createPage({
      path: `/${page.slug}`,
      component: slash(pageTemplate),
      context: {
        slug: page.slug,
      },
    })
  })

  // Users Query
  const userTemplate = path.resolve(`./src/templates/user.js`)
  _.each(result.data.allWordpressWpUsers.edges, edge => {
    const { node } = edge
    const user = node
    createPage({
      path: `/user/${user.slug}`,
      component: slash(userTemplate),
      context: {
        slug: user.slug,
      },
    })
  })

  // Categories Query
  const catTemplate = path.resolve(`./src/templates/category.js`)
  _.each(result.data.allWordpressCategory.edges, edge => {
    const { node } = edge
    const cat = node
    createPage({
      path: `/categories/${cat.slug}`,
      component: slash(catTemplate),
      context: {
        slug: cat.slug,
      },
    })
  })

  // Tags Query
  const tagTemplate = path.resolve(`./src/templates/tag.js`)
  _.each(result.data.allWordpressTag.edges, edge => {
    const { node } = edge
    const tag = node
    createPage({
      path: `/tags/${tag.slug}`,
      component: slash(tagTemplate),
      context: {
        slug: tag.slug,
      },
    })
  })
}
