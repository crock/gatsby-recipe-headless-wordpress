import React from 'react'
import { graphql } from 'gatsby'

const PageTemplate = ({data}) => {
    const { title, content } = data.wordpressPage

    return <>
        <div className="page" style={{display: 'flex', flexDirection: 'column'}}>
            Page Title: <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
            Page Content: <div className="page-content" dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
    </>
} 

export const query = graphql`
  query PageQuery($slug: String!) {
    wordpressPage(slug: { eq: $slug }, type: { eq: "page" }) {
        id
        content
        title
        wordpress_id
        slug
    }
  }
`

export default PageTemplate