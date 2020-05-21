import React from 'react'
import { graphql, Link } from 'gatsby'

const PostTemplate = ({data}) => {
    const { title, content, date, author, excerpt, categories, tags } = data.wordpressPost

    return <>
        <article className="post" style={{display: 'flex', flexDirection: 'column'}}>

            Post Title: <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
            Post Excerpt: <p dangerouslySetInnerHTML={{ __html: excerpt }}></p>

            <div className="post-meta"  style={{display: 'flex', flexDirection: 'row'}}>
                <span>
                Posted by <Link to={`/user/${author.slug}`}>{author.name}</Link>
                </span>
                {`|`}
                <span>{date}</span>
                {`|`}
                <div className="categories">
                    Post Categories:
                    {
                        categories.map(cat => (
                            <Link className="cat" key={cat.id} to={`/categories/${cat.slug}`}>
                                <span>{cat.name}</span>
                            </Link>
                        ))
                    }
                </div>
                {`|`}
                <div className="tags">
                    Post Tags:
                    {
                        tags.map(tag => (
                            <Link className="tag" key={tag.id} to={`/tags/${tag.slug}`}>
                                <span>{tag.name}</span>
                            </Link>
                        ))
                    }
                </div>
            </div>
            Post Body: <div className="post-content" dangerouslySetInnerHTML={{ __html: content }}></div>
        </article>
    </>
} 

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    wordpressPost(slug: { eq: $slug }, type: { eq: "post" }) {
        id
        author {
          slug
          url
          name
          id
          wordpress_id
          description
          avatar_urls {
            wordpress_24
            wordpress_48
            wordpress_96
          }
        }
        content
        excerpt
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        wordpress_id
        sticky
        categories {
          name
          slug
          wordpress_id
          id
          description
          count
        }
        tags {
          id
          slug
          name
          description
          count
          wordpress_id
        }
    }
  }
`

export default PostTemplate