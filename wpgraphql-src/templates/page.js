import React from 'react'
import { graphql } from 'gatsby'
import '../styles/page.css'

const PageTemplate = ({data}) => {
    const { title, content } = data.wordpress.page

    return <>
        <div className="page">
            <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
            <div className="page-content" dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
    </>
} 


export const query = graphql`
  query PageQuery($id: ID!) {
    wordpress {
      page(id: $id, idType: DATABASE_ID) {
        content(format: RENDERED)
        title(format: RENDERED)
      }
    }
  }
`

export default PageTemplate