import React from 'react'
import { graphql } from 'gatsby'
import '../styles/tag.css'

const TagTemplate = ({data}) => {
    const { name, description, count } = data.wordpressTag

    return <>
        <div className="tag">
            <h2 dangerouslySetInnerHTML={{ __html: name }}> <span class="tag-count">({count})</span></h2>
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
    </>
} 

export const query = graphql`
  query TagQuery($slug: String!) {
    wordpressTag(slug: { eq: $slug }) {
        id
        description
        count
        slug
        wordpress_id
        name
    }
  }
`

export default TagTemplate