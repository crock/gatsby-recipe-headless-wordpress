import React from 'react'
import { graphql } from 'gatsby'
import '../styles/category.css'

const CategoryTemplate = ({data}) => {
    const { name, description, count } = data.wordpressCategory

    return <>
        <div className="category">
            <h2 dangerouslySetInnerHTML={{ __html: name }}> <span class="cat-count">({count})</span></h2>
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
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