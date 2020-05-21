import React from 'react'
import { graphql } from 'gatsby'

const CategoryTemplate = ({data}) => {
    const { name, description, count } = data.wordpressCategory

    return <>
        <div className="category"  style={{display: 'flex', flexDirection: 'column'}}>
            Category Name: <h1 dangerouslySetInnerHTML={{ __html: name }}></h1>
            Category Count: <div class="cat-count">({count})</div>
            Category Description: <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
    </>
} 

export const query = graphql`
  query CategoryQuery($slug: String!) {
    wordpressCategory(slug: { eq: $slug }) {
        count
        id
        name
        slug
        description
        wordpress_id
    }
  }
`

export default CategoryTemplate