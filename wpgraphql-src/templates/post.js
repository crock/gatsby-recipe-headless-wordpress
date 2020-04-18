import React from 'react'
import { graphql, Link } from 'gatsby'
import '../styles/post.css'

const PostTemplate = ({data}) => {
    const { title, content, date, author, excerpt, categories, tags } = data.wordpress.post

    return <>
        <article className="post">

            <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
            <p dangerouslySetInnerHTML={{ __html: excerpt }}></p>

            <div className="post-meta">
                <span>
                Posted by <Link to={`/user/${author.slug}`}>{author.name}</Link>
                </span>
                {`|`}
                <span>{date}</span>
                {`|`}
                <div className="categories">
                    {
                        categories.edges.map(cat => {
                            const category = cat.node
                            return (
                                <Link className="cat" key={category.id} to={`/categories/${category.slug}`}>
                                    <span>{category.name}</span>
                                </Link>
                            )
                        })
                    }
                </div>
                {`|`}
                <div className="tags">
                    {
                        tags.edges.map(tag => {
                            const theTag = tag.node
                            return (
                                <Link className="tag" key={theTag.id} to={`/tags/${theTag.slug}`}>
                                    <span>{theTag.name}</span>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: content }}></div>
        </article>
    </>
} 

export const query = graphql`
  query BlogPostQuery($id: ID!) {
    wordpress {
      post(id: $id, idType: DATABASE_ID) {
        author {
          avatar {
            url
          }
          name
        }
        categories {
          edges {
            node {
              slug
              name
              id
            }
          }
        }
        tags {
          edges {
            node {
              slug
              name
              id
            }
          }
        }
        date
        content(format: RENDERED)
        excerpt(format: RENDERED)
        title(format: RENDERED)
        slug
        databaseId
      }
    }
  }
`

export default PostTemplate