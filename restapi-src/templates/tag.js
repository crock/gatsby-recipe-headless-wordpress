import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const TagTemplate = ({data}) => {
    const { name, description, count } = data.wordpressTag

    return <Layout>
        <div className="tag" style={{display: 'flex', flexDirection: 'column'}}>
            Tag Name: <h1 dangerouslySetInnerHTML={{ __html: name }}></h1>
            Tag Count: <div class="tag-count">({count})</div>
            Tag Description: <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
    </Layout>
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