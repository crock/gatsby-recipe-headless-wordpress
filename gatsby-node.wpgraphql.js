const path = require('path')
const slash = require('slash')
const _ = require('lodash')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      wordpress {
        posts(where: { status: PUBLISH }) {
          edges {
            node {
              slug
              databaseId
            }
          }
        }
        pages(where: { status: PUBLISH }) {
          edges {
            node {
              slug
              databaseId
            }
          }
        }
        categories(where: { hideEmpty: true }) {
          edges {
            node {
              slug
              databaseId
            }
          }
        }
        tags(where: { hideEmpty: true }) {
          edges {
            node {
              slug
              databaseId
            }
          }
        }
        users(where: { hasPublishedPosts: POST }) {
          edges {
            node {
              slug
              databaseId
            }
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

  //Create pages for each WordPress page
  const pageTemplate = path.resolve(`./src/templates/page.js`)
  _.each(result.data.wordpress.pages.edges, edge => {
    const { node } = edge
    const page = node
    createPage({
      path: `/${page.slug}`,
      component: slash(pageTemplate),
      context: {
        id: page.databaseId,
      },
    })
  })

  // Create posts for each WordPress post
  const postTemplate = path.resolve(`./src/templates/post.js`)
  _.each(result.data.wordpress.posts.edges, edge => {
    const { node } = edge
    const post = node
    createPage({
      path: `/blog/${post.slug}`,
      component: slash(postTemplate),
      context: {
        id: post.databaseId,
      },
    })
  })

  // Create pages for each WordPress category
  const catTemplate = path.resolve(`./src/templates/category.js`)
  _.each(result.data.wordpress.categories.edges, edge => {
    const { node } = edge
    const cat = node
    createPage({
      path: `/category/${cat.slug}`,
      component: slash(catTemplate),
      context: {
        id: cat.databaseId,
      },
    })
  })

  // Create pages for each WordPress tag
  const tagTemplate = path.resolve(`./src/templates/tag.js`)
  _.each(result.data.wordpress.tags.edges, edge => {
    const { node } = edge
    const tag = node
    createPage({
      path: `/tag/${tag.slug}`,
      component: slash(tagTemplate),
      context: {
        id: tag.databaseId,
      },
    })
  })

  // Create pages for each published WordPress user
  const userTemplate = path.resolve(`./src/templates/user.js`)
  _.each(result.data.wordpress.users.edges, edge => {
    const { node } = edge
    const user = node
    createPage({
      path: `/user/${user.slug}`,
      component: slash(userTemplate),
      context: {
        id: user.databaseId,
      },
    })
  })
}
