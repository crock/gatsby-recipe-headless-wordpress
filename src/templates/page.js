import React from 'react'
import { graphql } from 'gatsby'
import '../styles/page.css'

const PageTemplate = ({data}) => {
    const { id, title, content } = data.wordpressPage

    return <>
        <div className="page">
            <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
            <div className="page-content" dangerouslySetInnerHTML={{ __html: content }}></div>
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